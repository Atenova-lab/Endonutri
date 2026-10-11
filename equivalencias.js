/* Una calculadora educativa: equivalencias por energía o macronutriente. */
(() => {
  const groups = {
    hidratos:{title:'HC · Hidratos de carbono',key:'carbs',label:'hidratos disponibles',defaultFood:'pan',grams:40,note:'Frutas, pan, arroz, pasta, cuscús, tortillas, patata y legumbres. El peso seco y el cocido son referencias distintas. Las legumbres también aportan proteína.'},
    proteinas:{title:'P · Proteínas',key:'protein',label:'proteína',defaultFood:'pollo',grams:100,note:'Carnes, pescados, huevos, legumbres, leche, yogures, quesos y tofu. Igualar la proteína no iguala las calorías, las grasas ni la calidad de la proteína. Una ración equivalente de leche o legumbres puede ser muy grande.'},
    grasas:{title:'G · Grasas',key:'fat',label:'grasa',defaultFood:'aceite-oliva',grams:10,note:'Aceites, aguacate, mantequilla, frutos secos y semillas. Igualar grasa o calorías no iguala la calidad nutricional. Prioriza habitualmente grasas insaturadas. Mantequilla y aceite de coco tienen más grasas saturadas.'}
  };
  const fmt=(n,digits=1)=>n.toLocaleString('es-ES',{maximumFractionDigits:digits});
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const aliases={cuscus:'couscous cous cous', 'cuscus-seco':'couscous cous cous', 'tortilla-trigo':'fajita wrap', 'tortilla-maiz':'fajita wrap',pina:'anana',gambas:'marisco',guisantes:'arvejas',edamame:'soja verde', 'crema-cacahuete':'mantequilla de cacahuete'};
  const matches=(f,q)=>normalize(f.name+' '+f.state+' '+(aliases[f.id]||'')).includes(normalize(q));
  const nutrients=(f,g)=>({kcal:g*f.kcal/100,carbs:g*f.carbs/100,protein:g*f.protein/100,fat:g*f.fat/100});
  let chooseGroup;
  window.openEquivalencias=id=>{
    if(id&&groups[id]&&chooseGroup)chooseGroup(id);
    showSection('equivalencias');
    requestAnimationFrame(()=>document.getElementById('section-equivalencias')?.scrollIntoView({behavior:'smooth',block:'start'}));
  };
  document.addEventListener('DOMContentLoaded',()=>{
    if(!Array.isArray(window.ENDONUTRI_EQ_FOODS)||!document.getElementById('section-macronutrientes')||document.getElementById('section-equivalencias'))return;
    const collator=new Intl.Collator('es',{sensitivity:'base',numeric:true});
    const foods=[...window.ENDONUTRI_EQ_FOODS].sort((a,b)=>collator.compare(a.name,b.name));
    const section=document.createElement('section');section.id='section-equivalencias';section.className='section';
    section.innerHTML=`<div class="section-header"><button class="back-btn" onclick="showSection('home')">← Inicio</button><h2>Calculadora de equivalencias</h2><p>Una herramienta para comparar alimentos y entender sus raciones.</p></div><div class="macro-page"><div class="macro-intro"><span class="macro-kicker">COMPARA · APRENDE · ELIGE</span><h3>¿Qué cantidad de otro alimento equivale?</h3><p>Elige <strong>HC, P o G</strong>, busca un alimento y escribe cuánto vas a pesar. Puedes comparar por gramos del macronutriente o por calorías. Los alimentos se muestran por orden alfabético.</p><p class="macro-note">Una equivalencia no significa que dos alimentos sean idénticos ni que tengas que comer esa cantidad. Mira también los demás nutrientes y el estado en que se pesa cada alimento.</p></div><div class="eq-calculator" id="eq-calculator"><form id="eq-form" novalidate><fieldset class="eq-groups"><legend>1. Elige el grupo de alimentos</legend>${Object.entries(groups).map(([id,g])=>`<label><input type="radio" name="group" value="${id}" ${id==='hidratos'?'checked':''}><span>${g.title}</span></label>`).join('')}</fieldset><p id="eq-group-note"></p><div class="eq-search-reference"><label for="eq-search">2. Busca tu alimento de referencia</label><input id="eq-search" name="search" type="search" placeholder="Ej.: manzana, cuscús, queso…" aria-describedby="eq-search-count" autocomplete="off"><p id="eq-search-count" class="macro-small" role="status"></p></div><div class="eq-form-grid"><label>Alimento de referencia<select name="food" aria-describedby="eq-weigh"></select></label><label>Gramos de alimento<input name="grams" type="number" min="0.1" max="2000" step="0.1" value="40" inputmode="decimal"></label><label>Qué quieres igualar<select name="criterion"></select></label></div><p class="eq-weigh" id="eq-weigh"></p><details class="eq-label-details"><summary>¿Tu producto tiene otros valores? Usa su etiqueta</summary><div class="eq-label-body"><label class="eq-checkbox"><input name="custom" type="checkbox"><span>Usar los valores de mi etiqueta como referencia</span></label><p class="macro-small">Todos los datos son <strong>por 100 g</strong>. Usa el mismo estado del alimento que has pesado. En etiquetas europeas, copia «hidratos de carbono» sin restar otra vez la fibra.</p><div class="eq-label-fields"><label>Nombre del producto<input name="customName" type="text" maxlength="80" placeholder="Mi producto" disabled></label>${[['kcal','Energía (kcal)',1000],['carbs','Hidratos (g)',100],['protein','Proteínas (g)',100],['fat','Grasas (g)',100]].map(([key,label,max])=>`<label>${label}<input name="custom-${key}" type="number" min="0" max="${max}" step="0.01" inputmode="decimal" disabled></label>`).join('')}</div></div></details><button class="eq-submit" type="submit">Calcular equivalencias</button></form><div id="eq-status" class="eq-status" role="status" aria-live="polite" aria-atomic="true"></div><div class="eq-result-search"><label for="eq-result-query">Busca entre las equivalencias</label><input id="eq-result-query" type="search" placeholder="Filtra la tabla: manzana, arroz, leche…" autocomplete="off"><p id="eq-result-count" class="macro-small" role="status"></p></div><div id="eq-results" class="eq-results"></div><p class="eq-footnote">≈ significa «aproximadamente». Pesos en gramos de la parte comestible, según el estado indicado; también en bebidas. Los resultados son comparaciones educativas, no raciones recomendadas ni una pauta de dieta.</p></div><details class="macro-sources"><summary>Fuentes y cómo se calculan las equivalencias</summary><div><p>Valores medios por 100 g de porción comestible de <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener">USDA FoodData Central, SR Legacy</a>. La variedad, marca y preparación pueden cambiar estos valores. Cada alimento tiene una referencia propia: no se han aplicado datos de un alimento a otro parecido.</p><p>Para hidratos disponibles se estima «hidratos totales menos fibra». Es una aproximación, no una medición directa. <a href="https://fdc.nal.usda.gov/Foundation_Foods_Documentation/" target="_blank" rel="noopener">USDA explica que los hidratos totales incluyen fibra</a>. Si tienes etiqueta europea, copia «hidratos de carbono» tal como aparece, sin restar otra vez la fibra. Los valores de tu etiqueta se utilizan solo como referencia y no se guardan.</p><p>Cantidad equivalente = gramos de referencia × valor por 100 g de la referencia ÷ valor por 100 g del alimento comparado. Se calcula sin redondear y se muestra con un decimal como máximo.</p></div></details></div>`;
    document.getElementById('section-macronutrientes').after(section);
    const densityLink=document.querySelector('a[href="#macro-densidad"]');
    if(densityLink){const link=document.createElement('a');link.href='#equivalencias';link.textContent='Calculadora de equivalencias';link.setAttribute('onclick',"showSection('equivalencias');return false");densityLink.after(link);}
    const quick=document.createElement('div');quick.className='eq-shortcuts';quick.innerHTML='<h4>Calculadora de equivalencias</h4><p>Compara raciones de hidratos, proteínas o grasas en una sola herramienta.</p><button type="button" onclick="openEquivalencias()">Abrir la calculadora <span aria-hidden="true">→</span></button>';document.querySelector('#section-macronutrientes .macro-intro').append(quick);
    const densityCTA=document.createElement('p');densityCTA.className='macro-note';densityCTA.innerHTML='<strong>Prueba con tus alimentos.</strong> <a href="#equivalencias" onclick="openEquivalencias();return false">Abre la calculadora de equivalencias de HC, P y G</a> para comparar más raciones.';document.querySelector('#macro-densidad .macro-body').append(densityCTA);
    const box=section.querySelector('.eq-calculator'),form=box.querySelector('form'),input=name=>form.elements.namedItem(name);
    const status=box.querySelector('.eq-status'),results=box.querySelector('.eq-results'),resultQuery=box.querySelector('#eq-result-query');
    let groupId='hidratos',list=[],referenceId=groups.hidratos.defaultFood;
    const selected=()=>list.find(f=>f.id===referenceId);
    const updateState=(fill=false)=>{
      const f=selected(),custom=input('custom').checked;
      box.querySelector('.eq-weigh').textContent=custom?'Cómo pesar la referencia: usa el estado del alimento al que corresponden los datos de tu etiqueta.':'Cómo pesar la referencia: '+f.state+'.';
      input('food').disabled=custom||!input('food').options.length;input('search').disabled=custom;
      input('customName').disabled=!custom;
      for(const key of ['kcal','carbs','protein','fat']){input('custom-'+key).disabled=!custom;if(fill)input('custom-'+key).value=f[key];}
    };
    const filterReference=()=>{
      const filtered=list.filter(f=>matches(f,input('search').value));
      input('food').innerHTML=filtered.map(f=>`<option value="${f.id}">${escape(f.name)}</option>`).join('');
      if(filtered.some(f=>f.id===referenceId))input('food').value=referenceId;
      else input('food').selectedIndex=-1;
      box.querySelector('#eq-search-count').textContent=filtered.length?`${filtered.length} alimentos encontrados. ${input('food').selectedIndex<0?'Selecciona un resultado; tu referencia actual sigue siendo '+selected().name+'.':''}`:'No hay resultados. Prueba otra palabra o borra la búsqueda. Tu referencia sigue siendo '+selected().name+'.';
      updateState();
    };
    const calculate=()=>{
      const g=groups[groupId],grams=Number(input('grams').value),criterion=input('criterion').value;
      status.classList.remove('eq-error');results.innerHTML='';box.querySelector('#eq-result-count').textContent='';
      const error=message=>{status.textContent=message;status.classList.add('eq-error');};
      if(!Number.isFinite(grams)||grams<0.1||grams>2000){error('Introduce un peso de alimento entre 0,1 y 2000 g.');return;}
      let ref=selected();
      if(input('custom').checked){
        ref={name:input('customName').value.trim()||'Mi producto',state:'Según tu etiqueta y el estado pesado'};
        for(const key of ['kcal','carbs','protein','fat']){const raw=input('custom-'+key).value,value=Number(raw),max=key==='kcal'?1000:100;if(raw.trim()===''||!Number.isFinite(value)||value<0||value>max){error('Completa todos los valores de la etiqueta por 100 g con números válidos.');return;}ref[key]=value;}
        if(ref.carbs+ref.protein+ref.fat>100.1){error('Revisa la etiqueta: hidratos, proteínas y grasas no pueden sumar más de 100 g por 100 g de alimento.');return;}
      }
      if(!['kcal',g.key].includes(criterion)||!Number.isFinite(ref[criterion])||ref[criterion]<=0){error('La referencia no aporta el nutriente o la energía que has elegido igualar. Elige otro alimento o criterio.');return;}
      const target=grams*ref[criterion]/100,refN=nutrients(ref,grams),measure=criterion==='kcal'?`${fmt(target)} kcal`:`${fmt(target)} g de ${g.label}`;
      status.textContent=`${fmt(grams)} g de ${ref.name}: buscamos raciones con aproximadamente ${measure}.`;
      const visible=list.filter(f=>matches(f,resultQuery.value)&&f[criterion]>0);
      box.querySelector('#eq-result-count').textContent=`${visible.length} de ${list.length} alimentos del grupo. Orden alfabético.`;
      results.innerHTML=`<div class="eq-reference"><strong>Tu ración de referencia</strong><div><span>${fmt(refN.kcal)} kcal</span><span>${fmt(refN.carbs)} g hidratos</span><span>${fmt(refN.protein)} g proteína</span><span>${fmt(refN.fat)} g grasa</span></div><small>${escape(ref.state)}</small></div>${visible.length?`<div class="macro-table-wrap"><table><caption>Equivalencias por ${criterion==='kcal'?'calorías':g.label}: ≈ ${measure}</caption><thead><tr><th scope="col">Alimento y estado</th><th scope="col">Cantidad de alimento</th><th scope="col">kcal</th><th scope="col">Hidratos (g)</th><th scope="col">Proteína (g)</th><th scope="col">Grasa (g)</th></tr></thead><tbody>${visible.map(item=>{
        const equivalent=target/item[criterion]*100,n=nutrients(item,equivalent);
        return `<tr data-food="${item.id}" ${!input('custom').checked&&item.id===ref.id?'class="eq-reference-row"':''}><th scope="row">${escape(item.name)}<small>${escape(item.state)}</small></th><td><strong>≈ ${fmt(equivalent)} g</strong>${equivalent>500?'<small>Ración teórica grande</small>':''}</td>${['kcal','carbs','protein','fat'].map(key=>`<td ${criterion===key?'class="eq-matched"':''}>${fmt(n[key])}</td>`).join('')}</tr>`;
      }).join('')}</tbody></table></div>`:'<p class="eq-empty">No hay equivalencias con esa búsqueda. Prueba otra palabra o borra el filtro.</p>'}<p class="macro-small"><strong>${criterion==='kcal'?'Se han igualado las calorías. Los gramos de '+g.label+' pueden cambiar.':'Se han igualado los gramos de '+g.label+'. Las calorías y los demás nutrientes pueden cambiar.'}</strong> No hace falta comer las raciones grandes que aparezcan: sirven para ver las diferencias entre alimentos.</p>`;
    };
    chooseGroup=id=>{
      if(!groups[id])return;
      const keepKcal=input('criterion').value==='kcal';groupId=id;const g=groups[id];list=foods.filter(f=>f.groups.includes(id));referenceId=g.defaultFood;
      input('group').value=id;input('search').value='';resultQuery.value='';input('custom').checked=false;input('customName').value='';input('grams').value=g.grams;
      input('criterion').innerHTML=`<option value="${g.key}">Gramos de ${g.label}</option><option value="kcal">Calorías (kcal)</option>`;if(keepKcal)input('criterion').value='kcal';
      box.querySelector('#eq-group-note').textContent=g.note;filterReference();updateState(true);calculate();
    };
    form.addEventListener('submit',event=>{event.preventDefault();calculate();});
    form.querySelectorAll('input[name="group"]').forEach(radio=>radio.addEventListener('change',()=>chooseGroup(radio.value)));
    input('search').addEventListener('input',filterReference);resultQuery.addEventListener('input',calculate);
    input('food').addEventListener('change',()=>{if(input('food').value){referenceId=input('food').value;filterReference();updateState(true);calculate();}});
    input('criterion').addEventListener('change',calculate);input('custom').addEventListener('change',()=>{updateState();calculate();});
    form.addEventListener('input',event=>{if(event.target.name==='grams'||event.target.name.startsWith('custom'))calculate();});
    chooseGroup('hidratos');
    const handleHash=()=>{if(location.hash==='#equivalencias')openEquivalencias();else if(location.hash.startsWith('#equivalencias-'))openEquivalencias(location.hash.slice(15));};
    window.addEventListener('hashchange',handleHash);handleHash();
  });
})();
