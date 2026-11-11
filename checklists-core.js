/* Puntuación y texto clínico; sin persistencia ni envío de datos del paciente. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.EndonutriChecklists = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const THRESHOLD = 70;
  function evaluate(questions, answers) {
    if (!Array.isArray(questions) || !questions.length) throw new Error('Cuestionario sin preguntas');
    let correct = 0, unanswered = 0;
    const details = questions.map((question, index) => {
      const selected = answers[index];
      const accepted = Array.isArray(question.correct) ? question.correct : [question.correct];
      const empty = selected === null || selected === undefined;
      if (!empty && (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length)) throw new Error('Respuesta fuera de las opciones');
      const right = !empty && accepted.includes(selected);
      correct += right ? 1 : 0; unanswered += empty ? 1 : 0;
      return { id: question.id, selected: empty ? null : selected, correct: right };
    });
    const total = questions.length;
    return { total, correct, incorrect: total - correct - unanswered, unanswered, percentage: correct * 100 / total, passed: correct * 100 >= THRESHOLD * total, minimumCorrect: Math.ceil(total * THRESHOLD / 100), details };
  }
  function clinicalReport(title, result) {
    const score = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(result.percentage);
    return 'Evaluación de conocimientos en diabetes.\n' +
      title + '.\n' +
      'Resultado: ' + (result.passed ? 'APROBADO' : 'NO APROBADO') + '.\n' +
      'Puntuación: ' + result.correct + '/' + result.total + ' respuestas correctas (' + score + ' %).\n' +
      'Respuestas incorrectas: ' + result.incorrect + '. Sin responder: ' + result.unanswered + '.\n' +
      'Criterio: aprobado con al menos el 70 % de aciertos sobre el total. Cada acierto suma 1 punto; las respuestas incorrectas y sin responder no suman ni restan.';
  }
  return { THRESHOLD, evaluate, clinicalReport };
});
