const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const D = require('../juegos-data.js'), C = require('../juegos-core.js'), I = require('../juegos-images.js');
const rootPath = path.resolve(__dirname, '..');
assert.equal(D.foods.length, 32); assert.equal(D.macros.length, 40); assert.equal(D.quizzes.length, 12);
for (const key of ['foods','macros','plates','quizzes']) assert.equal(new Set(D[key].map(x => x.id)).size, D[key].length);
for (const f of D.foods) { assert.ok(fs.existsSync(path.join(rootPath, f.atlas))); assert.ok(f.tile >= 0 && f.tile < 16); }
const html = fs.readFileSync(path.join(rootPath, 'index.html'), 'utf8');
for (const q of D.quizzes) {
 assert.equal(q.questions.length,5);
 assert.equal(new Set(q.questions.map(x => x.id)).size,5);
 for (const x of q.questions) { assert.ok(x.options[x.answer]); assert.ok(x.why); assert.ok(x.route.startsWith('macro-') || x.route === 'macronutrientes' || html.includes('id="section-' + x.route + '"')); }
}
function solution(item) { return ['veg','veg','protein','carbs'].map(role => item.foodIds.find(id => D.foods.find(f => f.id === id).roles.includes(role))); }
for (const p of D.plates) { assert.ok(p.foodIds.every(id => D.foods.some(f => f.id === id))); assert.equal(C.evaluatePlate(solution(p),D.foods).correct,true); }
let session=C.createSession([1]); assert.equal(C.advance(session),session); session=C.attempt(session,false); session=C.attempt(session,true); assert.equal(C.score(session),0); assert.equal(C.attempt(session,true),session);
let listener, ready;
const stub = {focus(){},setAttribute(){}};
const root = {innerHTML:'',querySelector(){return stub;},querySelectorAll(){return [];},contains(){return true;},addEventListener(_,fn){listener=fn;}};
vm.runInNewContext(fs.readFileSync(path.join(rootPath,'juegos.js'),'utf8'), {window:{EndonutriGamesData:D,EndonutriGamesCore:C},document:{addEventListener(_,fn){ready=fn;},getElementById(){return root;}}}); ready();
function act(gameAction, extra={}) { const button={dataset:{gameAction,...extra},disabled:false}; listener({target:{closest(){return button;}}}); }
act('plate');act('check-plate'); assert.match(root.innerHTML,/Todavía falta/);assert.match(root.innerHTML,/Puntos: 0/);
for (let idx=0;idx<D.plates.length;idx++) {
 if(idx===0){for(let i=0;i<4;i++){act('slot',{gameSlot:String(i)});act('food',{gameFood:'arroz'});}act('check-plate');assert.match(root.innerHTML,/Vamos a repasarlo/);act('clear-plate');}
 const ids=solution(D.plates[idx]);
 for(let i=0;i<4;i++){act('slot',{gameSlot:String(i)});act('food',{gameFood:ids[i]});}
 act('check-plate');assert.match(root.innerHTML,/Así ha quedado tu plato/);assert.match(root.innerHTML,/games-complete-image/);
 const completed = root.innerHTML;act('clear-plate');assert.equal(root.innerHTML,completed);act('check-plate');assert.equal(root.innerHTML,completed);
 act('next');
}
assert.match(root.innerHTML,/7 \/ 8/); assert.equal((root.innerHTML.match(/class="games-composition"/g)||[]).length,8);
act('again');assert.match(root.innerHTML,/Puntos: 0/);assert.ok(!root.innerHTML.includes('games-composition'));
for (const quiz of D.quizzes) {act('quiz',{gameQuiz:quiz.id});for(const q of quiz.questions){act('answer',{gameAnswer:String(q.answer)});act('next');}assert.match(root.innerHTML,/5 \/ 5/);}
act('macros');
for(let i=0;i<10;i++) {
 const current=D.macros.find(item => root.innerHTML.includes('<h3>'+item.name+'</h3>'));assert.ok(current);
 act('answer',{gameAnswer:current.answer});act('answer',{gameAnswer:current.answer});act('next');
}
assert.match(root.innerHTML,/10 \/ 10/);
(async()=>{
 const draws=[],context={beginPath(){},arc(){},fill(){},stroke(){},fillRect(){},drawImage(...args){draws.push(args);}};
 const selected=['pisto','crema','merluza','arroz'];
 const url=await I.compose(selected,D.foods,{load:async src=>({src,naturalWidth:1254,naturalHeight:1254}),canvas:()=>({getContext:()=>context,toDataURL:()=> 'data:image/png;base64,test'})});
 assert.match(url,/^data:image\/png/);assert.equal(draws.length,4);
 selected.forEach((id,i)=>{const f=D.foods.find(f=>f.id===id);assert.equal(draws[i][0].src,f.atlas);assert.equal(draws[i][1],f.tile%4*313.5);assert.equal(draws[i][2],Math.floor(f.tile/4)*313.5);});
 await assert.rejects(I.compose(['pisto'],D.foods));
 const sw=fs.readFileSync(path.join(rootPath,'sw.js'),'utf8');
 for(const file of ['juegos-images.js','img/juegos/preparaciones.webp','img/juegos/acompanamientos.webp'])assert.ok(sw.includes("'"+file+"'"));
 assert.ok(html.indexOf('juegos-images.js')<html.indexOf('src="juegos.js'));
 console.log('OK: 60 preguntas, 40 alimentos, 8 platos, reintentos, galería y composición con las selecciones exactas.');
})().catch(error=>{console.error(error);process.exitCode=1;});
