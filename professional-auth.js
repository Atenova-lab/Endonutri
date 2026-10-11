/* ENDONUTRI · Acceso profesional y recuperación mediante Supabase Auth. */
(() => {
  const SUPABASE_URL = 'https://bkcmntvgddrkqqiwagni.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_NfLX0nQ80He_TLa5xnM0vA__Eo2lB9N';
  const el = id => document.getElementById(id);
  const loginPanel = el('loginPanel'), privateArea = el('privateArea');
  let recoveryMode = false, profileTask = null, profileUserId = null, generation = 0;
  function message(text, type = 'error') {
    el('loginMessage').textContent = text;
    el('loginMessage').className = 'message ' + type;
  }
  function showLogin() {
    privateArea.classList.remove('active');
    loginPanel.style.display = 'block';
    el('userLabel').textContent = '';
  }
  function showForm(name) {
    showLogin();
    ['loginForm', 'recoveryForm', 'newPasswordForm'].forEach(id => { el(id).hidden = id !== name; });
    el('recoveryButton').hidden = name !== 'loginForm';
    if (name !== 'recoveryForm') el('recoveryHelp').hidden = true;
    el('loginHeading').textContent = name === 'newPasswordForm' ? 'Elige tu nueva contraseña' : name === 'recoveryForm' ? 'Recuperar contraseña' : 'Acceso profesional';
    el('loginIntro').textContent = name === 'newPasswordForm' ? 'Guarda una contraseña para volver a entrar con tu correo.' : name === 'recoveryForm' ? 'Recibirás un enlace en el correo de tu cuenta.' : 'Identifícate con tu cuenta profesional autorizada.';
  }
  function showPrivate(email) {
    loginPanel.style.display = 'none';
    privateArea.classList.add('active');
    el('userLabel').textContent = email || 'Profesional autorizado';
    el('password').value = '';
  }
  function connectionError() { message('No se ha podido conectar. Comprueba tu conexión y vuelve a intentarlo.'); }
  if (!window.supabase?.createClient) {
    message('No se ha podido cargar el acceso. Recarga la página para volver a intentarlo.');
    el('loginButton').disabled = true;
    el('recoveryButton').disabled = true;
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
        message('Tu cuenta no tiene acceso profesional activo. Contacta con la administración de ENDONUTRI.');
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
