import {initAudio} from './audio.js';
import {recipes,flavors} from '../../data/farm-play/recipes.mjs';
import {matchRecipes,missingIngredients,nextAlternative} from './logic.mjs';
function initMeal() {
 const root=document.querySelector('[data-meal-tool]');if(!root||root.dataset.ready)return;root.dataset.ready='true'; const audio=initAudio();
 const get=s=>root.querySelector(s), form=get('form'), initial=get('[data-initial]'), result=get('[data-result]'), noMatch=get('[data-no-match]'), details=get('#recipe-details'), toggle=get('[data-details-toggle]');
 let matches=[],index=0,selection;
 const say=text=>get('[data-meal-feedback]').textContent=text;
 const list=(selector,items)=>{get(selector).replaceChildren(...items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));};
 function closeDetails(focus=false) {details.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='Xem cách nấu';if(focus)toggle.focus();}
 function showRecipe() {
  const recipe=matches[index];audio.play('reveal');result.classList.remove('is-revealed');void result.offsetWidth;result.classList.add('is-revealed');initial.hidden=true;noMatch.hidden=true;result.hidden=false;closeDetails();
  get('[data-recipe-title]').textContent=recipe.name;get('[data-recipe-meta]').textContent=flavors.find(f=>f.id===selection.flavor).name+' · '+recipe.minutes+' phút · '+recipe.servings+' người';
  const image=get('[data-recipe-image]');image.src=recipe.image;image.alt=recipe.alt;
  const available=recipe.ingredients.filter(i=>selection.available.includes(i.key));
  get('[data-match-note]').textContent=available.length?'Dùng được nguyên liệu bạn đã chọn: '+available.map(i=>i.name.toLowerCase()).join(', ')+'. Các nguyên liệu khác cần kiểm tra thêm.':'Món phù hợp với vị và thời gian đã chọn. Bạn cần kiểm tra đầy đủ nguyên liệu bên dưới.';
  list('[data-missing]',missingIngredients(recipe,selection.available).map(i=>i.quantity+' '+i.name.toLowerCase()));
  get('[data-alternative]').disabled=matches.length<=1;
  get('[data-alternative-note]').textContent=matches.length<=1?'Hiện có một món phù hợp. Đổi vị hoặc thời gian để tìm thêm món.':'Có '+matches.length+' món phù hợp; đang xem món '+(index+1)+'.';
  get('[data-product]').href=recipe.productHref;get('[data-recipe-title]').focus();
  say('Gợi ý: '+recipe.name+'. '+recipe.minutes+' phút, cho '+recipe.servings+' người.');
 }
 function suggest() {
  const data=new FormData(form);selection={flavor:data.get('flavor'),time:data.get('time'),available:data.getAll('pantry')};
  matches=matchRecipes(recipes,selection);index=0;closeDetails();
  if(matches.length){showRecipe();return;}
  initial.hidden=true;result.hidden=true;noMatch.hidden=false;
  const fastest=recipes.filter(r=>r.flavors.includes(selection.flavor)).sort((a,b)=>a.minutes-b.minutes)[0];
  const message='Chưa có món '+flavors.find(f=>f.id===selection.flavor).name.toLowerCase()+' trong '+selection.time+' phút. '+fastest.name+' cần khoảng '+fastest.minutes+' phút. Chọn “Thảnh thơi” để xem món này, hoặc đổi sang vị khác.';
  get('[data-adjustment]').textContent=message;noMatch.querySelector('h2').focus();say(message);
 }
 get('[type="submit"]').disabled=false;form.addEventListener('submit',e=>{e.preventDefault();suggest();});
 form.addEventListener('change',()=>{initial.hidden=false;result.hidden=true;noMatch.hidden=true;closeDetails();say('Lựa chọn đã đổi. Bấm “Gợi ý món cho tui” để xem món phù hợp.');});
 get('[data-relax]').addEventListener('click',()=>{get('input[value="leisure"]').checked=true;suggest();});
 get('[data-alternative]').addEventListener('click',()=>{if(matches.length<2)return;index=nextAlternative(index,matches.length);showRecipe();});
 toggle.addEventListener('click',()=>{if(!details.hidden){closeDetails(true);return;}const recipe=matches[index];get('[data-details-heading]').textContent=recipe.name;get('[data-details-meta]').textContent=recipe.minutes+' phút gồm sơ chế và nấu · '+recipe.servings+' người';list('[data-ingredients]',recipe.ingredients.map(i=>i.quantity+' '+i.name.toLowerCase()));list('[data-steps]',recipe.steps);get('[data-substitution]').textContent=recipe.substitution;details.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.textContent='Thu gọn công thức';get('[data-details-heading]').focus();});
 get('[data-close-details]').addEventListener('click',()=>closeDetails(true));
}
initMeal();document.addEventListener('astro:page-load',initMeal);
