import {initAudio} from './audio.js';
import {cycle,farmText as text} from '../../data/farm-play/cycle.mjs';
import {newFarm,selectPiece,placePiece,fill} from './logic.mjs';
function initFarm() {
 const root=document.querySelector('[data-farm-game]'); if(!root || root.dataset.ready) return; root.dataset.ready='true'; const audio=initAudio();
 const ids=cycle.map(s=>s.id); let state=newFarm();
 const pieces=[...root.querySelectorAll('[data-piece]')], destinations=[...root.querySelectorAll('[data-destination]')];
 const feedback=root.querySelector('[data-feedback]'), complete=root.querySelector('[data-complete]');
 const say=(text,tone='neutral')=>{feedback.textContent=text;feedback.dataset.tone=tone;};
 function render() {
  pieces.forEach(p=>{p.disabled=state.placed.includes(p.dataset.piece);p.draggable=!p.disabled;p.setAttribute('aria-pressed',String(state.selected===p.dataset.piece));});
  destinations.forEach(d=>{const filled=state.placed.includes(d.dataset.destination);d.dataset.filled=String(filled);d.setAttribute('aria-disabled',String(filled));d.querySelector('.destination-check').hidden=!filled;d.setAttribute('aria-label','Bước '+(ids.indexOf(d.dataset.destination)+1)+': '+cycle.find(s=>s.id===d.dataset.destination).place+(filled?' — đã ghép':''));});
  root.querySelector('[data-progress]').textContent=fill(text.progress,{done:state.placed.length});root.querySelector('progress').value=state.placed.length;
  complete.hidden=state.placed.length!==5; root.querySelector('[data-hint]').disabled=state.placed.length===5;
 }
 function select(id) {audio.play('select');state=selectPiece(state,id,ids);destinations.forEach(d=>delete d.dataset.hint);render();if(state.selected) say(fill(text.selected,{name:cycle.find(s=>s.id===state.selected).name}));}
 function place(target) {
  const result=placePiece(state,target,ids);state=result.state;render();
  if(result.status==='incorrect') {audio.play('neutral');say(text.incorrect,'incorrect');return;}
  if(result.status==='empty') {say(text.empty);return;}
  if(result.status==='occupied') {say(text.occupied);return;}
  audio.play(state.placed.length===5?'complete':'place'); const placed=destinations.find(d=>d.dataset.destination===target);placed.classList.remove('is-placed');void placed.offsetWidth;placed.classList.add('is-placed');destinations.forEach(d=>delete d.dataset.hint);say(fill(text.correct,{explanation:cycle.find(s=>s.id===target).explanation}));
  if(state.placed.length===5) {say(fill(text.finished,{explanation:cycle.find(s=>s.id===target).explanation})); const h=complete.querySelector('h2');h.tabIndex=-1;h.focus();}
  else pieces.find(p=>!p.disabled)?.focus({preventScroll:true});
 }
 pieces.forEach(p=>{p.addEventListener('click',()=>select(p.dataset.piece));p.addEventListener('dragstart',e=>{if(p.disabled){e.preventDefault();return;}select(p.dataset.piece);e.dataTransfer.setData('text/plain',p.dataset.piece);e.dataTransfer.effectAllowed='move';});p.addEventListener('dragend',()=>destinations.forEach(d=>delete d.dataset.dragOver));});
 destinations.forEach(d=>{d.addEventListener('click',()=>place(d.dataset.destination));d.addEventListener('dragover',e=>{e.preventDefault();d.dataset.dragOver='true';e.dataTransfer.dropEffect='move';});d.addEventListener('dragleave',()=>delete d.dataset.dragOver);d.addEventListener('drop',e=>{e.preventDefault();delete d.dataset.dragOver;const id=e.dataTransfer.getData('text/plain');if(!ids.includes(id)||state.placed.includes(id))return;state=selectPiece(state,id,ids);place(d.dataset.destination);});});
 root.querySelector('[data-hint]').addEventListener('click',()=>{const id=state.selected??ids.find(id=>!state.placed.includes(id));const step=cycle.find(s=>s.id===id);const d=destinations.find(d=>d.dataset.destination===id);destinations.forEach(d=>delete d.dataset.hint);d.dataset.hint='true';say(fill(text.hint,{name:step.name,step:ids.indexOf(id)+1,place:step.place.toLowerCase()}));});
 const reset=root.querySelector('[data-reset]');reset.disabled=false;reset.addEventListener('click',()=>{state=newFarm();destinations.forEach(d=>{delete d.dataset.hint;d.classList.remove('is-placed');});render();say(text.restarted);pieces[0].focus({preventScroll:true});});render();
}
initFarm();document.addEventListener('astro:page-load',initFarm);
