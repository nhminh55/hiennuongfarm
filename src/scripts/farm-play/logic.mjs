// Pure state transitions are shared by the browser controllers and Node tests.
export const newFarm = () => ({ selected:null, placed:[] });
export function selectPiece(state,id,ids) {
 return ids.includes(id) && !state.placed.includes(id) ? {...state,selected:id} : state;
}
export function placePiece(state,target,ids) {
 if (!ids.includes(target) || state.placed.includes(target)) return {state,status:'occupied'};
 if (!state.selected) return {state,status:'empty'};
 if (state.selected !== target) return {state,status:'incorrect'};
 return {state:{selected:null,placed:[...state.placed,target]},status:'correct'};
}
export const timeBudget = value => value === 'leisure' ? Infinity : Number(value);
export function matchRecipes(recipes,selection) {
 const budget = timeBudget(selection.time);
 if (!selection.flavor || !selection.time || !(budget>0)) return [];
 // Flavor is an explicit preference; unmet flavor/time constraints produce an honest no-match.
 return recipes.filter(r=>r.minutes<=budget && r.flavors.includes(selection.flavor))
 .map(recipe=>({recipe,score:recipe.ingredients.filter(i=>selection.available.includes(i.key)).length}))
 .sort((a,b)=>b.score-a.score || a.recipe.minutes-b.recipe.minutes || a.recipe.id.localeCompare(b.recipe.id))
 .map(r=>r.recipe);
}
export const missingIngredients = (recipe,available) => recipe.ingredients.filter(i=>!available.includes(i.key));
export const nextAlternative = (index,length) => length ? (index+1)%length : 0;
export function pickQuestions(bank,random=Math.random) {
 const unique = [...new Map(bank.map(q=>[q.id,q])).values()];
 for(let i=unique.length-1;i>0;i--) {const j=Math.floor(random()*(i+1)); [unique[i],unique[j]]=[unique[j],unique[i]];}
 return unique.slice(0,5);
}
export const newQuiz = bank => ({questions:pickQuestions(bank),index:0,score:0,answer:null,complete:false});
export function answerQuiz(state,answer) {
 const q = state.questions[state.index];
 if(state.complete || state.answer !== null || !q?.choices.some(c=>c.id===answer)) return state;
 return {...state,answer,score:state.score+Number(answer===q.correct)};
}
export function advanceQuiz(state) {
 if(state.complete || state.answer===null) return state;
 return state.index===state.questions.length-1 ? {...state,complete:true} : {...state,index:state.index+1,answer:null};
}
// Fills {placeholders} in a text from the content files: fill('Câu {n} / 5', {n:1}).
export const fill = (text,values) => text.replace(/\{(\w+)\}/g,(m,k)=>k in values ? String(values[k]) : m);
