/* Calculadoras de intercambio educativo. Las raciones se igualan por el criterio seleccionado. */
(() => {
  const groups = {
    hidratos:{title:'Hidratos de carbono',key:'carbs',label:'hidratos disponibles',defaultFood:'pan',grams:40,icon:'🌾',note:'Pan, arroz, pasta, cuscús, tortillas, patata y más. Las legumbres también aportan proteína. El peso seco y el cocido son referencias distintas.'},
    proteinas:{title:'Alimentos proteicos',key:'protein',label:'proteína',defaultFood:'pollo',grams:100,icon:'🥚',note:'Igualar la proteína no iguala las calorías, las grasas ni la calidad de la proteína. Las cantidades de tofu y lácteos varían bastante según el producto.'},
    grasas:{title:'Alimentos con grasas',key:'fat',label:'grasa',defaultFood:'aceite-oliva',grams:10,icon:'🥑',note:'Igualar grasa o calorías no iguala la calidad nutricional. Prioriza habitualmente grasas insaturadas, como las de oliva, girasol, aguacate y frutos secos. Mantequilla y aceite de coco tienen más grasas saturadas.'}
  };
  const fmt=(n,digits=1)=>n.toLocaleString('es-ES',{maximumFractionDigits:digits});
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nutrients=(f,g)=>({kcal:g*f.kcal/100,carbs:g*f.carbs/100,protein:g*f.protein/100,fat:g*f.fat/100});
  window.openEquivalencias=id=>{
    if(!groups[id])return;
    showMacronutriente(id);
    requestAnimationFrame(()=>document.getElementById('eq-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}));
  };
  document.addEventListener('DOMContentLoaded',()=>{
    const foods=window.ENDONUTRI_EQ_FOODS;
    if(!Array.isArray(foods)||!document.getElementById('section-macronutrientes'))return;
    if(document.getElementById('eq-hidratos'))return;
    const quick=document.createElement('div');quick.className='eq-shortcuts';quick.innerHTML='<h4>Calculadoras de equivalencias</h4><p>Cambia un alimento por otro y compara la cantidad que aporta la misma energía o el mismo nutriente.</p><div>'+Object.entries(groups).map(([id,g])=>`<button type="button" onclick="openEquivalencias('${id}')">${g.icon} ${g.title} <span aria-hidden="true">→</span></button>`).join('')+'</div>';
    document.querySelector('.macro-intro').append(quick);
    const methodology=document.createElement('p');methodology.innerHTML='Las nuevas calculadoras usan valores medios por 100 g de porción comestible de USDA SR Legacy. Para hidratos disponibles se ha estimado «hidratos totales menos fibra»; es una aproximación, no una medición directa. <a href="https://fdc.nal.usda.gov/Foundation_Foods_Documentation/" target="_blank" rel="noopener">La documentación de USDA explica que los hidratos totales incluyen fibra.</a> Si tienes etiqueta europea, introduce el valor de «hidratos de carbono» tal como aparece: no vuelvas a restarle la fibra. Los valores introducidos de tu etiqueta se utilizan solo como referencia de la comparación y no se guardan.';
    document.querySelector('.macro-sources>div').append(methodology);
    for(const [id,g] of Object.entries(groups)){
      const list=foods.filter(f=>f.groups.includes(id));const box=document.createElement('section');box.id='eq-'+id;box.className='eq-calculator';box.setAttribute('aria-labelledby',`eq-title-${id}`);
      box.innerHTML=`<span class="macro-kicker">PRUEBA CON TU RACIÓN</span><h4 id="eq-title-${id}">Calculadora de ${g.title.toLowerCase()}</h4><p>${g.note}</p><form id="eq-form-${id}" novalidate><div class="eq-form-grid"><label>Alimento de referencia<select name="food">${list.map(f=>`<option value="${f.id}" ${f.id===g.defaultFood?'selected':''}>${f.name}</option>`).join('')}</select></label><label>Gramos de alimento<input name="grams" type="number" min="0.1" max="2000" step="0.1" value="${g.grams}" inputmode="decimal"></label><label>Qué quieres igualar<select name="criterion"><option value="${g.key}">Gramos de ${g.label}</option><option value="kcal">Calorías (kcal)</option></select></label></div><p class="eq-weigh" id="eq-weigh-${id}"></p><details class="eq-label-details"><summary>¿Tu producto tiene otros valores? Usa su etiqueta</summary><div class="eq-label-body"><label class="eq-checkbox"><input name="custom" type="checkbox"><span>Usar los valores de mi etiqueta como referencia</span></label><p class="macro-small">Todos los datos son <strong>por 100 g</strong>. Usa el mismo estado del alimento que has pesado. En etiquetas europeas, copia «hidratos de carbono» sin restar otra vez la fibra.</p><div class="eq-label-fields"><label>Nombre del producto<input name="customName" type="text" maxlength="80" placeholder="Mi producto"></label>${[['kcal','Energía (kcal)',1000],['carbs','Hidratos (g)',100],['protein','Proteínas (g)',100],['fat','Grasas (g)',100]].map(([key,label,max])=>`<label>${label}<input name="custom-${key}" type="number" min="0" max="${max}" step="0.01" inputmode="decimal" disabled></label>`).join('')}</div></div></details><button class="eq-submit" type="submit">Calcular equivalencias</button></form><div id="eq-status-${id}" class="eq-status" role="status" aria-live="polite" aria-atomic="true"></div><div id="eq-results-${id}" class="eq-results"></div><p class="eq-footnote">≈ significa «aproximadamente». Pesos de la parte comestible, según el estado indicado. Los resultados son comparaciones educativas, no raciones recomendadas ni una pauta de dieta.</p>`;
      document.querySelector(`#macro-${id} .macro-body`).append(box);
      const form=box.querySelector('form');const input=name=>form.elements.namedItem(name);const status=box.querySelector('.eq-status');const results=box.querySelector('.eq-results');
      let ready=false;
      const selected=()=>list.find(f=>f.id===input('food').value);
      const updateState=()=>{
        const f=selected();box.querySelector('.eq-weigh').textContent=input('custom').checked ? 'Cómo pesar la referencia: usa el mismo estado del alimento al que corresponden los datos de tu etiqueta.' : 'Cómo pesar la referencia: '+f.state+'.';
        input('food').disabled=input('custom').checked;
        for(const key of ['kcal','carbs','protein','fat'])input('custom-'+key).disabled=!input('custom').checked;
        if(!ready){for(const key of ['kcal','carbs','protein','fat'])input('custom-'+key).value=f[key];ready=true;}
      };
      const calculate=()=>{
        status.classList.remove('eq-error');results.innerHTML='';const grams=Number(input('grams').value);const criterion=input('criterion').value;
        const error=message=>{status.textContent=message;status.classList.add('eq-error');};
        if(!Number.isFinite(grams)||grams<0.1||grams>2000){error('Introduce un peso de alimento entre 0,1 y 2000 g.');return;}
        let ref=selected();
        if(input('custom').checked){
          ref={name:input('customName').value.trim()||'Mi producto',state:'Según tu etiqueta y el estado pesado'};
          for(const key of ['kcal','carbs','protein','fat']){
            const raw=input('custom-'+key).value;const value=Number(raw);const max=key==='kcal'?1000:100;
            if(raw.trim()===''||!Number.isFinite(value)||value<0||value>max){error('Completa todos los valores de la etiqueta por 100 g con números válidos.');return;}ref[key]=value;
          }
          if(ref.carbs+ref.protein+ref.fat>100.1){error('Revisa la etiqueta: hidratos, proteínas y grasas no pueden sumar más de 100 g por 100 g de alimento.');return;}
        }
        if(!['kcal',g.key].includes(criterion)||!Number.isFinite(ref[criterion])||ref[criterion]<=0){error('La referencia no aporta el nutriente o la energía que has elegido igualar. Elige otro alimento o criterio.');return;}
        const target=grams*ref[criterion]/100;const refN=nutrients(ref,grams);const measure=criterion==='kcal'?`${fmt(target)} kcal`:`${fmt(target)} g de ${g.label}`;
        status.textContent=`${fmt(grams)} g de ${ref.name}: buscamos raciones con aproximadamente ${measure}.`;
        results.innerHTML=`<div class="eq-reference"><strong>Tu ración de referencia</strong><div><span>${fmt(refN.kcal)} kcal</span><span>${fmt(refN.carbs)} g hidratos</span><span>${fmt(refN.protein)} g proteína</span><span>${fmt(refN.fat)} g grasa</span></div><small>${escape(ref.state)}</small></div><div class="macro-table-wrap"><table><caption>Equivalencias por ${criterion==='kcal'?'calorías':g.label}: ≈ ${measure}</caption><thead><tr><th scope="col">Alimento y estado</th><th scope="col">Cantidad de alimento</th><th scope="col">kcal</th><th scope="col">Hidratos (g)</th><th scope="col">Proteína (g)</th><th scope="col">Grasa (g)</th></tr></thead><tbody>${list.map(item=>{
          const equivalent=target/item[criterion]*100;const n=nutrients(item,equivalent);
          return `<tr ${!input('custom').checked&&item.id===ref.id?'class="eq-reference-row"':''}><th scope="row">${escape(item.name)}<small>${escape(item.state)}</small></th><td><strong>≈ ${fmt(equivalent)} g</strong>${equivalent>500?'<small>Ración teórica grande</small>':''}</td><td ${criterion==='kcal'?'class="eq-matched"':''}>${fmt(n.kcal)}</td><td ${criterion==='carbs'?'class="eq-matched"':''}>${fmt(n.carbs)}</td><td ${criterion==='protein'?'class="eq-matched"':''}>${fmt(n.protein)}</td><td ${criterion==='fat'?'class="eq-matched"':''}>${fmt(n.fat)}</td></tr>`;
        }).join('')}</tbody></table></div><p class="macro-small"><strong>${criterion==='kcal'?'Se han igualado las calorías. Los gramos de '+g.label+' pueden cambiar.':'Se han igualado los gramos de '+g.label+'. Las calorías y los demás nutrientes pueden cambiar.'}</strong> No hace falta comer las raciones grandes que aparezcan: sirven para ver las diferencias entre alimentos.</p>`;
      };
      form.addEventListener('submit',event=>{event.preventDefault();calculate();});
      input('food').addEventListener('change',()=>{ready=false;updateState();calculate();});
      input('criterion').addEventListener('change',calculate);
      input('custom').addEventListener('change',()=>{updateState();calculate();});
      form.addEventListener('input',event=>{if(event.target.name==='grams'||event.target.name.startsWith('custom'))calculate();});
      updateState();calculate();
    }
    if(location.hash.startsWith('#equivalencias-'))openEquivalencias(location.hash.slice(15));
  });
})();
