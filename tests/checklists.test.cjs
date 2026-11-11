const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluate, clinicalReport } = require('../checklists-core.js');
const { questions, title, sources } = require('../diabetes-checklists-data.js');

test('Conserva las once preguntas y la clave del PDF, con explicación y referencia por pregunta', () => {
  assert.deepEqual(questions.map(q => q.id), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.deepEqual(questions.map(q => q.correct + 1), [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4]);
  assert.ok(questions.every(q => q.options.length === 4 && q.explanation && sources[q.source]));
});
test('El 70 % se aplica a las 11 preguntas sin redondear ni penalizar errores', () => {
  const correct = questions.map(q => q.correct);
  const wrong = questions.map(q => (q.correct + 1) % q.options.length);
  const pass = evaluate(questions, [...correct.slice(0, 8), ...wrong.slice(8)]);
  const fail = evaluate(questions, [...correct.slice(0, 7), ...wrong.slice(7)]);
  assert.equal(pass.passed, true);
  assert.equal(pass.minimumCorrect, 8);
  assert.equal(pass.incorrect, 3);
  assert.equal(fail.passed, false);
  assert.equal(fail.correct, 7);
  assert.equal(evaluate(questions, correct.slice(0, 8)).unanswered, 3);
  assert.equal(evaluate(questions, []).percentage, 0);
  assert.equal(evaluate(questions, correct).percentage, 100);
  assert.match(clinicalReport(title, pass), /Resultado: APROBADO\.[\s\S]*8\/11 respuestas correctas \(72,73 %\)/);
  assert.match(clinicalReport(title, fail), /Resultado: NO APROBADO\.[\s\S]*7\/11 respuestas correctas \(63,64 %\)/);
});
