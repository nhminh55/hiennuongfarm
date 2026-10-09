/**
 * Builds dist/tim-kiem/tu-dien.json after `astro build`: the site's own
 * words, so /tim-kiem/ can put the diacritics back on a query typed
 * without them ("nam moi den" → "nấm mối đen").
 *
 * Only the indexed page content is read (the `data-pagefind-body` main,
 * see BaseLayout). Output:
 *   words: unaccented word → its spellings on the site, most frequent first
 *   pairs: "spelling spelling" → how often the two stand side by side
 *          (pairs seen more than once that involve an ambiguous word)
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = 'dist';
const fold = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');

const files = (await readdir(dist, { recursive: true })).filter((f) => f.endsWith('.html'));
const counts = new Map();
const pairs = {};

for (const file of files) {
  const html = await readFile(join(dist, file), 'utf8');
  const main = html.match(/<main[^>]*data-pagefind-body[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (!main) continue;
  const text = main
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase();
  // A pair never spans punctuation.
  for (const phrase of text.split(/[^\p{L}\p{M}\p{N}\s]+/u)) {
    const words = phrase.match(/[\p{L}\p{M}\p{N}]+/gu) ?? [];
    words.forEach((word, i) => {
      counts.set(word, (counts.get(word) ?? 0) + 1);
      if (i > 0) pairs[`${words[i - 1]} ${word}`] = (pairs[`${words[i - 1]} ${word}`] ?? 0) + 1;
    });
  }
}

const spellings = {};
for (const [word] of [...counts].sort((a, b) => b[1] - a[1])) {
  (spellings[fold(word)] ??= []).push(word);
}
// Kept small: a word written without diacritics on the site needs no
// entry, and a pair only matters if it settles an ambiguous word.
const words = Object.fromEntries(Object.entries(spellings).filter(([plain, list]) => list.length > 1 || list[0] !== plain));
const ambiguous = (word) => spellings[fold(word)].length > 1;
const keptPairs = Object.fromEntries(
  Object.entries(pairs).filter(([pair, count]) => count > 1 && pair.split(' ').some(ambiguous)),
);

await writeFile(join(dist, 'tim-kiem', 'tu-dien.json'), JSON.stringify({ words, pairs: keptPairs }));
console.log(`Search dictionary: ${Object.keys(words).length} words, ${Object.keys(keptPairs).length} pairs.`);
