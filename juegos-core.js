/* Modelo compartido: cada reto puntúa una sola vez, únicamente en el primer intento. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EndonutriGamesCore = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function createSession(items) {
    if (!Array.isArray(items) || !items.length) throw new Error('La sesión necesita retos');
    return { items: items.slice(), index: 0, rounds: items.map(() => ({ attempts: 0, solved: false, point: false })) };
  }
  function attempt(session, correct) {
    if (session.index >= session.items.length || session.rounds[session.index].solved) return session;
    const rounds = session.rounds.map(round => ({ ...round }));
    const round = rounds[session.index];
    round.point = correct === true && round.attempts === 0;
    round.attempts++;
    round.solved = correct === true;
    return { ...session, rounds };
  }
  function advance(session) {
    if (session.index >= session.items.length || !session.rounds[session.index].solved) return session;
    return { ...session, index: session.index + 1 };
  }
  function score(session) { return session.rounds.filter(round => round.point).length; }
  function evaluatePlate(choices, foods) {
    const roles = ['veg', 'veg', 'protein', 'carbs'];
    const valid = roles.map((role, index) => !!foods.find(food => food.id === choices[index])?.roles.includes(role));
    return { valid, correct: valid.every(Boolean), complete: choices.length === 4 && choices.every(Boolean) };
  }
  return { shuffle, createSession, attempt, advance, score, evaluatePlate };
});
