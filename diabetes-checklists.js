/* Cuestionarios de consulta: sesión en memoria, sin datos identificativos. */
(function () {
  'use strict';
  const host = document.getElementById('db-checklists');
  if (!host) return;
  const data = window.EndonutriChecklistData, core = window.EndonutriChecklists;
  if (!data || !core) {
    host.querySelector('[data-ck-status]').textContent = 'No se han podido cargar los cuestionarios. Recarga la página para intentarlo de nuevo.';
    host.querySelectorAll('[data-ck-start]').forEach(button => { button.disabled = true; });
    return;
  }
  const session = core.createSession(data.quizzes);
  const privateArea = document.getElementById('privateArea');
  const dialog = document.createElement('dialog');
  dialog.className = 'ck-dialog';
  dialog.setAttribute('aria-labelledby', 'ck-title');
  document.body.append(dialog);
  let view = 'home', confirmAction = null, opener = null;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percentage = value => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value);
  const authorized = () => privateArea?.classList.contains('active');
  const sourceLinks = ids => ids.map(id => data.sources.find(source => source.id === id)).filter(Boolean).map(source => '<a href="' + escape(source.url) + '" target="_blank" rel="noopener">' + escape(source.label) + ' ↗</a>').join('');

  function reportFor(item) {
    return core.clinicalReport(item.quiz.title, item.result, item.completedAt, data.version);
  }
  function sessionReport() {
    return session.results().map(reportFor).join('\n--------------------\n\n');
  }
  function reportBox(text, title = 'Informe para la historia clínica') {
    return '<section class="ck-report"><h3>' + escape(title) + '</h3><p>Texto listo para copiar en la historia del paciente.</p><label class="ck-sr" for="ck-report-text">Texto del informe</label><textarea id="ck-report-text" readonly rows="9" spellcheck="false">' + escape(text) + '</textarea><button class="ck-primary" type="button" data-ck-action="copy">Copiar informe</button><p class="ck-copy-status" id="ck-copy-status" role="status" aria-live="polite"></p></section>';
  }
  function header(title, sub) {
    return '<header class="ck-header"><div class="ck-brand">ENDONUTRI <span>· Consulta de diabetes</span></div><div class="ck-header-actions"><button type="button" class="ck-quiet" data-ck-action="patient">Nuevo paciente</button><button type="button" class="ck-quiet" data-ck-action="close">Volver a recursos ×</button></div></header><div class="ck-shell"><div class="ck-heading"><span class="ck-kicker">CHECKLIST DE CONOCIMIENTOS</span><h2 id="ck-title" tabindex="-1">' + escape(title) + '</h2><p>' + escape(sub) + '</p></div>';
  }
  function updateResourceCards() {
    const results = session.results();
    results.forEach(item => {
      const card = host.querySelector('[data-ck-card="' + item.quiz.id + '"]');
      card.querySelector('[data-ck-start]').textContent = 'Ver resultado';
      card.querySelector('[data-ck-card-status]').textContent = (item.result.passed ? 'Aprueba' : 'No aprueba') + ' · ' + item.result.correct + '/' + item.result.total + ' · ' + percentage(item.result.percentage) + ' %';
    });
    host.querySelector('[data-ck-session-report]').hidden = !results.length;
    host.querySelector('[data-ck-status]').textContent = results.length ? results.length + ' de 3 checklists finalizados en esta sesión. Pulsa «Nuevo paciente» para borrar las respuestas antes de la siguiente persona.' : 'Selecciona un checklist para empezar. Las respuestas se conservan solo mientras esta página está abierta.';
  }
  function resetPatient() {
    session.resetPatient(); confirmAction = null;
    host.querySelectorAll('[data-ck-start]').forEach(button => { button.textContent = 'Empezar checklist'; });
    host.querySelectorAll('[data-ck-card-status]').forEach(status => { status.textContent = ''; });
    updateResourceCards();
    view = 'home';
    render();
  }
  function choose(id) {
    const state = session.select(id);
    view = state.result ? 'result' : 'questions';
    const button = host.querySelector('[data-ck-start="' + id + '"]');
    if (!state.result && button) button.textContent = 'Continuar checklist';
    render();
  }
  function open(action, element) {
    if (!authorized()) return;
    opener = element;
    if (action === 'session') { view = 'session'; render(); }
    else if (action === 'patient') {
      if (session.hasWork()) requestConfirmation('patient');
      else resetPatient();
    } else choose(action);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('ck-modal-open');
    focusHeading();
  }
  function close() {
    if (dialog.open) dialog.close();
    document.body.classList.remove('ck-modal-open');
    updateResourceCards();
    if (opener?.isConnected) opener.focus();
  }
  function focusHeading() {
    dialog.scrollTop = 0;
    dialog.querySelector('#ck-title')?.focus({ preventScroll: true });
  }
  function requestConfirmation(action) {
    confirmAction = { action, previous: view };
    view = 'confirm'; render();
  }
  function finish() {
    session.finish(); view = 'result'; updateResourceCards(); render();
  }
  function reviewUnanswered() {
    const state = session.snapshot();
    const first = state.answers.findIndex(answer => answer === null);
    if (first >= 0) session.page(Math.floor(first / state.pageSize));
    view = 'questions'; render();
    if (first >= 0) dialog.querySelector('#ck-question-' + first + ' legend')?.focus({ preventScroll: false });
  }
  function questionMarkup(question, index, selected) {
    return '<fieldset class="ck-question" id="ck-question-' + index + '"><legend tabindex="-1"><span class="ck-number">' + question.id + '</span>' + escape(question.question) + '</legend><div class="ck-options">' + question.options.map((option, choice) => '<label class="ck-option"><input type="radio" name="ck-answer-' + index + '" value="' + choice + '" data-ck-question="' + index + '"' + (selected === choice ? ' checked' : '') + '><span class="ck-option-letter" aria-hidden="true">' + 'ABCD'[choice] + '</span><span>' + escape(option) + '</span></label>').join('') + '</div><button type="button" class="ck-clear" data-ck-action="clear" data-index="' + index + '">Dejar sin responder</button></fieldset>';
  }
  function resultsList() {
    return session.results().map(item => '<div class="ck-completed"><strong>' + escape(item.quiz.title) + '</strong><span class="' + (item.result.passed ? 'ck-pass' : 'ck-fail') + '">' + (item.result.passed ? 'Aprueba' : 'No aprueba') + ' · ' + item.result.correct + '/' + item.result.total + ' (' + percentage(item.result.percentage) + ' %)</span></div>').join('');
  }
  function render() {
    let html;
    if (view === 'home') {
      html = header('¿Qué checklist vas a realizar?', 'Elige una respuesta por pregunta. Puedes revisar tus respuestas antes de terminar.') + '<div class="ck-home-grid">' + data.quizzes.map(quiz => '<button type="button" class="ck-home-card" data-ck-choose="' + quiz.id + '"><span>' + quiz.questions.length + ' preguntas</span><strong>' + escape(quiz.title) + '</strong><small>' + escape(quiz.description) + '</small><b>Abrir checklist →</b></button>').join('') + '</div>' + (session.results().length ? '<section class="ck-session-summary"><h3>Resultados de esta sesión</h3>' + resultsList() + '<button type="button" class="ck-primary" data-ck-action="session">Ver informe de sesión</button></section>' : '') + '<p class="ck-note">Cada acierto suma 1 punto. Las respuestas incorrectas y sin responder no suman ni restan. Apruebas con al menos el 70 % de aciertos sobre todas las preguntas.</p>';
    } else if (view === 'questions') {
      const state = session.snapshot(), start = state.page * state.pageSize, end = Math.min(start + state.pageSize, state.quiz.questions.length);
      const answered = state.answers.filter(answer => answer !== null).length;
      html = header(state.quiz.title, 'Marca una opción en cada pregunta. No hay límite de tiempo.') + '<div class="ck-progress-block"><div><strong>Preguntas ' + (start + 1) + '-' + end + ' de ' + state.quiz.questions.length + '</strong><span id="ck-progress-text">Respondidas: ' + answered + ' de ' + state.quiz.questions.length + '</span></div><progress id="ck-progress" value="' + answered + '" max="' + state.quiz.questions.length + '" aria-label="Preguntas respondidas"></progress></div><form id="ck-questions-form">' + state.quiz.questions.slice(start, end).map((question, offset) => questionMarkup(question, start + offset, state.answers[start + offset])).join('') + '<nav class="ck-question-nav" aria-label="Navegación del checklist"><button class="ck-secondary" type="button" data-ck-action="previous"' + (state.page === 0 ? ' disabled' : '') + '>← Anterior</button><span>Página ' + (state.page + 1) + ' de ' + state.pages + '</span>' + (state.page + 1 < state.pages ? '<button class="ck-primary" type="button" data-ck-action="next">Siguiente →</button>' : '<button class="ck-primary" type="button" data-ck-action="finish">Finalizar y ver resultado</button>') + '</nav><div class="ck-bottom-actions"><button type="button" class="ck-quiet" data-ck-action="pending">Revisar preguntas pendientes</button><button type="button" class="ck-quiet" data-ck-action="home">Cambiar de checklist</button></div></form><p class="ck-note">Los ejemplos de insulina son ejercicios de aprendizaje; sigue siempre tu pauta personal.</p>';
    } else if (view === 'result') {
      const state = session.snapshot(), result = state.result;
      const item = { quiz: state.quiz, result, completedAt: state.completedAt };
      const errors = result.details.filter(detail => !detail.correct);
      html = header(state.quiz.title, 'Checklist finalizado. Este es tu resultado.') + '<section class="ck-result ' + (result.passed ? 'ck-result-pass' : 'ck-result-fail') + '"><span class="ck-result-label">' + (result.passed ? 'APRUEBA EL CHECKLIST' : 'NO APRUEBA EL CHECKLIST') + '</span><strong class="ck-result-score">' + percentage(result.percentage) + ' <small>%</small></strong><p>' + result.correct + ' de ' + result.total + ' respuestas correctas</p><div class="ck-score-details"><span><b>' + result.correct + '</b>Aciertos</span><span><b>' + result.incorrect + '</b>Incorrectas</span><span><b>' + result.unanswered + '</b>Sin responder</span></div><p class="ck-result-criterion">Aprobado: al menos ' + result.minimumCorrect + ' de ' + result.total + ' aciertos (≥70 %). Los errores no restan puntos.</p></section>' + reportBox(reportFor(item)) + (errors.length ? '<details class="ck-review"><summary>Preguntas para repasar (' + errors.length + ')</summary>' + errors.map(detail => {
        const question = state.quiz.questions.find(q => q.id === detail.id);
        return '<article class="ck-review-item"><h4>' + question.id + '. ' + escape(question.question) + '</h4><p><strong>Respuesta marcada:</strong> ' + (detail.selected === null ? 'Sin responder.' : escape(question.options[detail.selected])) + '</p><p class="ck-right-answer"><strong>Respuesta correcta:</strong> ' + escape(question.options[question.correct]) + '</p><p>' + escape(question.explanation) + '</p><div class="ck-source-links">' + sourceLinks(question.sources) + '</div></article>';
      }).join('') + '</details>' : '<p class="ck-perfect">Has contestado correctamente todas las preguntas.</p>') + '<div class="ck-final-actions"><button type="button" class="ck-primary" data-ck-action="home">Hacer otro checklist</button><button type="button" class="ck-secondary" data-ck-action="session">Informe de sesión</button><button type="button" class="ck-quiet" data-ck-action="repeat">Repetir este checklist</button></div>';
    } else if (view === 'session') {
      html = header('Informe de la sesión', 'Resultados de los checklists finalizados para este paciente.') + resultsList() + reportBox(sessionReport(), 'Informe conjunto para la historia clínica') + '<p class="ck-note">Incluye únicamente los checklists finalizados. No se atribuye resultado a los que aún no se han realizado.</p><div class="ck-final-actions"><button type="button" class="ck-primary" data-ck-action="home">Realizar otro checklist</button><button type="button" class="ck-secondary" data-ck-action="patient">Nuevo paciente</button></div>';
    } else if (view === 'confirm') {
      const action = confirmAction.action;
      const unanswered = action === 'finish' ? session.snapshot().answers.filter(answer => answer === null).length : 0;
      html = header(action === 'finish' ? 'Quedan preguntas sin responder' : action === 'repeat' ? 'Repetir el checklist' : 'Empezar con un nuevo paciente', action === 'finish' ? 'Quedan ' + unanswered + ' preguntas pendientes. Puedes revisarlas antes de terminar.' : action === 'repeat' ? 'Se borrará el resultado anterior de este checklist. Copia el informe primero si lo necesitas.' : 'Se borrarán todas las respuestas y resultados de esta sesión. Copia los informes antes de continuar.') + '<div class="ck-confirm"><p>' + (action === 'finish' ? 'Las preguntas sin responder no suman ni restan, pero forman parte del total utilizado para calcular el porcentaje.' : 'Esta acción deja el formulario limpio para empezar.') + '</p><div class="ck-final-actions"><button type="button" class="ck-primary" data-ck-action="confirm">' + (action === 'finish' ? 'Finalizar con preguntas sin responder' : action === 'repeat' ? 'Borrar y repetir' : 'Borrar e iniciar nuevo paciente') + '</button><button type="button" class="ck-secondary" data-ck-action="cancel">' + (action === 'finish' ? 'Revisar pendientes' : 'Conservar la sesión') + '</button></div></div>';
    }
    dialog.innerHTML = html + '</div><p class="ck-sr" role="status" aria-live="polite" id="ck-announcement"></p>';
    focusHeading();
  }
  async function copyReport() {
    const text = dialog.querySelector('#ck-report-text'), status = dialog.querySelector('#ck-copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard no disponible');
      await navigator.clipboard.writeText(text.value);
      if (status.isConnected) status.textContent = 'Informe copiado. Ya puedes pegarlo en la historia clínica.';
    } catch (_) {
      if (!text.isConnected) return;
      text.focus(); text.select(); text.setSelectionRange(0, text.value.length);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* Selección manual disponible. */ }
      status.textContent = copied ? 'Informe copiado. Ya puedes pegarlo en la historia clínica.' : 'Texto seleccionado. Pulsa Ctrl+C (o ⌘C en Mac) para copiarlo.';
    }
  }
  host.addEventListener('click', event => {
    const start = event.target.closest('[data-ck-start]');
    if (start) open(start.dataset.ckStart, start);
    const action = event.target.closest('[data-ck-launch]');
    if (action) open(action.dataset.ckLaunch, action);
  });
  dialog.addEventListener('change', event => {
    if (!event.target.matches('[data-ck-question]') || !event.target.checked) return;
    session.answer(Number(event.target.dataset.ckQuestion), Number(event.target.value));
    const state = session.snapshot(), answered = state.answers.filter(answer => answer !== null).length;
    dialog.querySelector('#ck-progress').value = answered;
    dialog.querySelector('#ck-progress-text').textContent = 'Respondidas: ' + answered + ' de ' + state.quiz.questions.length;
  });
  dialog.addEventListener('submit', event => { event.preventDefault(); });
  dialog.addEventListener('click', event => {
    const choice = event.target.closest('[data-ck-choose]');
    if (choice) { choose(choice.dataset.ckChoose); return; }
    const button = event.target.closest('[data-ck-action]');
    if (!button) return;
    const action = button.dataset.ckAction;
    if (action === 'close') close();
    else if (action === 'previous' || action === 'next') { session.page(session.snapshot().page + (action === 'next' ? 1 : -1)); render(); }
    else if (action === 'clear') { const index = Number(button.dataset.index); session.answer(index, null); render(); dialog.querySelector('#ck-question-' + index + ' legend')?.focus(); }
    else if (action === 'pending') { reviewUnanswered(); if (!session.snapshot().answers.includes(null)) dialog.querySelector('#ck-announcement').textContent = 'Has respondido todas las preguntas. Puedes revisar las páginas y finalizar en la última.'; }
    else if (action === 'finish') { if (session.snapshot().answers.includes(null)) requestConfirmation('finish'); else finish(); }
    else if (action === 'copy') copyReport();
    else if (action === 'home' || action === 'session') { view = action; render(); }
    else if (action === 'patient') { if (session.hasWork()) requestConfirmation('patient'); else resetPatient(); }
    else if (action === 'repeat') requestConfirmation('repeat');
    else if (action === 'confirm') {
      const requested = confirmAction.action; confirmAction = null;
      if (requested === 'finish') finish();
      else if (requested === 'patient') resetPatient();
      else { session.repeat(session.snapshot().quiz.id); view = 'questions'; updateResourceCards(); host.querySelector('[data-ck-start="' + session.snapshot().quiz.id + '"]').textContent = 'Continuar checklist'; host.querySelector('[data-ck-card="' + session.snapshot().quiz.id + '"] [data-ck-card-status]').textContent = ''; render(); }
    } else if (action === 'cancel') {
      const requested = confirmAction; confirmAction = null;
      if (requested.action === 'finish') reviewUnanswered();
      else { view = requested.previous; render(); }
    }
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  document.getElementById('logoutButton')?.addEventListener('click', () => { resetPatient(); close(); });
  new MutationObserver(() => {
    if (!authorized()) { resetPatient(); close(); }
  }).observe(privateArea, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('pagehide', () => { resetPatient(); close(); dialog.innerHTML = ''; });
  window.addEventListener('pageshow', event => { if (event.persisted) { resetPatient(); close(); } });
  updateResourceCards();
})();
