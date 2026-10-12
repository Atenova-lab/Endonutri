const assert = require('node:assert/strict');
const {evaluate,clinicalReport,createSession}=require('../checklists-core.js');
const data=require('../diabetes-checklists-data.js');
assert.equal(data.version,'2026-10-12.1');
assert.equal(data.quizzes.length,3);
for(const [index,total,minimum] of [[0,40,28],[1,55,39],[2,70,49]]){
 const quiz=data.quizzes[index], questions=quiz.questions;
 assert.equal(questions.length,total);
 assert.deepEqual(questions.map(q=>q.id),Array.from({length:total},(_,i)=>i+1));
 const positions=[0,0,0,0];questions.forEach(q=>positions[q.correct]++);
 assert(Math.max(...positions)<=Math.ceil(total/4),'Correct answer positions must be balanced');
 for(let letter=0;letter<4;letter++)assert.equal(evaluate(questions,questions.map(()=>letter)).passed,false);
 for(const q of questions){
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
  assert(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);
  assert(q.sources.every(id=>data.sources.some(source=>source.id===id)));
 }
 const answers=questions.map((q,i)=>i<minimum?q.correct:(q.correct+1)%4);
 const score=evaluate(questions,answers);
 assert.equal(score.passed,true);assert.equal(score.minimumCorrect,minimum);assert.equal(score.correct,minimum);
 answers[minimum-1]=(questions[minimum-1].correct+1)%4;
 const fail=evaluate(questions,answers);
 assert.equal(fail.passed,false);assert.equal(fail.correct,minimum-1);
 const blanks=evaluate(questions,questions.map((q,i)=>i<minimum?q.correct:null));
 assert.equal(blanks.passed,true);assert.equal(blanks.incorrect,0);assert.equal(blanks.unanswered,total-minimum);
 assert.equal(blanks.percentage,minimum*100/total);
 assert.equal(evaluate(questions,[]).percentage,0);
 assert.equal(evaluate(questions,questions.map(q=>q.correct)).percentage,100);
 const report=clinicalReport(quiz.title,score,new Date('2026-10-12T00:00:00Z'),data.version);
 assert(report.includes(quiz.title));assert(report.includes(minimum+'/'+total));assert(report.includes('APRUEBA el checklist'));
 assert.match(report,/0?2:00/);assert(report.includes(data.version));
 assert(clinicalReport(quiz.title,fail).includes('NO APRUEBA el checklist'));
 assert.throws(()=>evaluate(questions,[-1]));assert.throws(()=>evaluate(questions,[4]));
}
const session=createSession(data.quizzes);
const basic=data.quizzes[0];
session.select(basic.id);session.answer(0,2);session.page(1);session.answer(5,0);session.page(0);
assert.equal(session.snapshot().answers[0],2);assert.equal(session.snapshot().answers[5],0);
session.page(-1);assert.equal(session.snapshot().page,0);session.page(100);assert.equal(session.snapshot().page,7);
for(let i=0;i<basic.questions.length;i++) session.answer(i,basic.questions[i].correct);
session.finish(new Date('2026-10-12T00:00:00Z'));
assert.equal(session.results().length,1);assert.equal(session.snapshot().result.percentage,100);
assert.throws(()=>session.answer(0,1));
for(const quiz of data.quizzes.slice(1)){
 session.select(quiz.id);session.answer(0,quiz.questions[0].correct);session.finish();
}
assert.equal(session.results().length,3);
session.repeat('basica');assert.equal(session.results().length,2);assert.equal(session.snapshot().answers.filter(a=>a!==null).length,0);
session.answer(0,0);assert(session.hasWork());
session.resetPatient();assert.equal(session.results().length,0);assert.equal(session.hasWork(),false);
for(const quiz of data.quizzes){const state=session.select(quiz.id);assert.equal(state.result,null);assert(state.answers.every(a=>a===null));assert.equal(state.page,0)}
const combined=session.results().map(item=>clinicalReport(item.quiz.title,item.result,item.completedAt,data.version)).join('\n');
assert.equal(combined,'');
console.log('PASS: all 165 question keys, exact 70% thresholds, no deductions, Madrid timestamps, navigation, locked final results, repeat and reset across all three checklists.');
