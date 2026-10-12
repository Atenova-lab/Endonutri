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
  function clinicalReport(title, result, date = new Date(), version = '') {
    const timestamp = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'short', timeStyle: 'short' }).format(date);
    const score = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(result.percentage);
    return 'Evaluación de conocimientos en diabetes.\n' +
      'Checklist: ' + title + '.\n' +
      'Fecha: ' + timestamp + '.\n' +
      'Resultado: ' + (result.passed ? 'APRUEBA' : 'NO APRUEBA') + ' el checklist.\n' +
      'Puntuación: ' + result.correct + '/' + result.total + ' respuestas correctas (' + score + ' %).\n' +
      'Respuestas incorrectas: ' + result.incorrect + '. Sin responder: ' + result.unanswered + '.\n' +
      'Criterio: aprobado con ≥70 % de aciertos sobre el total. Cada acierto suma 1 punto; las respuestas incorrectas y sin responder no suman ni restan.\n' +
      (version ? 'Versión del cuestionario: ' + version + '.\n' : '');
  }
  function createSession(quizzes, pageSize = 5) {
    const states = new Map();
    let currentId = null;
    const quizFor = id => {
      const quiz = quizzes.find(item => item.id === id);
      if (!quiz) throw new Error('Checklist desconocido');
      return quiz;
    };
    const stateFor = () => {
      if (!currentId || !states.has(currentId)) throw new Error('No hay un checklist abierto');
      return states.get(currentId);
    };
    return {
      select(id) {
        const quiz = quizFor(id);
        if (!states.has(id)) states.set(id, { answers: Array(quiz.questions.length).fill(null), page: 0, result: null, completedAt: null });
        currentId = id;
        return this.snapshot();
      },
      answer(index, selected) {
        const quiz = quizFor(currentId), state = stateFor();
        if (state.result) throw new Error('El checklist ya está finalizado');
        if (!Number.isInteger(index) || index < 0 || index >= quiz.questions.length) throw new Error('Pregunta fuera del checklist');
        if (selected !== null && (!Number.isInteger(selected) || selected < 0 || selected >= quiz.questions[index].options.length)) throw new Error('Respuesta fuera de las opciones');
        state.answers[index] = selected;
      },
      page(number) {
        const state = stateFor(), quiz = quizFor(currentId);
        if (!Number.isInteger(number)) throw new Error('Página no válida');
        state.page = Math.max(0, Math.min(number, Math.ceil(quiz.questions.length / pageSize) - 1));
        return this.snapshot();
      },
      finish(date = new Date()) {
        const state = stateFor(), quiz = quizFor(currentId);
        if (!state.result) { state.result = evaluate(quiz.questions, state.answers); state.completedAt = new Date(date); }
        return this.snapshot();
      },
      repeat(id) { quizFor(id); states.delete(id); return this.select(id); },
      resetPatient() { states.clear(); currentId = null; },
      hasWork() { return [...states.values()].some(state => state.result || state.answers.some(value => value !== null)); },
      results() {
        return quizzes.filter(quiz => states.get(quiz.id)?.result).map(quiz => {
          const state = states.get(quiz.id);
          return { quiz, result: state.result, completedAt: new Date(state.completedAt) };
        });
      },
      snapshot() {
        const quiz = quizFor(currentId), state = stateFor();
        return { quiz, answers: [...state.answers], page: state.page, pageSize, pages: Math.ceil(quiz.questions.length / pageSize), result: state.result, completedAt: state.completedAt ? new Date(state.completedAt) : null };
      }
    };
  }
  return { THRESHOLD, evaluate, clinicalReport, createSession };
});
