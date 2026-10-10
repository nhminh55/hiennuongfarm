import {initAudio} from './audio.js';
import {questions,quizText as text} from '../../data/farm-play/quiz.mjs';
import {newQuiz,answerQuiz,advanceQuiz,fill} from './logic.mjs';
function initQuiz() {
 const root=document.querySelector('[data-quiz-game]');if(!root||root.dataset.ready)return;root.dataset.ready='true'; const audio=initAudio();
 const get=s=>root.querySelector(s);let state=newQuiz(questions);
 function render(focus=false) {
  get('[data-quiz-active]').hidden=state.complete;get('[data-quiz-complete]').hidden=!state.complete;
  if(state.complete) {audio.play('complete');get('[data-score]').textContent=fill(text.score,{score:state.score});get('[data-result-message]').textContent=state.score===5?text.result_all:state.score>=3?text.result_most:text.result_few;get('[data-quiz-complete] h2').focus();return;}
  const q=state.questions[state.index];const heading=get('[data-question]');heading.textContent=q.question;heading.dataset.questionId=q.id;
  get('[data-quiz-progress]').textContent=fill(text.progress,{n:state.index+1});get('progress').value=state.index+Number(state.answer!==null);
  get('[data-quiz-feedback]').textContent='';get('[data-next]').disabled=true;get('[data-next]').textContent=state.index===4?text.last:text.next;
  get('[data-choices]').replaceChildren(...q.choices.map((choice,i)=>{const button=document.createElement('button');button.type='button';button.className='quiz-choice';button.dataset.answer=choice.id;const letter=document.createElement('span');letter.className='choice-letter';letter.textContent=String.fromCharCode(65+i);letter.setAttribute('aria-hidden','true');const text=document.createElement('span');text.textContent=choice.text;button.append(letter,text);button.addEventListener('click',()=>submit(choice.id));return button;}));
  if(focus)heading.focus();
 }
 function submit(id) {
  const next=answerQuiz(state,id);if(next===state)return;state=next;const q=state.questions[state.index];
  root.querySelectorAll('[data-answer]').forEach(button=>{button.disabled=true;const correct=button.dataset.answer===q.correct;const wrong=button.dataset.answer===id&&!correct;button.dataset.correct=String(correct);button.dataset.wrong=String(wrong);if(correct||wrong){const mark=document.createElement('span');mark.className='choice-result';mark.textContent=correct?text.correct_mark:text.chosen_mark;button.append(mark);}});
  const correct=id===q.correct;audio.play(correct?'correct':'neutral');get('[data-quiz-feedback]').textContent=fill(correct?text.right:text.wrong,{explanation:q.explanation});get('[data-quiz-feedback]').dataset.tone=correct?'correct':'incorrect';get('progress').value=state.index+1;get('[data-next]').disabled=false;get('[data-next]').focus({preventScroll:true});
 }
 get('[data-next]').addEventListener('click',()=>{const next=advanceQuiz(state);if(next===state)return;state=next;render(true);});
 get('[data-replay]').addEventListener('click',()=>{state=newQuiz(questions);render(true);});render();
}
initQuiz();document.addEventListener('astro:page-load',initQuiz);
