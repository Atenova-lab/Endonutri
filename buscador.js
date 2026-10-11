/* Buscador local de recursos: palabras cotidianas, sin enviar consultas fuera. */
(() => {
  'use strict';
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stop = new Set('a al algo ante con cual de del el en es esta este hay la las lo los me mi mis muy para por puedo que quiero se sin sobre tengo tu un una uno y yo como hacer saber'.split(' '));
  const aliases = {
    'herramientas-plato': 'metodo del plato plato saludable organizar comida verduras mitad plato equilibrado que comer',
    'macronutrientes': 'nutrientes alimentos aprender alimentacion hidratos proteinas grasas carbohidratos',
    'macro-hidratos': 'hidratos de carbono carbohidratos arroz pan pasta fruta legumbres azucar avena patata',
    'macro-proteinas': 'proteina proteinas pollo pescado carne huevo yogur leche queso tofu',
    'macro-grasas': 'grasa grasas aceite aguacate frutos secos almendras nueces mantequilla',
    'macro-densidad': 'densidad calorica dieta volumetrica volumen saciedad calorias energia comer mas cantidad',
    'herramientas-compra': 'comprar supermercado lista compra cesta alimentos compra saludable',
    'herramientas-etiquetas': 'etiqueta etiquetas envase ingredientes azucar sal grasa leer productos informacion nutricional',
    'herramientas-fuera': 'restaurante bar comer fuera tapas celebraciones viaje vacaciones',
    'obesidad-dietas': 'dietas mediterranea keto cetogenica ayuno vegetariana vegana paleo',
    'obesidad-que-es': 'obesidad sobrepeso enfermedad imc indice masa corporal',
    'obesidad-por-que': 'no adelgazo no pierdo peso cuesta perder peso estancamiento estancada estancado engordar',
    'obesidad-hambre': 'tengo hambre antojos picoteo apetito saciedad ansiedad comer hambre emocional atracones',
    'obesidad-mitos': 'mitos dudas verdad mentira engorda pan fruta noche',
    'obesidad-metabolismo': 'metabolismo gasto energia lento rapido quemar calorias metabolismo basal',
    'obesidad-composicion': 'musculo grasa peso bascula impedancia tanita composicion corporal masa muscular',
    'obesidad-piramide': 'habitos dormir sueno descanso constancia piramide motivacion',
    'ejercicio-empezar': 'empezar principiante novato sedentario sedentarismo no hago ejercicio comenzar actividad fisica',
    'ejercicio-casa': 'ejercicio en casa rutina rutinas bandas elasticas dia uno dia dos dia tres abdominales core sentadillas',
    'ejercicio-pasos': 'caminar paseo andar pasos movimiento diario caminar mas',
    'ejercicio-papef': 'papef activital uaef unidad activa ejercicio fisico andalucia ejercicio con ayuda apoyo profesional',
    'ejercicio-fuerza': 'fuerza entrenar entrenamiento gimnasio pesas mancuernas musculo recomposicion',
    'ejercicio-cardio': 'cardio resistencia bicicleta bici correr cinta hiit liss aerobico',
    'ejercicio-videos': 'video videos ejercicio ver demostracion',
    'equivalencias': 'intercambio intercambios equivalencia equivalencias cambiar sustituir comparar calcular pan por arroz pollo por pescado calculadora alimentos',
    'herramientas-raciones': 'racion raciones cantidad cantidades gramos medida medidas porcion porciones tamano',
    'planes-calorias': 'plan planes pauta menu menus pdf descargar imprimir desayuno almuerzo merienda cena recetas 1200 1400 1600 1800 2000 calorias',
    'planes-especiales': 'planes especiales necesidades especiales',
    'medicacion-glp1': 'medicacion medicamentos tratamiento glp1 glp-1 mounjaro wegovy ozempic saxenda semaglutida tirzepatida liraglutida dulaglutida inyeccion pinchazo efectos secundarios nauseas diabetes',
    'cuestionario-main': 'cuestionario preguntas rellenar formulario antes consulta sesion grupal',
    'cuestionario-pdf': 'cuestionario papel imprimir imprimible pdf antes consulta',
    'contacto': 'contacto contactar equipo correo email enfermera consulta ayuda'
  };
  function near(a, b) {
    if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
    let i=0, j=0, edits=0;
    while (i<a.length && j<b.length) {
      if(a[i]===b[j]) {i++;j++;continue;}
      if(++edits>1)return false;
      if(a.length>=b.length)i++;
      if(b.length>=a.length)j++;
    }
    return edits+(a.length-i)+(b.length-j)<=1;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const groups=window.ENDONUTRI_VISUAL_GROUPS;
    const shell=document.querySelector('.vn-top')?.parentElement;
    if(!groups || !shell || document.getElementById('vn-search'))return;
    const entries=groups.flatMap(group=>group.items.map(([route,title,hint])=>({route,title,hint,group:group.title})));
    entries.push(
      {route:'macro-hidratos',title:'Hidratos de carbono',hint:'Pan, arroz, pasta, patata, frutas y legumbres.',group:'Comer mejor'},
      {route:'macro-proteinas',title:'Proteínas',hint:'Carne, pescado, huevos, lácteos, legumbres y tofu.',group:'Comer mejor'},
      {route:'macro-grasas',title:'Grasas',hint:'Aceites, aguacate, frutos secos y otros alimentos.',group:'Comer mejor'}
    );
    for(const entry of entries) {
      const section=document.getElementById(entry.route.startsWith('macro-')?entry.route:'section-'+entry.route);
      const copy=section?.cloneNode(true);
      copy?.querySelectorAll('script,style,nav,.back-btn,.macro-sources,.evidence-box,.hunger-sources,.metabolism-sources').forEach(el=>el.remove());
      entry.titleText=normalize(entry.title);
      entry.keywords=normalize(aliases[entry.route] || '');
      if(entry.route==='equivalencias')entry.keywords+=' '+normalize((window.ENDONUTRI_EQ_FOODS || []).map(food=>food.name).join(' '));
      entry.bodyText=normalize(copy?.textContent || '');
      entry.words=(entry.titleText+' '+entry.keywords).split(' ');
    }
    function score(entry, query, tokens) {
      let total=entry.titleText.includes(query)?90:entry.keywords.includes(query)?75:0;
      let found=0;
      for(const token of tokens) {
        const exact=entry.words.includes(token);
        const prefix=!exact && token.length>=4 && entry.words.some(word=>word.startsWith(token) || (word.length>=4 && token.startsWith(word)));
        const fuzzy=!exact && !prefix && entry.words.some(word=>near(token,word));
        const body=!exact && !prefix && !fuzzy && entry.bodyText.includes(token);
        if(exact || prefix || fuzzy || body)found++;
        total+=exact?26:prefix?18:fuzzy?10:body?3:0;
      }
      // Las frases se resuelven por sus palabras relevantes, sin exigir tecnicismos.
      if(tokens.length && found<tokens.length && total<75)return 0;
      return found===tokens.length && tokens.length ? total+15 : total;
    }
    const panel=document.createElement('section'); panel.className='vn-search';
    panel.setAttribute('aria-label','Buscar una sección');
    panel.innerHTML=`<form id="vn-search-form" role="search"><label for="vn-search">¿Qué quieres encontrar?</label><div class="vn-search-field"><input type="search" id="vn-search" maxlength="120" placeholder="Por ejemplo: tengo hambre" autocomplete="off" aria-controls="vn-search-results"><button type="submit">Buscar <span aria-hidden="true">→</span></button></div></form><div class="vn-search-output" id="vn-search-output" hidden><div class="vn-search-status"><p id="vn-search-count" role="status" aria-live="polite" aria-atomic="true"></p><button type="button" id="vn-search-clear">Cerrar resultados ✕</button></div><div id="vn-search-results"></div></div>`;
    shell.after(panel);
    const input=document.getElementById('vn-search');
    const output=document.getElementById('vn-search-output');
    const results=document.getElementById('vn-search-results');
    const count=document.getElementById('vn-search-count');
    let timer;
    const result=entry=>`<button type="button" class="vn-search-result" data-vn-route="${escape(entry.route)}"><span><small>${escape(entry.group)}</small><strong>${escape(entry.title)}</strong><span>${escape(entry.hint)}</span></span><span aria-hidden="true">→</span></button>`;
    function clear() {clearTimeout(timer);input.value='';output.hidden=true;results.innerHTML='';count.textContent='';}
    function render(focus=false) {
      clearTimeout(timer);
      const query=normalize(input.value);
      if(query.length<2){output.hidden=true;results.innerHTML='';count.textContent='';return;}
      const tokens=query.split(' ').filter(word=>!stop.has(word));
      const found=tokens.length ? entries.map(entry=>({entry,score:score(entry,query,tokens)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score || a.entry.title.localeCompare(b.entry.title,'es')).map(item=>item.entry) : [];
      output.hidden=false;
      if(!found.length) {
        count.textContent='No hemos encontrado ese tema.';
        results.innerHTML='<p class="vn-search-empty">Prueba con una palabra más sencilla, como «hambre», «caminar» o «medicamentos». También puedes elegir uno de los seis temas del inicio.</p>';
      } else {
        count.textContent=found.length===1?'Hemos encontrado una sección. Tócala para abrirla.':`Hemos encontrado ${found.length} secciones. Toca la que te interesa.`;
        results.innerHTML=found.map(result).join('');
      }
      if(focus)results.querySelector('button')?.focus({preventScroll:true});
    }
    document.getElementById('vn-search-form').addEventListener('submit',event=>{event.preventDefault();render(true);});
    input.addEventListener('input',()=>{clearTimeout(timer);if(!input.value.trim()){clear();return;}timer=setTimeout(()=>render(),180);});
    input.addEventListener('keydown',event=>{if(event.key==='Escape'){clear();input.focus();}});
    panel.addEventListener('click',event=>{
      if(event.target.closest('[data-vn-route]'))clear();
    });
    document.getElementById('vn-search-clear').addEventListener('click',()=>{clear();input.focus();});
    window.ENDONUTRI_SEARCH=query=>{input.value=String(query).slice(0,120);render();return [...results.querySelectorAll('.vn-search-result')].map(button=>button.dataset.vnRoute);};
  });
})();
