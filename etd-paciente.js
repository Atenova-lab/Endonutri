/* Respuesta del paciente mediante enlace de un solo uso. */
(() => {
  'use strict';
  const config = window.EndonutriPatientETD;
  const form = document.getElementById('etd-patient-form');
  const state = document.getElementById('etd-patient-state');
  const feedback = document.getElementById('etd-submit-state');
  const instructions = document.getElementById('etd-instructions');
  const code = document.getElementById('etd-patient-code');
  const questions = document.getElementById('etd-patient-questions');
  const send = form.querySelector('button[type="submit"]');
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
  const tokenFormat = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

  async function rpc(name, payload) {
    const response = await fetch(config.url + '/rest/v1/rpc/' + name, {
      method: 'POST',
      headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) throw new Error('No se ha podido conectar.');
    return response.json();
  }

  function notice(text) {
    state.hidden = false;
    state.textContent = text;
  }

  function finish(reply) {
    form.reset();
    form.hidden = true;
    instructions.hidden = true;
    if (reply.code) {
      code.textContent = 'Tu código: ' + reply.code;
      code.hidden = false;
    } else code.hidden = true;
    if (reply.state === 'submitted' || reply.state === 'completed') {
      notice('Cuestionario recibido. Dile tu código a tu profesional cuando te atienda.');
    } else if (reply.state === 'expired') {
      notice('Este enlace ha caducado. Pide un enlace nuevo a tu profesional.');
    } else {
      notice('Este enlace no está disponible. Pide un enlace nuevo a tu profesional.');
    }
    state.tabIndex = -1;
    state.focus();
  }

  function renderQuestions() {
    for (const item of config.questions) {
      const field = document.createElement('fieldset');
      field.className = 'etd-question';
      const legend = document.createElement('legend');
      legend.textContent = item.id + '. ' + item.question;
      field.append(legend);
      item.options.forEach((option, i) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'q' + item.id;
        input.value = i;
        const text = document.createElement('span');
        text.textContent = option;
        label.append(input, text);
        field.append(label);
      });
      questions.append(field);
    }
  }

  function getAnswers() {
    const data = new FormData(form);
    return config.questions.map(q => data.has('q' + q.id) ? Number(data.get('q' + q.id)) : null);
  }

  form.addEventListener('change', () => {
    document.getElementById('etd-progress').textContent = getAnswers().filter(a => a !== null).length
      + ' de ' + config.questions.length + ' respondidas';
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (send.disabled) return;
    const answers = getAnswers();
    if (answers.every(a => a === null)) {
      feedback.textContent = 'Responde al menos una pregunta antes de enviar.';
      return;
    }
    const missing = answers.filter(a => a === null).length;
    if (missing && !window.confirm('Quedan ' + missing + ' preguntas sin responder. ¿Enviar el cuestionario así?')) return;
    send.disabled = true;
    feedback.textContent = 'Enviando el cuestionario…';
    try {
      const reply = await rpc('etd_remote_submit', {p_token:token, p_version:config.version, p_answers:answers});
      if (reply.state === 'invalid') feedback.textContent = 'No se han podido comprobar las respuestas. Vuelve a abrir el enlace e inténtalo de nuevo.';
      else finish(reply);
    } catch {
      feedback.textContent = 'No hemos podido confirmar el envío. Revisa la conexión y pulsa «Enviar cuestionario» otra vez.';
    } finally {
      send.disabled = false;
    }
  });

  async function start() {
    if (!config || !token || !tokenFormat.test(token)) {
      finish({state:'unavailable'});
      return;
    }
    notice('Comprobando el enlace…');
    try {
      const reply = await rpc('etd_remote_link_state', {p_token:token});
      if (reply.state !== 'open') { finish(reply); return; }
      if (reply.version !== config.version) {
        notice('El cuestionario se ha actualizado. Recarga esta página para continuar.');
        return;
      }
      code.textContent = 'Tu código: ' + reply.code;
      code.hidden = false;
      renderQuestions();
      state.hidden = true;
      form.hidden = false;
    } catch {
      notice('No se ha podido abrir el cuestionario. Comprueba la conexión.');
      const retry = document.createElement('button');
      retry.className = 'etd-button etd-secondary';
      retry.type = 'button';
      retry.textContent = 'Reintentar';
      retry.addEventListener('click', start, {once:true});
      state.append(document.createElement('br'), retry);
    }
  }
  start();
})();
