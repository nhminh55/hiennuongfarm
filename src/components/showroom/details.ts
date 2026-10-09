/**
 * Showroom details: the tab list under the stage (ShowroomDetails.astro).
 *
 * ARIA tabs with automatic activation and a roving tabindex. Tabs the
 * current product has no content for are hidden and skipped. The current
 * product comes from the showroom root (data-current) and its
 * `showroom:change` event; a change never moves focus or scrolls the page.
 * When a shorter panel opens, the panel area is held at its previous height
 * so the document never shrinks under the reader (no scroll jump); the hold
 * is released as the reader scrolls back up past it.
 */

const FALLBACK = 'gioi-thieu';

export function initShowroomDetails(el: HTMLElement) {
  const root = el.closest<HTMLElement>('[data-showroom]');
  const list = el.querySelector<HTMLElement>('[role="tablist"]')!;
  const area = el.querySelector<HTMLElement>('[data-details-panels]')!;
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(area.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const panelFor = (tab: HTMLButtonElement) => panels.find((p) => p.id === tab.getAttribute('aria-controls'))!;
  const blocks = (panel: HTMLElement) => Array.from(panel.querySelectorAll<HTMLElement>(':scope > [data-product]'));
  const slugs = new Set(blocks(panels[0]).map((b) => b.dataset.product!));

  let product = '';
  let active = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];

  const supported = (tab: HTMLButtonElement) => blocks(panelFor(tab)).some((b) => b.dataset.product === product);
  const visible = () => tabs.filter((t) => !t.hidden);

  /* Height hold -------------------------------------------------------------- */

  let held = false;
  let frame = 0;

  const setHold = (px: number) => {
    held = px > 0;
    if (held) area.style.setProperty('--details-lock', `${Math.ceil(px)}px`);
    else area.style.removeProperty('--details-lock');
  };

  // The area may shrink only down to the viewport's bottom edge (never
  // below its own content), so nothing on screen moves and the document
  // keeps enough height for the current scroll position.
  const fit = (height: number) => {
    const natural = panelFor(active).offsetHeight;
    const toViewportBottom = window.innerHeight - area.getBoundingClientRect().top;
    const keep = Math.min(height, Math.max(toViewportBottom, 0));
    setHold(keep > natural ? keep : 0);
  };

  const relax = () => {
    frame = 0;
    if (held) fit(area.offsetHeight);
  };
  const onScroll = () => {
    if (held && !frame) frame = requestAnimationFrame(relax);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /** Runs a DOM change without letting the area shrink under the reader. */
  const steady = (change: () => void) => {
    const before = area.offsetHeight;
    setHold(before);
    change();
    fit(before);
  };

  /* Tab list scroll (small screens) ----------------------------------------- */

  const reveal = (tab: HTMLButtonElement) => {
    if (list.scrollWidth <= list.clientWidth) return;
    const pad = 40; // clear of the edge fade
    const left = tab.offsetLeft - pad;
    const right = tab.offsetLeft + tab.offsetWidth + pad;
    if (left < list.scrollLeft) list.scrollLeft = Math.max(0, left);
    else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
  };

  // Fade the edge the tab list continues past, so hidden tabs are discoverable.
  const edges = () => {
    const more: string[] = [];
    if (list.scrollLeft > 1) more.push('start');
    if (list.scrollLeft + list.clientWidth < list.scrollWidth - 1) more.push('end');
    if (more.length) list.dataset.more = more.join(' ');
    else delete list.dataset.more;
  };
  list.addEventListener('scroll', edges, { passive: true });
  new ResizeObserver(edges).observe(list);

  /* State -------------------------------------------------------------------- */

  const render = () => {
    tabs.forEach((tab) => {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panelFor(tab).hidden = !selected;
    });
    blocks(panelFor(active)).forEach((b) => { b.hidden = b.dataset.product !== product; });
  };

  const select = (tab: HTMLButtonElement, focus = false) => {
    if (tab === active && !focus) return;
    steady(() => {
      active = tab;
      render();
    });
    if (focus) tab.focus({ preventScroll: true });
    reveal(tab);
  };

  const setProduct = (slug: string | undefined) => {
    const next = slug && slugs.has(slug) ? slug : product || [...slugs][0];
    if (next === product) return;
    steady(() => {
      product = next;
      tabs.forEach((tab) => { tab.hidden = !supported(tab); });
      if (active.hidden) active = tabs.find((t) => t.dataset.tab === FALLBACK) ?? visible()[0];
      // Blocks of the other panels follow the product too, so a later tab
      // switch shows the right one without a second pass.
      panels.forEach((panel) => {
        blocks(panel).forEach((b) => { b.hidden = b.dataset.product !== product; });
      });
      render();
    });
    reveal(active);
    edges();
  };

  /* Events ------------------------------------------------------------------- */

  list.addEventListener('click', (event) => {
    const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (tab && !tab.hidden) select(tab);
  });

  list.addEventListener('keydown', (event) => {
    const shown = visible();
    const focused = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    const index = shown.indexOf(focused ?? active);
    let next: HTMLButtonElement | undefined;
    if (event.key === 'ArrowRight') next = shown[(index + 1) % shown.length];
    else if (event.key === 'ArrowLeft') next = shown[(index - 1 + shown.length) % shown.length];
    else if (event.key === 'Home') next = shown[0];
    else if (event.key === 'End') next = shown[shown.length - 1];
    if (!next) return;
    event.preventDefault();
    select(next, true);
  });

  setProduct(root?.dataset.current);

  if (root) {
    root.addEventListener('showroom:change', (event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug ?? root.dataset.current;
      setProduct(slug);
    });
    // Also follow data-current directly, in case it is set without an event.
    new MutationObserver(() => setProduct(root.dataset.current)).observe(root, {
      attributes: true,
      attributeFilter: ['data-current'],
    });
  }

}
