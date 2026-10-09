import test from 'node:test';
import assert from 'node:assert/strict';
import {cycle} from '../../src/data/farm-play/cycle.mjs';
import {recipes} from '../../src/data/farm-play/recipes.mjs';
import {questions} from '../../src/data/farm-play/quiz.mjs';
import {newFarm,selectPiece,placePiece,matchRecipes,missingIngredients,nextAlternative,pickQuestions,newQuiz,answerQuiz,advanceQuiz} from '../../src/scripts/farm-play/logic.mjs';
const ids=cycle.map(s=>s.id);
test('Incorrect placement preserves the selected piece; completed steps cannot count twice',()=>{
 let state=selectPiece(newFarm(),ids[0],ids);const wrong=placePiece(state,ids[1],ids);assert.equal(wrong.status,'incorrect');assert.deepEqual(wrong.state,state);
 state=placePiece(state,ids[0],ids).state;assert.equal(state.placed.length,1);assert.equal(placePiece(state,ids[0],ids).state,state);assert.equal(selectPiece(state,ids[0],ids),state);
 for(const id of ids.slice(1)) state=placePiece(selectPiece(state,id,ids),id,ids).state;
 assert.equal(state.placed.length,5);assert.deepEqual(newFarm(),{selected:null,placed:[]});
});
test('Unknown and unselected destinations never change progress',()=>{const state=newFarm();assert.equal(placePiece(state,'bogus',ids).state,state);assert.equal(placePiece(state,ids[0],ids).status,'empty');});
test('All flavor/time combinations respect time and flavor, including the explicit no-match case',()=>{
 for(const flavor of ['light','rich','crisp'])for(const time of ['15','30','leisure']){
  const list=matchRecipes(recipes,{flavor,time,available:[]});for(const r of list){assert.ok(r.flavors.includes(flavor));assert.ok(time==='leisure'||r.minutes<=Number(time));}
 }
 assert.deepEqual(matchRecipes(recipes,{flavor:'crisp',time:'15',available:[]}),[]);
 assert.ok(matchRecipes(recipes,{flavor:'crisp',time:'leisure',available:[]}).length>=2);
});
test('Pantry matching changes ranking deterministically and missing ingredients remain explicit',()=>{
 const selection={flavor:'rich',time:'leisure',available:['rice','egg','greens']};const list=matchRecipes(recipes,selection);assert.equal(list[0].id,'rice');assert.deepEqual(matchRecipes(recipes,selection),list);
 const missing=missingIngredients(list[0],selection.available);assert.ok(missing.some(i=>i.key==='mushrooms'));assert.ok(missing.some(i=>i.key==='soy'));assert.ok(missing.every(i=>!selection.available.includes(i.key)));
 assert.equal(nextAlternative(0,1),0);assert.equal(nextAlternative(1,2),0);
});
test('Quiz runs have five unique questions; every content record is complete and sourced',()=>{
 assert.ok(questions.length>=10);for(let i=0;i<30;i++)assert.equal(new Set(pickQuestions(questions).map(q=>q.id)).size,5);
 for(const q of questions){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices.map(c=>c.text)).size,4);assert.ok(q.choices.some(c=>c.id===q.correct));assert.ok(q.explanation&&q.source);}
 assert.ok(recipes.length>=6);for(const r of recipes){assert.ok(r.ingredients.length&&r.steps.length&&r.image&&r.alt&&r.productHref);assert.ok(r.minutes>0&&r.servings===2);}
});
test('Quiz only scores once, only advances after an answer, and replay fully resets',()=>{
 let state=newQuiz(questions);assert.equal(advanceQuiz(state),state);
 for(let i=0;i<5;i++){const answer=i<3?state.questions[i].correct:state.questions[i].choices.find(c=>c.id!==state.questions[i].correct).id;state=answerQuiz(state,answer);assert.equal(answerQuiz(state,answer),state);state=advanceQuiz(state);if(i<4)assert.equal(advanceQuiz(state),state);}
 assert.equal(state.score,3);assert.equal(state.complete,true);assert.equal(advanceQuiz(state),state);assert.equal(answerQuiz(state,'0'),state);const replay=newQuiz(questions);assert.equal(replay.score,0);assert.equal(replay.index,0);assert.equal(replay.answer,null);assert.equal(replay.complete,false);
});
