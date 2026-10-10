// Editorial kitchen suggestions created for this section, not farm-authored recipes.
// Times include preparation and cooking, for two servings; allow extra time for a new cook.
// Text lives in src/content/choi-cung-nong-trai/hom-nay-an-nam-gi.md (edited in the admin).
import text from '../../content/choi-cung-nong-trai/hom-nay-an-nam-gi.md?data';
export const flavors = text.flavors;
export const pantry = text.pantry;
const base = {servings:2,mushroom:'Nấm bào ngư',productHref:'/san-pham/#nam-bao-ngu',source:'Gợi ý biên tập cho chuyên mục Chơi cùng nông trại; không phải công thức do trang trại cung cấp.'};
export const recipes = text.recipes.map(recipe=>({...base,...recipe}));
export const mealText = text;
