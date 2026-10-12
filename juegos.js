/* Juegos de pacientes: controles táctiles, explicación inmediata y puntuación por primer intento. */
(() => {
  'use strict';
  const D = window.EndonutriGamesData, C = window.EndonutriGamesCore;
  if (!D || !C) return;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const food = id => D.foods.find(item => item.id === id);
  const categories = [
    { id:'carbs', name:'Hidratos de carbono', icon:'🍞', route:'macro-hidratos' },
    { id:'protein', name:'Proteínas', icon:'🥚', route:'macro-proteinas' },
    { id:'fats', name:'Grasas', icon:'🫒', route:'macro-grasas' }
  ];
  const slotLabels = ['Verdura 1','Verdura 2','Proteína','Cereal o tubérculo'];
  let root, mode = 'menu', session = null, selected = null, feedback = null, picks = [], activeSlot = 0, quiz = null;
  let retryMode = 'plate', retryQuiz = null;
  const header = (title, lead) => '<header class="games-head"><button type="button" class="games-back" data-game-action="menu">← Elegir otro juego</button><span class="games-kicker">APRENDE A TU RITMO</span><h2 tabindex="-1">' + esc(title) + '</h2><p>' + esc(lead) + '</p></header>';
  const progress = () => '<div class="games-progress"><span>Reto ' + (session.index + 1) + ' de ' + session.items.length + '</span><strong>Puntos: ' + C.score(session) + ' / ' + session.items.length + '</strong></div><div class="games-progressbar" role="progressbar" aria-label="Retos completados" aria-valuemin="0" aria-valuemax="' + session.items.length + '" aria-valuenow="' + session.index + '"><span style="width:' + session.index / session.items.length * 100 + '%"></span></div>';
  const sources = '<details class="games-sources"><summary>De dónde salen estas ideas</summary><p>Estos juegos repasan el método del plato, los macronutrientes, las etiquetas, el movimiento y los hábitos explicados en Endonutri.</p><a href="https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html" target="_blank" rel="noopener">Método del plato · CDC ↗</a><br><a href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" target="_blank" rel="noopener">Alimentación saludable · OMS ↗</a><br><a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener">Actividad física · OMS ↗</a><br><a href="https://europa.eu/youreurope/business/product-rules-compliance/food/labelling-rules/index_en.htm" target="_blank" rel="noopener">Etiquetado de alimentos · Unión Europea ↗</a></details>';
  function focusHeading() { root.querySelector('h2')?.focus({ preventScroll: false }); }
  function menu() {
    mode = 'menu';
    root.innerHTML = '<header class="games-head"><span class="games-kicker">PRACTICA LO QUE YA SABES</span><h2 tabindex="-1">Juega y aprende</h2><p>Elige un juego. Puedes probar, equivocarte y volver a intentarlo.</p></header>' +
      '<div class="games-menu"><button type="button" class="games-menu-card" data-game-action="plate"><span aria-hidden="true">🥗</span><strong>Monta tu plato</strong><small>Elige alimentos y colócalos tocando las partes del plato.</small><b>3 retos · Empezar →</b></button>' +
      '<button type="button" class="games-menu-card" data-game-action="macros"><span aria-hidden="true">🍞</span><strong>¿Qué me aporta?</strong><small>Reconoce fuentes de hidratos, proteínas y grasas.</small><b>10 alimentos · Empezar →</b></button>' +
      '<button type="button" class="games-menu-card" data-game-action="quizzes"><span aria-hidden="true">💡</span><strong>Pon a prueba lo aprendido</strong><small>Preguntas cortas sobre las ideas clave de Endonutri.</small><b>5 temas · Elegir →</b></button></div>' +
      '<div class="games-rules"><p><strong>Un punto si aciertas en el primer intento.</strong> Los errores no restan. Después podrás repetir para aprender.</p><p>Sin límite de tiempo. No necesitas registrarte.</p></div>' + sources;
    focusHeading();
  }
  function topics() {
    mode = 'topics';
    root.innerHTML = header('Elige un tema', 'Cada minitest tiene cinco preguntas. Al terminar verás tu puntuación y las ideas que puedes repasar.') +
      '<div class="games-topics">' + D.quizzes.map(item => '<button type="button" class="games-topic" data-game-action="quiz" data-game-quiz="' + esc(item.id) + '"><span aria-hidden="true">' + item.icon + '</span><span><strong>' + esc(item.title) + '</strong><small>' + esc(item.hint) + ' · 5 preguntas</small></span></button>').join('') + '</div>';
    focusHeading();
  }
  function start(type, quizId) {
    mode = type; selected = null; feedback = null; picks = Array(4).fill(null); activeSlot = 0;
    quiz = type === 'quiz' ? D.quizzes.find(item => item.id === quizId) : null;
    if (type === 'quiz' && !quiz) { topics(); return; }
    const items = type === 'plate' ? D.plates : type === 'macros' ? C.shuffle(D.macros) : quiz.questions.map(item => ({ ...item, order: C.shuffle(item.options.map((_, index) => index)) }));
    session = C.createSession(items); retryMode = type; retryQuiz = quiz?.id || null;
    render(); focusHeading();
  }
  function feedbackHTML(text, correct) {
    if (!feedback) return '';
    const title = feedback.incomplete ? 'Todavía falta una parte' : correct ? '¡Lo has conseguido!' : 'Vamos a repasarlo';
    const button = feedback.incomplete ? '' : correct ? '<button type="button" class="games-button" data-game-action="next">' + (session.index + 1 === session.items.length ? 'Ver mi puntuación' : 'Siguiente reto →') + '</button>' : '<button type="button" class="games-button" data-game-action="retry">Volver a intentarlo</button>';
    return '<div class="games-feedback' + (correct ? ' is-right' : '') + '" tabindex="-1" role="status"><strong>' + title + '</strong><p>' + text + '</p>' + button + '</div>';
  }
  function renderPlate() {
    const item = session.items[session.index];
    const locked = session.rounds[session.index].solved;
    root.innerHTML = header('Monta tu plato', '1. Toca una parte del plato. 2. Toca el alimento que quieres añadir.') + progress() +
      '<article class="games-question"><h3>' + esc(item.title) + '</h3><p class="games-lead">' + esc(item.intro) + '</p><div class="games-plate-layout"><div><div class="games-plate" aria-label="Mitad de verduras, un cuarto de proteína y un cuarto de cereales o tubérculos">' +
      picks.map((id, index) => '<button type="button" class="games-slot" data-game-action="slot" data-game-slot="' + index + '" aria-pressed="' + (activeSlot === index) + '" aria-label="' + esc(slotLabels[index] + ': ' + (food(id)?.name || 'sin elegir')) + '"' + (locked ? ' disabled' : '') + '><small>' + slotLabels[index] + '</small><span aria-hidden="true">' + (food(id)?.icon || '＋') + '</span><strong>' + esc(food(id)?.name.split(' ')[0] || (index < 2 ? 'Verdura' : index === 2 ? 'Proteína' : 'Arroz / patata')) + '</strong></button>').join('') +
      '</div><p class="games-tip">Orientación visual: ½ verduras, ¼ proteína y ¼ cereales o tubérculos. Las legumbres pueden aportar proteína e hidratos.</p></div><div><p class="games-active-slot" role="status">Ahora eliges: <strong>' + slotLabels[activeSlot] + '</strong></p><div class="games-foods">' +
      item.foodIds.map(id => '<button type="button" class="games-food" data-game-action="food" data-game-food="' + id + '"' + (locked ? ' disabled' : '') + '><span aria-hidden="true">' + food(id).icon + '</span>' + esc(food(id).name) + '</button>').join('') + '</div></div></div>' +
      '<div class="games-actions"><button type="button" class="games-button" data-game-action="check-plate"' + (locked ? ' disabled' : '') + '>Comprobar mi plato</button><button type="button" class="games-button secondary" data-game-action="clear-plate"' + (locked ? ' disabled' : '') + '>Vaciar plato</button></div>' +
      feedbackHTML(feedback?.text || '', locked) + '<p class="games-tip">El dibujo ayuda a practicar proporciones. Las cantidades reales se adaptan a tu pauta, hambre y necesidades. Puedes cocinar los ingredientes juntos y acompañar la comida de agua.</p></article>';
  }
  function renderQuestion() {
    const item = session.items[session.index], macro = mode === 'macros', locked = !!feedback;
    root.innerHTML = header(macro ? '¿Qué me aporta este alimento?' : quiz.title, macro ? 'Elige el grupo en el que lo usamos como fuente destacada. Puede aportar otros nutrientes también.' : 'Toca una respuesta. Después te explicamos la idea clave.') + progress() +
      '<article class="games-question">' + (macro ? '<div class="games-food-hero"><span class="games-food-symbol" aria-hidden="true">' + item.icon + '</span><h3>' + esc(item.name) + '</h3></div>' : '<h3>' + esc(item.text) + '</h3>') +
      '<div class="games-answers">' + (macro ? categories.map((cat, index) => {
        const right = locked && cat.id === item.answer, chosen = selected === cat.id;
        return answerButton(cat.id, cat.icon + ' ' + cat.name, index, right, chosen, locked);
      }).join('') : item.order.map((index, displayIndex) => answerButton(index, item.options[index], displayIndex, locked && index === item.answer, selected === index, locked)).join('')) + '</div>' +
      feedbackHTML(esc(item.why), session.rounds[session.index].solved) + '</article>';
  }
  function answerButton(value, text, index, right, chosen, locked) {
    return '<button type="button" class="games-answer' + (right ? ' is-right' : '') + (chosen ? ' is-chosen' : '') + '" data-game-action="answer" data-game-answer="' + value + '"' + (locked ? ' disabled' : '') + '><span class="games-answer-marker" aria-hidden="true">' + (right ? '✓' : String.fromCharCode(65 + index)) + '</span><span>' + esc(text) + (right ? '<small> · Respuesta correcta</small>' : '') + '</span></button>';
  }
  function render() {
    if (session.index >= session.items.length) { result(); return; }
    if (mode === 'plate') renderPlate(); else renderQuestion();
  }
  function result() {
    const points = C.score(session), total = session.items.length;
    const review = session.items.filter((item, index) => !session.rounds[index].point);
    const title = mode === 'plate' ? 'Tus tres platos' : mode === 'macros' ? 'Reconocer los nutrientes' : quiz.title;
    root.innerHTML = header('Reto terminado', title) + '<div class="games-result"><span aria-hidden="true" style="font-size:40px">🌿</span><h3>Tu puntuación final</h3><strong class="games-score">' + points + ' / ' + total + '</strong><p>Has acertado ' + points + ' de ' + total + ' en el primer intento. Has completado todos los retos, también los que has practicado con ayuda.</p><p>' + (points === total ? '¡Todas las ideas de este reto están bien reconocidas!' : 'Cada intento sirve para aprender. Puedes repasar estas ideas y volver a jugar.') + '</p><div class="games-actions"><button type="button" class="games-button" data-game-action="again">Volver a jugar</button><button type="button" class="games-button secondary" data-game-action="menu">Elegir otro juego</button></div></div>' +
      (review.length ? '<section class="games-review"><h3>Ideas para reforzar</h3><ul>' + review.map(item => {
        const route = mode === 'plate' ? 'herramientas-plato' : mode === 'macros' ? categories.find(cat => cat.id === item.answer).route : item.route;
        return '<li><strong>' + esc(item.title || item.name || item.text) + '</strong><br><button type="button" data-vn-route="' + route + '">Ver la explicación en Endonutri →</button></li>';
      }).join('') + '</ul></section>' : '') + sources;
    focusHeading();
  }
  document.addEventListener('DOMContentLoaded', () => {
    root = document.getElementById('games-root');
    if (!root) return;
    menu();
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-game-action]');
      if (!button || !root.contains(button) || button.disabled) return;
      const action = button.dataset.gameAction;
      if (action === 'menu') { menu(); return; }
      if (action === 'quizzes') { topics(); return; }
      if (action === 'plate' || action === 'macros') { start(action); return; }
      if (action === 'quiz') { start('quiz', button.dataset.gameQuiz); return; }
      if (action === 'again') { start(retryMode, retryQuiz); return; }
      if (!session || session.index >= session.items.length) return;
      const item = session.items[session.index];
      if (action === 'slot') {
        activeSlot = Number(button.dataset.gameSlot); renderPlate();
        root.querySelector('[data-game-slot="' + activeSlot + '"]')?.focus({ preventScroll: true }); return;
      }
      if (action === 'food') {
        if (session.rounds[session.index].solved) return;
        const id = button.dataset.gameFood;
        if (!item.foodIds.includes(id)) return;
        picks[activeSlot] = id; feedback = null;
        const next = picks.findIndex(value => !value); if (next !== -1) activeSlot = next;
        renderPlate(); root.querySelector('[data-game-food="' + id + '"]')?.focus({ preventScroll: true }); return;
      }
      if (action === 'clear-plate') { picks = Array(4).fill(null); activeSlot = 0; feedback = null; renderPlate(); return; }
      if (action === 'check-plate') {
        const evaluation = C.evaluatePlate(picks, D.foods);
        if (!evaluation.complete) feedback = { incomplete:true, text:'Toca las partes que aún están vacías y elige un alimento para cada una.' };
        else {
          session = C.attempt(session, evaluation.correct);
          const missing = slotLabels.filter((label, index) => !evaluation.valid[index]);
          feedback = { text: evaluation.correct ? 'Has combinado verduras, una fuente de proteína y un alimento con hidratos. Hay muchas formas válidas de montar el plato; las legumbres también pueden encajar como proteína o hidratos.' : 'Revisa: <strong>' + missing.map(esc).join(', ') + '</strong>. Para la mitad de verduras, elige hortalizas; para la proteína, pescado, huevo, pollo, tofu o legumbres; para los hidratos, cereal, tubérculo o legumbres.' };
        }
        renderPlate(); root.querySelector('.games-feedback')?.focus(); return;
      }
      if (action === 'answer') {
        if (feedback) return;
        selected = mode === 'macros' ? button.dataset.gameAnswer : Number(button.dataset.gameAnswer);
        session = C.attempt(session, selected === item.answer); feedback = {};
        renderQuestion(); root.querySelector('.games-feedback')?.focus(); return;
      }
      if (action === 'retry') { selected = null; feedback = null; render(); root.querySelector('h3')?.setAttribute('tabindex','-1'); root.querySelector('h3')?.focus({ preventScroll: true }); return; }
      if (action === 'next') {
        const advanced = C.advance(session); if (advanced === session) return;
        session = advanced; feedback = null; selected = null; picks = Array(4).fill(null); activeSlot = 0;
        render(); focusHeading();
      }
    });
  });
})();
