/* Se conserva el contenido publicado. Solo cambia la forma de llegar a él. */
(() => {
  'use strict';
  const groups = [
    { id: 'comer', icon: '🥗', title: 'Comer mejor', hint: 'Plato, compra y alimentos', intro: 'Ideas sencillas para elegir y organizar lo que comes.', items: [
      ['herramientas-plato', 'Cómo preparar mi plato', 'Una guía visual para organizar tus comidas.'],
      ['macronutrientes', 'Qué me aportan los alimentos', 'Hidratos, proteínas y grasas, explicados fácil.'],
      ['herramientas-compra', 'Hacer una buena compra', 'Qué elegir cuando vas al supermercado.'],
      ['herramientas-etiquetas', 'Entender las etiquetas', 'En qué fijarte al mirar un envase.'],
      ['herramientas-fuera', 'Comer fuera de casa', 'Opciones para restaurantes y otras ocasiones.'],
      ['obesidad-dietas', 'Conocer los tipos de dietas', 'Qué propone cada una y qué debes tener en cuenta.'],
      ['macro-densidad', 'Comer más cantidad con menos energía', 'Qué es la densidad calórica y cómo influye en tu plato.']
    ]},
    { id: 'peso', icon: '💚', title: 'Entender mi peso', hint: 'Hambre, hábitos y dudas', intro: 'Comprende lo que te pasa, sin culpas y sin juicios.', items: [
      ['obesidad-que-es', '¿Qué es la obesidad?', 'Más allá del número que marca la báscula.'],
      ['obesidad-por-que', '¿Por qué me cuesta perder peso?', 'Los factores que influyen en tu cuerpo.'],
      ['obesidad-hambre', '¿Por qué tengo hambre?', 'Aprende a reconocer el hambre y la saciedad.'],
      ['obesidad-mitos', '¿Es verdad lo que me han contado?', 'Respuestas a los mitos más frecuentes.'],
      ['obesidad-metabolismo', 'Cómo utiliza energía mi cuerpo', 'El metabolismo, explicado de forma sencilla.'],
      ['obesidad-composicion', 'Grasa, músculo y peso', 'Por qué la báscula no lo cuenta todo.'],
      ['obesidad-piramide', 'Hábitos que ayudan a cuidarme', 'Pequeños cambios que puedes mantener.']
    ]},
    { id: 'mover', icon: '🚶', title: 'Moverme más', hint: 'Empezar y hacer ejercicio', intro: 'Elige por dónde empezar según lo que te interese.', items: [
      ['ejercicio-empezar', 'Quiero empezar a moverme', 'Primeros pasos si llevas tiempo sin hacer ejercicio.'],
      ['ejercicio-casa', 'Hacer ejercicio en casa', 'Tus sesiones explicadas con imágenes.'],
      ['ejercicio-pasos', 'Caminar y moverme cada día', 'Ideas para aumentar tu movimiento diario.'],
      ['ejercicio-papef', 'Ejercicio con apoyo profesional', 'Conoce el PAPEF y sus recursos en Andalucía.'],
      ['ejercicio-fuerza', 'Cuidar mi fuerza', 'Qué aporta el ejercicio de fuerza.'],
      ['ejercicio-cardio', 'Mejorar mi resistencia', 'Conoce las distintas formas de hacer cardio.'],
      ['ejercicio-videos', 'Ver vídeos de ejercicio', 'Accede a los recursos en vídeo.']
    ]},
    { id: 'planes', icon: '🍽️', title: 'Mis raciones y planes', hint: 'Cantidades e intercambios', intro: 'Herramientas para entender y seguir la pauta que trabajas en consulta.', items: [
      ['equivalencias', 'Cambiar un alimento por otro', 'La calculadora de intercambios en tres pasos.'],
      ['herramientas-raciones', 'Entender las cantidades', 'Ejemplos visuales del tamaño de las raciones.'],
      ['planes-calorias', 'Ver los planes de alimentación', 'Busca el plan que te han indicado en consulta.'],
      ['planes-especiales', 'Alimentación en situaciones especiales', 'Recursos para otras necesidades.']
    ]},
    { id: 'medicacion', icon: '💊', title: 'Mi medicación', hint: 'Medicamentos GLP-1', intro: 'Información para comprender tu tratamiento.', direct: 'medicacion-glp1', items: [
      ['medicacion-glp1', 'Medicamentos GLP-1', 'Información sobre los tratamientos y los hábitos que los acompañan.']
    ]},
    { id: 'consulta', icon: '📝', title: 'Preparar mi consulta', hint: 'Cuestionario y contacto', intro: 'Encuentra lo que necesitas antes de tu sesión grupal.', items: [
      ['cuestionario-main', 'Rellenar el cuestionario', 'Contesta desde el móvil o el ordenador.'],
      ['cuestionario-pdf', 'Prefiero hacerlo en papel', 'Descarga el cuestionario para imprimir.'],
      ['contacto', 'Contactar con el equipo', 'Consulta los datos de contacto.']
    ]}
  ];
  window.ENDONUTRI_VISUAL_GROUPS = groups;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cardImage = route => `img/tarjetas/${route}.webp`;
  const option = ([route, title, hint]) => `<button type="button" class="vn-option" data-vn-route="${esc(route)}"><img class="vn-card-image" src="${cardImage(route)}" alt="" width="768" height="768" loading="lazy" decoding="async"><span class="vn-card-copy"><strong>${esc(title)}</strong><small>${esc(hint)}</small></span><span class="vn-card-arrow" aria-hidden="true">→</span></button>`;
  document.addEventListener('DOMContentLoaded', () => {
    const home = document.getElementById('section-home');
    const main = document.getElementById('contentArea');
    if (!home || !main) return;
    document.body.classList.add('visual-navigation');
    document.title = 'ENDONUTRI · Tu salud, explicada fácil';
    document.querySelectorAll('.info-box').forEach(box => {
      if ((box.textContent || '').includes('Para actualizar el PDF')) box.remove();
    });
    const top = document.createElement('div');
    top.className = 'vn-shell vn-header-shell';
    top.innerHTML = `<header class="vn-top"><div class="vn-brand"><span class="vn-brand-icon" aria-hidden="true">🌿</span><span><strong>Endonutri</strong><small>Aprende · Cuídate · Avanza</small></span></div><nav class="vn-top-actions" aria-label="Accesos principales"><button type="button" class="vn-home-button" data-vn-route="home"><svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/></svg> Inicio</button><button type="button" id="vn-font" aria-pressed="false" aria-label="Activar letra más grande">A+ <span>Letra</span></button></nav></header>`;
    document.getElementById('mainWrapper').prepend(top);
    home.innerHTML = `<div class="vn-shell"><div class="vn-intro"><span class="vn-eyebrow">NUTRICIÓN · EJERCICIO · SALUD</span><h1>Un paso para cuidarte mejor</h1><p>Toca el tema que te interesa.</p></div><nav class="vn-map" aria-label="Elige un tema"><figure class="vn-center"><img src="img/hero-endonutri.webp" alt="Personas de distintas edades rodeadas de alimentos y elementos de ejercicio" width="1254" height="1254"></figure>${groups.map(g => `<button type="button" class="vn-topic" data-vn-route="${g.direct || 'tema-' + g.id}"><img class="vn-topic-image" src="${cardImage(g.items[0][0])}" alt="" width="768" height="768" decoding="async"><span class="vn-topic-copy"><strong>${g.title}</strong><small>${g.hint}</small></span><span class="vn-topic-arrow" aria-hidden="true">→</span></button>`).join('')}</nav></div>`;
    groups.filter(g => !g.direct).forEach(g => {
      const section = document.createElement('section');
      section.className = 'section'; section.id = 'section-tema-' + g.id;
      section.innerHTML = `<div class="vn-hub" data-vn-theme="${g.id}"><header class="vn-hub-head"><h2 tabindex="-1">${g.title}</h2><p>${g.intro}</p></header><div class="vn-options">${g.items.map(option).join('')}</div></div>`;
      main.appendChild(section);
    });
    const footer = document.createElement('footer');
    footer.className = 'vn-bottom';
    footer.innerHTML = `<a href="profesionales.html">Área profesional →</a>`;
    main.after(footer);
    main.querySelectorAll('button[onclick], a[onclick]').forEach(button => {
      if ((button.getAttribute('onclick') || '').includes("'home'")) button.remove();
    });
    document.querySelectorAll('.macro-panel').forEach(panel => {
      const summary = panel.querySelector('summary');
      if (!summary) return;
      const image = document.createElement('img');
      image.className = 'vn-panel-image'; image.src = cardImage(panel.id);
      image.alt = ''; image.width = 768; image.height = 768;
      image.loading = 'lazy'; image.decoding = 'async';
      summary.prepend(image);
    });
    const legacyShow = window.showSection;
    let currentRoute = 'home';
    function navigate(route, historyMode = 'push', focus = true) {
      const isMacro = route.startsWith('macro-');
      const sectionRoute = isMacro ? 'macronutrientes' : route;
      const section = document.getElementById('section-' + sectionRoute);
      if (!section) return false;
      currentRoute = route;
      legacyShow(sectionRoute);
      document.body.classList.toggle('vn-home', sectionRoute === 'home');
      if (isMacro) {
        const panel = document.getElementById(route);
        if (panel) { panel.open = true; requestAnimationFrame(() => panel.scrollIntoView({behavior: 'smooth', block: 'start'})); }
      }
      // Un único acceso a Inicio; conserva los controles propios del cuestionario.
      section.querySelectorAll('button[onclick], a[onclick]').forEach(button => {
        if ((button.getAttribute('onclick') || '').includes("'home'")) button.remove();
      });
      if (historyMode) {
        const hash = route === 'home' ? '#inicio' : '#' + route;
        try { if (location.hash !== hash) history[historyMode === 'replace' ? 'replaceState' : 'pushState']({route}, '', hash); } catch (_) {}
      }
      if (focus && !isMacro) {
        const heading = section.querySelector('h1, h2');
        if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({preventScroll: true}); }
      }
      return true;
    }
    window.showSection = (route) => navigate(route);
    window.ENDONUTRI_VISUAL_NAVIGATE = navigate;
    window.showMacronutriente = id => navigate('macro-' + id);
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-vn-route]');
      if (!button) return;
      event.preventDefault(); navigate(button.dataset.vnRoute);
    });
    window.addEventListener('popstate', () => navigate(location.hash.slice(1) === 'inicio' ? 'home' : location.hash.slice(1) || 'home', null));
    window.addEventListener('hashchange', () => {
      const route = location.hash.slice(1) === 'inicio' ? 'home' : location.hash.slice(1) || 'home';
      if (route !== currentRoute && document.getElementById('section-' + (route.startsWith('macro-') ? 'macronutrientes' : route))) navigate(route, null);
    });
    const font = document.getElementById('vn-font');
    function setFont(large) {
      document.body.classList.toggle('vn-large-text', large);
      font.setAttribute('aria-pressed', String(large));
      font.setAttribute('aria-label', large ? 'Volver al tamaño de letra normal' : 'Activar letra más grande');
      font.innerHTML = large ? 'A− <span>Letra</span>' : 'A+ <span>Letra</span>';
    }
    font.addEventListener('click', () => {
      const large = !document.body.classList.contains('vn-large-text'); setFont(large);
      try { localStorage.setItem('endonutri-large-text', String(large)); } catch (_) {}
    });
    try { setFont(localStorage.getItem('endonutri-large-text') === 'true'); } catch (_) {}
    const initialRoute = location.hash.slice(1) === 'inicio' ? 'home' : location.hash.slice(1) || 'home';
    if (!navigate(initialRoute, 'replace', false)) navigate('home', 'replace', false);
  });
})();
