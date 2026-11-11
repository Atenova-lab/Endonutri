-- Enlaces de un solo uso para el cuestionario ETD Avanzada de ENDONUTRI.
create schema endonutri_etd_private;
revoke all on schema endonutri_etd_private from public;
grant usage on schema endonutri_etd_private to anon, authenticated;

create table public.etd_remote_attempts (
  token uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles(user_id) on delete cascade,
  code text not null default upper(left(replace(gen_random_uuid()::text, '-', ''), 8)),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  completed_at timestamptz,
  correct_count smallint,
  incorrect_count smallint,
  unanswered_count smallint,
  constraint etd_remote_owner_code_key unique (professional_id, code),
  constraint etd_remote_counts_check check (
    (completed_at is null and correct_count is null and incorrect_count is null and unanswered_count is null)
    or (completed_at is not null
      and correct_count is not null and incorrect_count is not null and unanswered_count is not null
      and correct_count >= 0 and incorrect_count >= 0 and unanswered_count >= 0
      and correct_count + incorrect_count + unanswered_count = 11)
  )
);

alter table public.etd_remote_attempts enable row level security;
revoke all on table public.etd_remote_attempts from public, anon, authenticated;
grant select, delete on table public.etd_remote_attempts to authenticated;
grant insert (professional_id) on table public.etd_remote_attempts to authenticated;

create policy etd_remote_read_own on public.etd_remote_attempts
  for select to authenticated
  using (professional_id = (select auth.uid()) and (select public.is_active_professional()));

create policy etd_remote_create_own on public.etd_remote_attempts
  for insert to authenticated
  with check (professional_id = (select auth.uid()) and (select public.is_active_professional()));

create policy etd_remote_delete_own on public.etd_remote_attempts
  for delete to authenticated
  using (professional_id = (select auth.uid()) and (select public.is_active_professional()));

-- Las funciones privilegiadas están en un esquema no expuesto a la Data API.
-- Solo devuelven el estado de un enlace concreto y nunca la identidad de su propietario.
create function endonutri_etd_private.link_state(p_token uuid)
returns jsonb
language sql stable security definer set search_path = ''
as $body$
  select coalesce((
    select case
      when a.completed_at is not null then jsonb_build_object('state', 'completed', 'code', a.code)
      when a.expires_at <= now() then jsonb_build_object('state', 'expired')
      else jsonb_build_object('state', 'open', 'code', a.code, 'version', '2026-11-11')
    end
    from public.etd_remote_attempts a
    join public.professional_profiles p on p.user_id = a.professional_id and p.active = true
    where a.token = p_token
  ), jsonb_build_object('state', 'unavailable'));
$body$;

create function endonutri_etd_private.submit_attempt(p_token uuid, p_version text, p_answers jsonb)
returns jsonb
language plpgsql volatile security definer set search_path = ''
as $body$
declare
  answer_key constant integer[] := array[1,1,1,1,1,1,1,2,2,2,3];
  n_correct integer;
  n_incorrect integer;
  n_unanswered integer;
  returned_code text;
begin
  if p_version is distinct from '2026-11-11'
    or p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    return jsonb_build_object('state', 'invalid');
  end if;
  if jsonb_array_length(p_answers) <> 11 or exists (
    select 1 from jsonb_array_elements(p_answers) as a(value)
    where a.value <> 'null'::jsonb and a.value::text !~ '^[0-3]$'
  ) then
    return jsonb_build_object('state', 'invalid');
  end if;

  select count(*) filter (where a.value::text = answer_key[a.position::integer]::text),
    count(*) filter (where a.value <> 'null'::jsonb and a.value::text <> answer_key[a.position::integer]::text),
    count(*) filter (where a.value = 'null'::jsonb)
  into n_correct, n_incorrect, n_unanswered
  from jsonb_array_elements(p_answers) with ordinality as a(value, position);

  if n_unanswered = 11 then
    return jsonb_build_object('state', 'invalid');
  end if;

  update public.etd_remote_attempts a
  set completed_at = now(),
      correct_count = n_correct,
      incorrect_count = n_incorrect,
      unanswered_count = n_unanswered
  where a.token = p_token and a.completed_at is null and a.expires_at > now()
    and exists (
      select 1 from public.professional_profiles p
      where p.user_id = a.professional_id and p.active = true
    )
  returning a.code into returned_code;
  if found then
    return jsonb_build_object('state', 'submitted', 'code', returned_code);
  end if;
  return endonutri_etd_private.link_state(p_token);
end;
$body$;

create function public.etd_remote_link_state(p_token uuid)
returns jsonb
language sql stable security invoker set search_path = ''
as $body$
  select endonutri_etd_private.link_state(p_token);
$body$;

create function public.etd_remote_submit(p_token uuid, p_version text, p_answers jsonb)
returns jsonb
language sql volatile security invoker set search_path = ''
as $body$
  select endonutri_etd_private.submit_attempt(p_token, p_version, p_answers);
$body$;

revoke all on function endonutri_etd_private.link_state(uuid) from public, anon, authenticated;
revoke all on function endonutri_etd_private.submit_attempt(uuid,text,jsonb) from public, anon, authenticated;
revoke all on function public.etd_remote_link_state(uuid) from public, anon, authenticated;
revoke all on function public.etd_remote_submit(uuid,text,jsonb) from public, anon, authenticated;
grant execute on function endonutri_etd_private.link_state(uuid) to anon, authenticated;
grant execute on function endonutri_etd_private.submit_attempt(uuid,text,jsonb) to anon, authenticated;
grant execute on function public.etd_remote_link_state(uuid) to anon, authenticated;
grant execute on function public.etd_remote_submit(uuid,text,jsonb) to anon, authenticated;
