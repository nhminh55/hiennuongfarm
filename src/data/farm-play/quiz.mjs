// All answers trace to owner-approved farm copy; no wild-mushroom or medical advice.
// Text lives in src/content/choi-cung-nong-trai/ban-hieu-nam-toi-dau.md (edited in the admin);
// each question's `correct` is the position of the right choice, counting from 0.
import text from '../../content/choi-cung-nong-trai/ban-hieu-nam-toi-dau.md?data';
const q = ({id, question, choices, correct, explanation, source}) => ({id,question,choices:choices.map((text,i)=>({id:String(i),text})),correct:String(correct),explanation,source});
export const questions = text.questions.map(q);
export const quizText = text;
