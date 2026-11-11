/* Cuestionario ETD Avanzada: respuestas en memoria, sin datos identificativos. */
(function () {
  'use strict';
  const host = document.getElementById('db-checklists');
  const privateArea = document.getElementById('privateArea');
  if (!host || !privateArea) return;
  const start = host.querySelector('[data-ck-start]');
  const status = host.querySelector('[data-ck-status]');
  const data = window.EndonutriChecklistData;
  const core = window.EndonutriChecklists;
  if (!data || !core) {
    status.textContent = 'No se ha podido cargar el cuestionario. Recarga la página para volver a intentarlo.';
    return;
  }

  const { title, questions, sources } = data;
  const dialog = document.createElement('dialog');
  dialog.className = 'ck-dialog';
  dialog.setAttribute('aria-labelledby', 'ck-title');
  document.body.append(dialog);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const format = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });
  const authorized = () => privateArea.classList.contains('active');
  let answers = questions.map(() => null), result = null;

  dialog.innerHTML = `
    <header class="ck-header">
      <div class="ck-brand">ENDONUTRI <span>· Consulta de diabetes</span></div>
      <div class="ck-header-actions">
        <button type="button" class="ck-quiet" data-ck-action="reset">Nuevo paciente</button>
        <button type="button" class="ck-quiet" data-ck-action="close">Volver a recursos ×</button>
      </div>
    </header>
    <div class="ck-shell">
      <div class="ck-heading">
        <span class="ck-kicker">EDUCACIÓN TERAPÉUTICA EN DIABETES</span>
        <h2 id="ck-title" tabindex="-1">${esc(title)}</h2>
        <p>Marca una respuesta por pregunta. Puedes revisar tus opciones antes de finalizar.</p>
      </div>
      <div class="ck-progress-block">
        <div><strong>${questions.length} preguntas</strong><span id="ck-progress-text" aria-live="polite"></span></div>
        <progress id="ck-progress" value="0" max="${questions.length}" aria-label="Preguntas respondidas"></progress>
      </div>
      <form id="ck-questions-form" autocomplete="off">
        ${questions.map((q, index) => `
          <fieldset class="ck-question">
            <legend><span class="ck-number">${q.id}</span>${esc(q.question)}</legend>
            <div class="ck-options">
              ${q.options.map((option, choice) => `
                <label class="ck-option">
                  <input type="radio" name="etd-${index}" value="${choice}" data-ck-question="${index}">
                  <span class="ck-option-letter" aria-hidden="true">${'ABCD'[choice]}</span>
                  <span>${esc(option)}</span>
                </label>`).join('')}
            </div>
          </fieldset>`).join('')}
        <div id="ck-finish">
          <p class="ck-note">Los ejemplos de insulina sirven para practicar. Sigue tu pauta personal.</p>
          <div class="ck-final-actions"><button class="ck-primary" type="submit">Finalizar y ver resultado</button></div>
        </div>
      </form>
      <section id="ck-outcome" aria-label="Resultado del cuestionario" hidden></section>
    </div>`;

  const form = dialog.querySelector('form');
  const finishBox = dialog.querySelector('#ck-finish');
  const outcome = dialog.querySelector('#ck-outcome');

  function updateProgress() {
    const answered = answers.filter(answer => answer !== null).length;
    dialog.querySelector('#ck-progress').value = answered;
    dialog.querySelector('#ck-progress-text').textContent = 'Respondidas: ' + answered + ' de ' + questions.length;
    start.textContent = result ? 'Ver resultado' : answered ? 'Continuar cuestionario' : 'Empezar cuestionario';
    status.textContent = result ? (result.passed ? 'Aprobado' : 'No aprobado') + ' · ' +
      result.correct + '/' + result.total + ' · ' + format.format(result.percentage) + ' %' : '';
  }

  function focusHeading(heading) {
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ block: 'start' });
  }

  function clear() {
    answers = questions.map(() => null);
    result = null;
    form.reset();
    form.querySelectorAll('fieldset').forEach(field => { field.disabled = false; });
    finishBox.hidden = false;
    outcome.hidden = true;
    outcome.replaceChildren();
    updateProgress();
  }

  function close(restoreFocus = true) {
    if (dialog.open) dialog.close();
    document.body.classList.remove('ck-modal-open');
    if (restoreFocus && authorized()) start.focus();
  }

  function finish() {
    if (result || !authorized()) return;
    result = core.evaluate(questions, answers);
    const missed = result.details.filter(detail => !detail.correct);
    const report = core.clinicalReport(title, result);
    form.querySelectorAll('fieldset').forEach(field => { field.disabled = true; });
    finishBox.hidden = true;
    outcome.innerHTML = `
      <div class="ck-result ${result.passed ? 'ck-result-pass' : 'ck-result-fail'}">
        <h3 id="ck-result-title" tabindex="-1" class="ck-result-label">${result.passed ? 'APROBADO' : 'NO APROBADO'}</h3>
        <strong class="ck-result-score">${format.format(result.percentage)} <small>%</small></strong>
        <p>${result.correct} de ${result.total} respuestas correctas</p>
        <div class="ck-score-details">
          <span><b>${result.correct}</b>Aciertos</span>
          <span><b>${result.incorrect}</b>Incorrectas</span>
          <span><b>${result.unanswered}</b>Sin responder</span>
        </div>
        <p class="ck-result-criterion">Se aprueba con ${result.minimumCorrect} de ${result.total} aciertos (al menos el ${core.THRESHOLD} %).</p>
      </div>
      <section class="ck-report" aria-labelledby="ck-report-label">
        <h3 id="ck-report-label">Informe para la historia clínica</h3>
        <label class="ck-sr" for="ck-report-text">Texto del informe</label>
        <textarea id="ck-report-text" readonly rows="6" spellcheck="false">${esc(report)}</textarea>
        <button class="ck-primary" type="button" data-ck-action="copy">Copiar informe</button>
        <p class="ck-copy-status" id="ck-copy-status" role="status"></p>
      </section>
      <section class="ck-review" aria-labelledby="ck-review-title">
        <h3 id="ck-review-title">Preguntas para repasar${missed.length ? ' (' + missed.length + ')' : ''}</h3>
        ${missed.length ? missed.map(detail => {
          const q = questions.find(question => question.id === detail.id);
          const [label, url] = sources[q.source];
          return `<article class="ck-review-item">
            <h4>${q.id}. ${esc(q.question)}</h4>
            <p><strong>Tu respuesta:</strong> ${detail.selected === null ? 'Sin responder.' : esc(q.options[detail.selected])}</p>
            <p class="ck-right-answer"><strong>Respuesta correcta:</strong> ${esc(q.options[q.correct])}</p>
            <p>${esc(q.explanation)}</p>
            <div class="ck-source-links"><a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a></div>
          </article>`;
        }).join('') : '<p class="ck-perfect">Has contestado correctamente todas las preguntas.</p>'}
      </section>
      <div class="ck-final-actions"><button class="ck-secondary" type="button" data-ck-action="reset">Nuevo paciente</button></div>`;
    outcome.hidden = false;
    updateProgress();
    focusHeading(dialog.querySelector('#ck-result-title'));
  }

  async function copyReport() {
    const report = dialog.querySelector('#ck-report-text');
    const notice = dialog.querySelector('#ck-copy-status');
    const copied = 'Informe copiado. Ya puedes pegarlo en la historia clínica.';
    try {
      await navigator.clipboard.writeText(report.value);
      notice.textContent = copied;
    } catch (_) {
      if (!report.isConnected) return;
      report.focus();
      report.select();
      report.setSelectionRange(0, report.value.length);
      let success = false;
      try { success = document.execCommand('copy'); } catch (_) { /* Copia manual disponible. */ }
      notice.textContent = success ? copied : 'Texto seleccionado. Pulsa Ctrl+C (o ⌘C en Mac) para copiarlo.';
    }
  }

  start.addEventListener('click', () => {
    if (!authorized() || dialog.open) return;
    dialog.showModal();
    document.body.classList.add('ck-modal-open');
    focusHeading(dialog.querySelector(result ? '#ck-result-title' : '#ck-title'));
  });
  form.addEventListener('change', event => {
    const input = event.target;
    if (!result && input.matches('[data-ck-question]:checked')) {
      answers[Number(input.dataset.ckQuestion)] = Number(input.value);
      updateProgress();
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const pending = answers.filter(answer => answer === null).length;
    if (pending && !window.confirm('Quedan ' + pending + ' preguntas sin responder. Contarán como no acertadas. ¿Quieres finalizar?')) return;
    finish();
  });
  dialog.addEventListener('click', event => {
    const action = event.target.closest('[data-ck-action]')?.dataset.ckAction;
    if (action === 'close') close();
    if (action === 'copy') copyReport();
    if (action === 'reset' && (!(result || answers.some(answer => answer !== null)) ||
      window.confirm('Se borrarán las respuestas y el resultado de este paciente. ¿Empezar un cuestionario nuevo?'))) {
      clear();
      focusHeading(dialog.querySelector('#ck-title'));
    }
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  function clearAndClose() { clear(); close(false); }
  document.getElementById('logoutButton')?.addEventListener('click', clearAndClose);
  new MutationObserver(() => { if (!authorized()) clearAndClose(); })
    .observe(privateArea, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('pagehide', clearAndClose);
  window.addEventListener('pageshow', event => { if (event.persisted) clearAndClose(); });
  updateProgress();
  start.disabled = false;
})();
