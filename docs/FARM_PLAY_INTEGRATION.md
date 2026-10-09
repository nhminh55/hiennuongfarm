# Chơi cùng nông trại — integration handoff

Branch: feature/farm-play. Base: committed local main, faeca74ae9a5ae68c4f12fe86b07e512ca595d69.
Worktree: E:/code/hiennuongfarm/.worktrees/farm-play.

## Routes and ownership

- /choi-cung-nong-trai/: three-activity collection.
- /choi-cung-nong-trai/mot-vong-nong-trai/: five-piece circular-agriculture game.
- /choi-cung-nong-trai/hom-nay-an-nam-gi/: six-recipe meal selector.
- /choi-cung-nong-trai/ban-hieu-nam-toi-dau/: five-question runs from ten sourced questions.

This branch owns only src/pages/choi-cung-nong-trai/, src/components/farm-play/,
src/data/farm-play/, src/scripts/farm-play/, src/styles/farm-play.css,
public/images/farm-play/, tests/farm-play/, and this document.
BaseLayout, shared header/footer, global styles, dependencies and other pages are reused without edits.

## Preview and checks

Preview: http://127.0.0.1:4331/choi-cung-nong-trai/.
Port 4330 was already occupied; Astro selected 4331. Port 4321 was never managed.

From this worktree, with repository dependencies available:

    npm run dev -- --host 127.0.0.1 --port 4331
    node --test tests/farm-play/logic.test.mjs
    node tests/farm-play/browser.mjs
    node tests/farm-play/responsive.mjs
    npm run build

Set FARM_PLAY_URL for another preview port. The browser script uses existing Playwright and Chromium.
Review captures are saved, uncommitted, under design-reference/screenshots/farm-play/.
The nested worktree is excluded locally through .git/info/exclude; the tracked .gitignore is unchanged.
The local node_modules junction reuses the main checkout's dependencies; it is not a merge requirement.

## Content and assets

Farm explanations follow the owner-approved Vietnamese steps in src/pages/nong-nghiep-tuan-hoan/index.astro.
Raw materials are treated, mixed and bagged before cultivation. Used substrate feeds trùn quế after
mushroom harvest; worm castings are used for crops. Quiz records retain their individual source
references to that page or approved src/data/products.ts content. No external factual claims were added.

Recipes are new editorial kitchen suggestions, explicitly identified as such, without attribution to
Hiền Nương. No nutrition, health, pricing or certification claims. Times include preparation and cooking
for two servings and are estimates. Both flavor and time are constraints; available ingredients rank
compatible recipes. Missing mushrooms, seasonings and other ingredients remain explicit. Product link:
verified existing /san-pham/#nam-bao-ngu anchor.

Movable pieces reuse the five approved public/images/circular/ WebP images unchanged. Composition
references: three PNGs in design-reference/games/, used only as references. Eight original illustrations
were generated with the built-in imagegen tool and saved in public/images/farm-play/ as farm.webp,
quiz.webp, soup.webp, eggs.webp, greens.webp, braise.webp, crispy.webp and rice.webp. New outputs were
proportionally resized and encoded as WebP without cropping; all consuming pages use these optimized
files. Farm imagery is illustrative, not documentary photography of the actual farm. Originals remain
in the imagegen output directory; project assets do not depend on that location.

Prompt set: restrained botanical watercolor, fine realistic detail, warm ivory paper (#F8F6F0),
feathered edges, muted olive and ochre, no text/logo/watermark/UI. Farm: wide Southern Vietnamese farm
with clockwise raw-material store, treatment/mixing workspace with substrate bags, mushroom house,
earthworm bed and vegetable garden, banana plants and distant mountains. Quiz: portrait of cultivated
oyster mushrooms emerging from bags on a bamboo shelf. Food: one centered ceramic dish, elevated
three-quarter view — mushroom/tofu/greens soup, mushroom scrambled egg, mushrooms with bok choy,
mushroom/tofu soy braise, battered crispy mushrooms, crisp rice with mushroom/egg/greens toppings.

## Audio, motion and lifecycle

Audio source/license: original procedural Web Audio compositions in src/scripts/farm-play/audio.js,
authored for this project and supplied under the same ownership terms as this implementation. No
third-party recordings, samples, tracks, compositions, vocals or external licenses are used.

Short low-volume sine-tone effects cover selection, placement, correct answers, neutral incorrect
feedback, meal reveals and completion. Optional background music is an original quiet four-phrase
instrumental, synthesized locally. Separate accessible controls default off. Saved preferences never
authorize autoplay: each audio control must be activated again after loading an activity or returning
from the back-forward cache. Storage errors and blocked playback never block the activities. Effects
are throttled and stop their predecessor. Background nodes and scheduling stop on navigation, pause
while hidden and resume within an already activated visit. Information is always also shown visually.

Selection/lift, placement snap, recipe fade, answer feedback and completion reveals are brief.
Reduced-motion preferences disable all section animations and transitions. Focus moves to revealed
recipe details, new quiz questions and completion headings. Controllers initialize once per DOM root;
no router, backend, login, dependency or external AI service was introduced.

## Deferred integration

After the other session finishes, review/merge the feature branch. A future menu or homepage entry can
link to /choi-cung-nong-trai/. Add these four routes to the shared sitemap if they should be indexed;
sitemap and navigation changes were deferred to avoid shared ownership. The section is Vietnamese
only. Translation/localized navigation integration is deferred. No merge into main or deployment.

## Final validation

- Production build passed: 24 pages, including all four new routes.
- Six Node logic/content tests passed: placement/reset/duplicates, deterministic matching,
  flavor/time constraints, missing ingredients, distinct questions and guarded scoring.
- Main Playwright suite: 202 checks passed at 1440, 1280, 1024, 768, 390, 375 and 320 pixels.
  Covers four routes, assets/overflow, native desktop drag, keyboard completion, mobile tap/replay,
  incorrect/correct/hint/completion states, all flavor/time combinations, ingredient toggles,
  missing ingredients, no match/adjustment, alternatives, details/focus, real product anchor,
  five distinct quiz questions, mixed score, duplicate activations, replay, navigation back,
  reduced motion, visible focus, separate audio toggles, remembered preferences without autoplay,
  rapid-click throttling, audio context cleanup, storage denial and blocked playback.
- Audio pause/resume was exercised with synthetic visibilitychange events; audio creation and
  oscillator activity were observed through Web Audio instrumentation. Meal reveal and quiz answer
  sounds were verified after explicit activation. No physical-device listening assessment was performed.
- Supplemental responsive result checks: 16 checks at 768 and 375 pixels, covering full recipes,
  details focus, quiz feedback, 4/5 results, replay and overflow. Screenshots visually inspected.
- Final browser runs loaded shared Google Fonts successfully and reported zero console/page errors,
  zero failed local requests and zero blocked external font requests. Earlier sandboxed runs could
  not load Google Fonts; validation was repeated successfully with fonts available.
- Scoped diff reviewed; no shared source files, dependencies, approved assets or main-branch work changed.
- No known blocking defect remains. Navigation/sitemap/localization integration is deferred as above.
