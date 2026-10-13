/* ENDONUTRI · Acceso profesional, alta con aprobación y recuperación mediante Supabase Auth. */
(() => {
  const SUPABASE_URL = 'https://bkcmntvgddrkqqiwagni.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_NfLX0nQ80He_TLa5xnM0vA__Eo2lB9N';
  const ADMIN_EMAIL = 'nutri.bea.md@gmail.com';
  const el = id => document.getElementById(id);
  const loginPanel = el('loginPanel'), privateArea = el('privateArea');
  let recoveryMode = false, profileTask = null, profileUserId = null, generation = 0;

  function injectAccessUi() {
    const recoveryButton = el('recoveryButton');
    if (recoveryButton && !el('signupButton')) {
      const signupButton = document.createElement('button');
      signupButton.className = 'auth-link auth-signup-link';
      signupButton.id = 'signupButton';
      signupButton.type = 'button';
      signupButton.textContent = 'Crear acceso profesional';
      recoveryButton.insertAdjacentElement('afterend', signupButton);

      const form = document.createElement('form');
      form.id = 'signupForm';
      form.hidden = true;
      form.innerHTML = `
        <div class="field"><label for="signupName">Nombre y apellidos</label><input id="signupName" type="text" autocomplete="name" required placeholder="Nombre y apellidos"></div>
        <div class="field"><label for="signupEmail">Correo electrónico profesional</label><input id="signupEmail" type="email" autocomplete="email" required placeholder="profesional@centro.es"></div>
        <div class="field"><label for="signupPassword">Contraseña</label><input id="signupPassword" type="password" autocomplete="new-password" minlength="8" required placeholder="Mínimo 8 caracteres"></div>
        <div class="field"><label for="signupPassword2">Repite la contraseña</label><input id="signupPassword2" type="password" autocomplete="new-password" minlength="8" required></div>
        <button class="enter" id="createAccessButton" type="submit">Solicitar acceso profesional →</button>
        <button class="auth-link" id="backFromSignup" type="button">Volver al acceso</button>
        <p class="auth-help">Tu cuenta se crea como pendiente. Podrás entrar cuando la administradora de ENDONUTRI la apruebe.</p>`;
      el('recoveryForm').insertAdjacentElement('beforebegin', form);
    }

    if (privateArea && !el('professionalAdminPanel')) {
      const head = privateArea.querySelector('.private-head');
      const logout = el('logoutButton');
      if (head && logout) {
        const actions = document.createElement('div');
        actions.className = 'professional-head-actions';
        const adminButton = document.createElement('button');
        adminButton.className = 'soft-button professional-admin-button';
        adminButton.id = 'professionalAdminButton';
        adminButton.type = 'button';
        adminButton.hidden = true;
        adminButton.textContent = '👥 Gestionar profesionales';
        logout.replaceWith(actions);
        actions.append(adminButton, logout);
      }

      const panel = document.createElement('section');
      panel.id = 'professionalAdminPanel';
      panel.className = 'professional-admin-panel';
      panel.hidden = true;
      panel.innerHTML = `
        <div class="professional-admin-card">
          <div class="professional-admin-head">
            <div><span class="eyebrow">ADMINISTRACIÓN</span><h2>Gestionar profesionales</h2><p>Las nuevas cuentas quedan pendientes hasta que tú las autorices.</p></div>
            <button class="soft-button" id="closeProfessionalAdmin" type="button">Cerrar ×</button>
          </div>
          <div class="professional-admin-summary" id="professionalAdminSummary"></div>
          <div class="professional-admin-status" id="professionalAdminStatus" role="status" aria-live="polite"></div>
          <div class="professional-list" id="professionalList"></div>
        </div>`;
      const preview = privateArea.querySelector('.preview');
      if (preview) preview.insertAdjacentElement('beforebegin', panel);
      else privateArea.append(panel);
    }

    if (!el('professionalAccessStyles')) {
      const style = document.createElement('style');
      style.id = 'professionalAccessStyles';
      style.textContent = `
        .auth-signup-link{font-weight:800;color:var(--emerald)}
        .professional-head-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
        .professional-admin-button{background:var(--green);color:#fff;border-color:var(--green)}
        .professional-admin-panel{margin:0 0 30px;scroll-margin-top:90px}
        .professional-admin-card{background:#fff;border:1px solid var(--line);border-radius:24px;padding:clamp(20px,4vw,32px);box-shadow:0 15px 40px rgba(6,78,59,.09)}
        .professional-admin-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);padding-bottom:18px;margin-bottom:18px}
        .professional-admin-head h2{font-family:'Libre Baskerville',serif;color:var(--green);margin:8px 0 5px}
        .professional-admin-head p{margin:0;color:var(--muted)}
        .professional-admin-summary{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
        .professional-admin-summary span{background:var(--pale);color:var(--green);font-weight:800;border-radius:999px;padding:7px 11px;font-size:13px}
        .professional-admin-status{min-height:22px;color:var(--muted);margin-bottom:10px}
        .professional-list{display:grid;gap:11px}
        .professional-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;border:1px solid var(--line);border-radius:16px;padding:15px;background:#fbfefc}
        .professional-row.pending{border-color:#ecd9aa;background:#fffaf0}
        .professional-name{font-weight:800;color:var(--green)}
        .professional-email{color:var(--muted);font-size:14px;overflow-wrap:anywhere}
        .professional-meta{display:flex;gap:7px;flex-wrap:wrap;margin-top:7px}
        .professional-chip{border-radius:999px;padding:4px 8px;font-size:12px;font-weight:800;background:#edf5f0;color:var(--green)}
        .professional-chip.pending{background:#fff0c9;color:#7a5a0d}.professional-chip.active{background:#def3e7;color:#08633f}
        .professional-action{border:0;border-radius:11px;padding:10px 12px;font:700 14px 'Source Sans 3';cursor:pointer;background:var(--green);color:#fff;white-space:nowrap}
        .professional-action.revoke{background:#fff;color:var(--danger);border:1px solid #efc8c3}
        .professional-action:disabled{opacity:.55;cursor:wait}
        @media(max-width:620px){.professional-head-actions,.professional-admin-head{width:100%}.professional-head-actions{justify-content:stretch}.professional-head-actions>*{flex:1}.professional-admin-head{flex-direction:column}.professional-row{grid-template-columns:1fr}.professional-action{width:100%}}
      `;
      document.head.append(style);
    }
  }

  injectAccessUi();

  function message(text, type = 'error') {
    el('loginMessage').textContent = text;
    el('loginMessage').className = 'message ' + type;
  }
  function showLogin() {
    privateArea.classList.remove('active');
    loginPanel.style.display = 'block';
    el('userLabel').textContent = '';
    const adminButton = el('professionalAdminButton');
    const adminPanel = el('professionalAdminPanel');
    if (adminButton) adminButton.hidden = true;
    if (adminPanel) adminPanel.hidden = true;
  }
  function showForm(name) {
    showLogin();
    ['loginForm', 'signupForm', 'recoveryForm', 'newPasswordForm'].forEach(id => { const node = el(id); if (node) node.hidden = id !== name; });
    el('recoveryButton').hidden = name !== 'loginForm';
    el('signupButton').hidden = name !== 'loginForm';
    if (name !== 'recoveryForm') el('recoveryHelp').hidden = true;
    const titles = {
      loginForm: ['Acceso profesional', 'Identifícate con tu cuenta profesional autorizada.'],
      signupForm: ['Crear acceso profesional', 'Crea tu cuenta. El acceso quedará pendiente hasta que sea aprobado por ENDONUTRI.'],
      recoveryForm: ['Recuperar contraseña', 'Recibirás un enlace en el correo de tu cuenta.'],
      newPasswordForm: ['Elige tu nueva contraseña', 'Guarda una contraseña para volver a entrar con tu correo.']
    };
    const copy = titles[name] || titles.loginForm;
    el('loginHeading').textContent = copy[0];
    el('loginIntro').textContent = copy[1];
  }
  function showPrivate(email) {
    loginPanel.style.display = 'none';
    privateArea.classList.add('active');
    el('userLabel').textContent = email || 'Profesional autorizado';
    el('password').value = '';
    const isAdmin = String(email || '').toLowerCase() === ADMIN_EMAIL;
    const adminButton = el('professionalAdminButton');
    if (adminButton) adminButton.hidden = !isAdmin;
    if (!isAdmin && el('professionalAdminPanel')) el('professionalAdminPanel').hidden = true;
  }
  function connectionError() { message('No se ha podido conectar. Comprueba tu conexión y vuelve a intentarlo.'); }
  if (!window.supabase?.createClient) {
    message('No se ha podido cargar el acceso. Recarga la página para volver a intentarlo.');
    el('loginButton').disabled = true;
    el('recoveryButton').disabled = true;
    el('signupButton').disabled = true;
    return;
  }
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    global: { fetch: async (url, options = {}) => {
      const controller = new AbortController();
      const abort = () => controller.abort();
      if (options.signal?.aborted) controller.abort();
      options.signal?.addEventListener('abort', abort, { once: true });
      const timer = setTimeout(abort, 15000);
      try { return await fetch(url, { ...options, signal: controller.signal }); }
      finally { clearTimeout(timer); options.signal?.removeEventListener('abort', abort); }
    } }
  });

  async function verifyProfessional(user) {
    if (!user) { showLogin(); return false; }
    if (profileTask && profileUserId === user.id) return profileTask;
    const requestGeneration = generation;
    profileUserId = user.id;
    const task = (async () => {
      const { data, error } = await sb.from('professional_profiles').select('active,role,email').eq('user_id', user.id).maybeSingle();
      if (requestGeneration !== generation || recoveryMode) return false;
      if (error) { showLogin(); message('No se han podido comprobar los permisos. Tu sesión no se ha borrado: vuelve a intentar el acceso.'); return false; }
      if (!data || data.active !== true) {
        await sb.auth.signOut({ scope: 'local' });
        showLogin();
        message(data ? 'Tu solicitud está pendiente de aprobación. Cuando ENDONUTRI la autorice podrás acceder.' : 'Tu cuenta no tiene acceso profesional activo. Contacta con la administración de ENDONUTRI.');
        return false;
      }
      showPrivate(user.email || data.email);
      return true;
    })();
    profileTask = task;
    try { return await task; }
    finally { if (profileTask === task) { profileTask = null; profileUserId = null; } }
  }

  el('loginForm').addEventListener('submit', async event => {
    event.preventDefault();
    el('loginButton').disabled = true;
    message('Comprobando credenciales…', 'ok');
    try {
      const { data, error } = await sb.auth.signInWithPassword({ email: el('email').value.trim(), password: el('password').value });
      if (error) {
        if (error.code === 'email_not_confirmed') message('Debes confirmar tu correo antes de entrar.');
        else if (error.code === 'invalid_credentials' || error.status === 400) message('Correo o contraseña incorrectos. Si tu contraseña habitual no funciona, pulsa «Recuperar contraseña».');
        else if (error.status === 429) message('Hay demasiados intentos seguidos. Espera unos minutos antes de volver a intentarlo.');
        else connectionError();
        return;
      }
      await verifyProfessional(data.user);
    } catch { connectionError(); }
    finally { el('loginButton').disabled = false; }
  });

  el('signupButton').addEventListener('click', () => { showForm('signupForm'); message('', ''); el('signupName').focus(); });
  el('backFromSignup').addEventListener('click', () => { showForm('loginForm'); message('', ''); });
  el('signupForm').addEventListener('submit', async event => {
    event.preventDefault();
    const name = el('signupName').value.trim();
    const email = el('signupEmail').value.trim().toLowerCase();
    const password = el('signupPassword').value;
    const confirm = el('signupPassword2').value;
    if (password !== confirm) { message('Las dos contraseñas deben coincidir.'); return; }
    const button = el('createAccessButton');
    button.disabled = true;
    message('Creando tu solicitud de acceso…', 'ok');
    try {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: new URL('profesionales.html', window.location.href).href
        }
      });
      if (error) {
        if (error.status === 429) message('Se han realizado demasiados intentos. Espera unos minutos y vuelve a probar.');
        else if (error.code === 'user_already_exists') message('Ya existe una cuenta con ese correo. Utiliza «Recuperar contraseña» si no recuerdas la clave.');
        else message(error.message?.toLowerCase().includes('password') ? 'La contraseña no cumple los requisitos de seguridad. Usa al menos 8 caracteres y combina letras, números y símbolos.' : 'No se ha podido crear la solicitud. Comprueba el correo e inténtalo de nuevo.');
        return;
      }
      if (data.session) await sb.auth.signOut({ scope: 'local' });
      el('signupForm').reset();
      showForm('loginForm');
      message('Solicitud creada correctamente. Si recibes un correo de confirmación, verifica tu dirección. Tu acceso quedará pendiente hasta que la administradora de ENDONUTRI lo apruebe.', 'ok');
    } catch { connectionError(); }
    finally { button.disabled = false; }
  });

  el('logoutButton').addEventListener('click', async () => {
    try {
      const { error } = await sb.auth.signOut({ scope: 'local' });
      if (error) { connectionError(); return; }
      generation++; recoveryMode = false; showForm('loginForm'); message('Sesión cerrada correctamente.', 'ok');
    } catch { connectionError(); }
  });

  // El callback termina de forma síncrona. Las consultas se ejecutan después
  // de que Supabase libere el bloqueo interno de autenticación.
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      generation++; recoveryMode = true; showForm('newPasswordForm');
      message('Enlace verificado. Ya puedes elegir tu contraseña.', 'ok');
      return;
    }
    if (event === 'SIGNED_OUT') { generation++; if (!recoveryMode) showLogin(); return; }
    if (session?.user && !recoveryMode) {
      setTimeout(() => { if (!recoveryMode) verifyProfessional(session.user).catch(connectionError); }, 0);
    }
  });

  el('recoveryButton').addEventListener('click', () => {
    el('recoveryEmail').value = el('email').value.trim();
    showForm('recoveryForm'); message('', ''); el('recoveryEmail').focus();
  });
  el('backToLogin').addEventListener('click', () => { recoveryMode = false; showForm('loginForm'); message('', ''); });
  el('recoveryForm').addEventListener('submit', async event => {
    event.preventDefault();
    const button = el('sendRecovery'); button.disabled = true;
    message('Solicitando el enlace de recuperación…', 'ok');
    try {
      const { error } = await sb.auth.resetPasswordForEmail(el('recoveryEmail').value.trim(), { redirectTo: new URL('profesionales.html', window.location.href).href });
      if (error) {
        message(error.status === 429 ? 'Espera unos minutos antes de solicitar otro enlace.' : 'No se ha podido solicitar el correo. Vuelve a intentarlo en unos minutos.');
        return;
      }
      el('recoveryHelp').hidden = false;
      message('Si el correo corresponde a una cuenta, recibirás el enlace. Revisa también la carpeta de spam. Utiliza únicamente el último enlace solicitado.', 'ok');
    } catch { connectionError(); }
    finally { button.disabled = false; }
  });
  el('verifyRecoveryLink').addEventListener('click', async () => {
    const button = el('verifyRecoveryLink'); button.disabled = true;
    const oldRecoveryMode = recoveryMode;
    try {
      const link = new URL(el('recoveryLink').value.trim());
      const hash = link.searchParams.get('token') || link.searchParams.get('token_hash');
      if (link.origin !== SUPABASE_URL || link.pathname !== '/auth/v1/verify' || link.searchParams.get('type') !== 'recovery' || !hash) {
        message('Copia el enlace original de «Restablecer contraseña» del correo de ENDONUTRI.'); return;
      }
      recoveryMode = true;
      const { error } = await sb.auth.verifyOtp({ token_hash: hash, type: 'recovery' });
      el('recoveryLink').value = '';
      if (error) { recoveryMode = oldRecoveryMode; message('El enlace ha caducado o ya se ha utilizado. Solicita uno nuevo y pega el último enlace.'); return; }
      generation++; showForm('newPasswordForm'); message('Enlace verificado. Ya puedes elegir tu contraseña.', 'ok');
    } catch { recoveryMode = oldRecoveryMode; message('No se ha podido verificar el enlace. Comprueba que has copiado el enlace completo del correo.'); }
    finally { button.disabled = false; }
  });
  el('newPasswordForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (el('newPassword').value !== el('confirmPassword').value) { message('Las dos contraseñas deben coincidir.'); return; }
    if (!recoveryMode) { message('Primero debes verificar el enlace recibido en tu correo.'); return; }
    el('savePassword').disabled = true;
    try {
      const { error } = await sb.auth.updateUser({ password: el('newPassword').value });
      if (error) { message(error.code === 'same_password' ? 'Elige una contraseña diferente de la actual.' : 'No se ha podido guardar. Comprueba los requisitos de la contraseña o solicita otro enlace.'); return; }
      el('newPassword').value = ''; el('confirmPassword').value = '';
      await sb.auth.signOut({ scope: 'local' });
      recoveryMode = false; generation++; showForm('loginForm');
      message('Contraseña actualizada. Ya puedes entrar con tu correo y la nueva contraseña.', 'ok');
    } catch { connectionError(); }
    finally { el('savePassword').disabled = false; }
  });
  el('showPassword').addEventListener('click', () => {
    const visible = el('password').type === 'password';
    el('password').type = visible ? 'text' : 'password';
    el('showPassword').setAttribute('aria-pressed', String(visible));
    el('showPassword').textContent = visible ? 'Ocultar' : 'Mostrar';
  });

  async function loadProfessionals() {
    const status = el('professionalAdminStatus');
    const list = el('professionalList');
    const summary = el('professionalAdminSummary');
    if (!status || !list || !summary) return;
    status.textContent = 'Cargando profesionales…';
    list.replaceChildren();
    try {
      const { data, error } = await sb.from('professional_profiles')
        .select('user_id,email,full_name,active,role,created_at')
        .order('active', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      const rows = data || [];
      const pending = rows.filter(row => row.active !== true).length;
      const active = rows.filter(row => row.active === true).length;
      summary.replaceChildren();
      [['Pendientes', pending], ['Activos', active], ['Total', rows.length]].forEach(([label, value]) => {
        const chip = document.createElement('span'); chip.textContent = `${label}: ${value}`; summary.append(chip);
      });
      if (!rows.length) {
        const empty = document.createElement('div'); empty.className = 'professional-row'; empty.textContent = 'Todavía no hay solicitudes de profesionales.'; list.append(empty);
      }
      rows.forEach(row => {
        const card = document.createElement('article');
        card.className = 'professional-row' + (row.active ? '' : ' pending');
        const info = document.createElement('div');
        const name = document.createElement('div'); name.className = 'professional-name'; name.textContent = row.full_name || 'Profesional sin nombre';
        const email = document.createElement('div'); email.className = 'professional-email'; email.textContent = row.email;
        const meta = document.createElement('div'); meta.className = 'professional-meta';
        const state = document.createElement('span'); state.className = 'professional-chip ' + (row.active ? 'active' : 'pending'); state.textContent = row.active ? 'Acceso activo' : 'Pendiente de aprobación';
        const role = document.createElement('span'); role.className = 'professional-chip'; role.textContent = row.role || 'professional';
        meta.append(state, role); info.append(name, email, meta); card.append(info);
        const isOwner = String(row.email || '').toLowerCase() === ADMIN_EMAIL;
        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'professional-action' + (row.active ? ' revoke' : '');
        action.textContent = isOwner ? 'Cuenta administradora' : row.active ? 'Retirar acceso' : 'Aprobar acceso';
        action.disabled = isOwner;
        if (!isOwner) action.addEventListener('click', async () => {
          const next = !row.active;
          const original = action.textContent;
          action.disabled = true;
          action.textContent = next ? 'Aprobando…' : 'Retirando…';
          status.textContent = '';
          try {
            const { error: updateError } = await sb.from('professional_profiles')
              .update({ active: next, updated_at: new Date().toISOString() })
              .eq('user_id', row.user_id);
            if (updateError) throw updateError;
            status.textContent = next ? `Acceso aprobado para ${row.email}.` : `Acceso retirado para ${row.email}.`;
            await loadProfessionals();
          } catch {
            action.disabled = false; action.textContent = original;
            status.textContent = 'No se ha podido cambiar el permiso. Vuelve a intentarlo.';
          }
        });
        card.append(action); list.append(card);
      });
      status.textContent = pending ? `${pending} solicitud${pending === 1 ? '' : 'es'} pendiente${pending === 1 ? '' : 's'} de revisar.` : 'No hay solicitudes pendientes.';
    } catch {
      status.textContent = 'No se ha podido cargar la gestión de profesionales.';
    }
  }

  el('professionalAdminButton')?.addEventListener('click', async () => {
    const panel = el('professionalAdminPanel');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await loadProfessionals();
  });
  el('closeProfessionalAdmin')?.addEventListener('click', () => { el('professionalAdminPanel').hidden = true; });

  const hash = new URLSearchParams(window.location.hash.slice(1));
  if (hash.get('error')) message('El enlace no es válido o ha caducado. Solicita uno nuevo desde «Recuperar contraseña».');
  (async () => {
    try {
      const { data: { session }, error } = await sb.auth.getSession();
      if (error) { connectionError(); return; }
      if (session?.user && !recoveryMode) await verifyProfessional(session.user);
      else if (!recoveryMode) showLogin();
    } catch { connectionError(); }
  })();
})();
