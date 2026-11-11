/* Bandeja del profesional. Supabase limita el acceso a los envíos propios. */
(() => {
  'use strict';
  const pane = document.getElementById('etd-remote');
  if (!pane) return;
  const create = pane.querySelector('[data-etd-create]');
  const refresh = pane.querySelector('[data-etd-refresh]');
  const status = pane.querySelector('[data-etd-status]');
  const inbox = pane.querySelector('[data-etd-inbox]');
  const pending = pane.querySelector('[data-etd-pending]');
  const patientPage = 'https://atenova-lab.github.io/Endonutri/etd-paciente.html';
  const dateFormat = new Intl.DateTimeFormat('es-ES', {dateStyle:'short',timeStyle:'short',timeZone:'Europe/Madrid'});
  const numberFormat = new Intl.NumberFormat('es-ES', {maximumFractionDigits:2});
  let session = null, timer, loadingFor = null, loadRequest = null, rendered = '';

  function button(label, run, secondary = true) {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'etd-button' + (secondary ? ' etd-secondary' : '');
    node.textContent = label;
    node.addEventListener('click', run);
    return node;
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function scoreOf(row) {
    const total = 11, correct = row.correct_count;
    const percentage = correct * 100 / total;
    return {
      total, correct, percentage, passed: correct * 100 >= 70 * total,
      incorrect: row.incorrect_count, unanswered: row.unanswered_count
    };
  }
  async function copy(text, card, success, label) {
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = success;
    } catch {
      card.querySelector('.etd-copy-field')?.remove();
      const area = element('textarea','etd-copy-field');
      area.rows = 4;
      area.readOnly = true;
      area.setAttribute('aria-label', label);
      area.value = text;
      card.append(area);
      area.focus();
      area.select();
      status.textContent = 'Texto seleccionado. Pulsa Ctrl+C o elige «Copiar» en tu móvil.';
    }
  }
  function getPatientLink(row) {
    const url = new URL(patientPage);
    url.hash = 'token=' + row.token;
    return url.href;
  }
  async function remove(row, control) {
    const message = row.completed_at
      ? '¿Eliminar de la bandeja el resultado ' + row.code + '? Hazlo una vez anotado en la historia clínica.'
      : '¿Cancelar el enlace ' + row.code + '? El paciente ya no podrá responder con ese enlace.';
    if (!window.confirm(message) || !session) return;
    const current = session;
    control.disabled = true;
    try {
      // Si el paciente acaba de enviar, no borrar su resultado al cancelar un enlace.
      let query = current.db.from('etd_remote_attempts').delete()
        .eq('professional_id', current.id).eq('token', row.token);
      if (!row.completed_at) query = query.is('completed_at', null);
      const {data, error} = await query.select('token').maybeSingle();
      if (session !== current) return;
      if (error || !data) {
        status.textContent = 'El enlace ha cambiado. Actualiza la bandeja y revisa su estado.';
        return;
      }
      await load(false, true);
      if (session === current) status.textContent = row.completed_at ? 'Resultado eliminado de la bandeja.' : 'Enlace cancelado.';
    } catch {
      if (session === current) status.textContent = 'No se ha podido eliminar. Inténtalo de nuevo.';
    } finally { control.disabled = false; }
  }

  function renderRow(row, expired) {
    const done = Boolean(row.completed_at);
    const card = element('article','etd-record');
    const head = element('div','etd-record-head');
    head.append(element('span','etd-code',row.code));
    const actions = element('div','etd-actions');
    if (done) {
      const score = scoreOf(row);
      head.append(element('span','etd-record-state', score.passed ? 'Aprobado' : 'No aprobado'));
      card.append(head, element('p','', score.correct + '/11 aciertos · ' + numberFormat.format(score.percentage) + ' %'),
        element('p','etd-record-date','Recibido: ' + dateFormat.format(new Date(row.completed_at))));
      actions.append(button('Copiar informe para HC', () => {
        const report = window.EndonutriChecklists.clinicalReport('Cuestionario ETD Avanzada', score);
        return copy(report,card,'Informe copiado. Ya puedes pegarlo en la historia clínica.','Informe para la historia clínica');
      },false));
    } else {
      head.append(element('span','etd-record-state', expired ? 'Caducado' : 'Pendiente de respuesta'));
      card.append(head, element('p','etd-record-date','Caduca: ' + dateFormat.format(new Date(row.expires_at))));
      if (!expired) {
        const link = getPatientLink(row);
        const text = 'Hola. Completa este cuestionario de ENDONUTRI antes de tu consulta. Tu código es '
          + row.code + '. No escribas datos personales.\n\n' + link;
        const whatsapp = element('a','etd-button','Compartir por WhatsApp');
        whatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(text);
        whatsapp.target = '_blank';
        whatsapp.rel = 'noopener noreferrer';
        actions.append(whatsapp, button('Copiar enlace', () => copy(link,card,'Enlace copiado.','Enlace del cuestionario')));
      }
    }
    actions.append(button(done ? 'Eliminar resultado' : expired ? 'Eliminar enlace' : 'Cancelar enlace',
      event => remove(row,event.currentTarget)));
    card.append(actions);
    return card;
  }
  function render(rows) {
    const now = Date.now();
    const expired = row => !row.completed_at && Date.parse(row.expires_at) <= now;
    const fingerprint = JSON.stringify(rows.map(row => [row,expired(row)]));
    if (rendered === fingerprint) return;
    rendered = fingerprint;
    const results = rows.filter(row => row.completed_at).sort((a,b) => Date.parse(b.completed_at)-Date.parse(a.completed_at));
    const links = rows.filter(row => !row.completed_at).sort((a,b) => Number(expired(a))-Number(expired(b)));
    inbox.replaceChildren(...results.map(row => renderRow(row,false)));
    pending.replaceChildren(...links.map(row => renderRow(row,expired(row))));
    if (!results.length) inbox.append(element('p','etd-helper','Todavía no hay cuestionarios recibidos.'));
    if (!links.length) pending.append(element('p','etd-helper','Todavía no hay enlaces pendientes.'));
  }
  async function load(manual = false, force = false) {
    const current = session;
    if (!current || (loadingFor === current && !force)) return;
    const request = {};
    loadRequest = request;
    loadingFor = current;
    refresh.disabled = true;
    if (manual) status.textContent = 'Actualizando la bandeja…';
    try {
      const {data, error} = await current.db.from('etd_remote_attempts')
        .select('token,code,created_at,expires_at,completed_at,correct_count,incorrect_count,unanswered_count')
        .eq('professional_id',current.id).order('created_at',{ascending:false}).limit(100);
      if (session !== current || loadRequest !== request) return;
      if (error) throw error;
      render(data || []);
      if (manual) status.textContent = 'Bandeja actualizada.';
    } catch {
      if (session === current && loadRequest === request) status.textContent = 'No se ha podido cargar la bandeja. Pulsa «Actualizar» para volver a intentarlo.';
    } finally {
      if (loadRequest === request) {
        loadRequest = null;
        loadingFor = null;
        if (session === current) refresh.disabled = false;
      }
    }
  }
  create.addEventListener('click', async () => {
    if (!session || create.disabled) return;
    const current = session;
    create.disabled = true;
    status.textContent = 'Creando enlace…';
    try {
      const {data,error} = await current.db.from('etd_remote_attempts').insert({professional_id:current.id}).select('code').single();
      if (session !== current) return;
      if (error || !data) throw error || new Error('Sin enlace');
      await load(false, true);
      if (session === current) status.textContent = 'Enlace creado. Busca el código ' + data.code + ' en «Enlaces enviados o por compartir».';
    } catch {
      if (session === current) status.textContent = 'No se ha podido crear el enlace. Inténtalo de nuevo.';
    } finally { if (session === current) create.disabled = false; }
  });
  refresh.addEventListener('click', () => load(true));
  pane.addEventListener('toggle', () => { if (pane.open) load(); });
  function disconnect() {
    session = null;
    clearInterval(timer);
    create.disabled = true;
    refresh.disabled = true;
    pane.open = false;
    status.textContent = '';
    inbox.replaceChildren();
    pending.replaceChildren();
    rendered = '';
  }
  window.EndonutriRemoteETD = {
    connect(db,id) {
      if (!id || session?.id === id) return;
      disconnect();
      session = {db,id};
      create.disabled = false;
      refresh.disabled = false;
      timer = setInterval(() => {
        if (pane.open && !document.hidden && pane.getClientRects().length) load();
      },15000);
    },
    disconnect
  };
})();
