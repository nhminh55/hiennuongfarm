/**
 * Edit mode (loaded by ./boot.ts for a signed-in admin): every text on the
 * page that comes from a copy file can be edited in place, and "Lưu"
 * commits all changes to GitHub in one commit, which rebuilds the site.
 *
 * Texts are found by matching what the page shows against
 * /admin/noi-dung.json (src/pages/admin/noi-dung.json.ts). A text that
 * code rewrites before showing it (a page number, a caption with its
 * credit) does not match and stays editable only in /admin.
 *
 * Headings (h1–h3) that hold a whole text can be broken into lines:
 * Enter breaks, Backspace at the start of a line joins. The breaks are
 * kept in the copy file as line breaks; wide screens show them
 * (src/middleware.ts, global.css [data-title-lines]), phones wrap as before.
 *
 * On localhost nothing is committed: "Lưu" prints the new files in the
 * console instead.
 */
// Inlined here and added on start, so that visitors' pages never carry it.
import css from './editor.css?inline';
import { Conflict, setText, type Path } from './splice';
import { EDITING } from './session';

const REPO = 'nhminh55/hiennuongfarm';
const BRANCH = 'main';
const WORKFLOW = '.github/workflows/deploy-pages.yml';
const DRY = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

const TAGS = 'h1,h2,h3,h4,h5,h6,p,li,a,span,figcaption,th,td,dt,dd,summary,button,label,strong,em,small,blockquote';
const LINE_TAGS = new Set(['H1', 'H2', 'H3']);

interface Place { file: string; path: Path; value: string }
interface Group { text: string; places: Place[]; elements: HTMLElement[] }
interface Change { group: Group; to: string }

/** Text as the page shows it: runs of spaces, line breaks and NBSPs are one space. */
const norm = (s: string) => s.replace(/[\s ]+/g, ' ').trim();

let token = '';
const groups = new Map<string, Group>();
const owner = new WeakMap<HTMLElement, Group>();
const changes = new Map<Group, Change>();
let bar: HTMLElement;
let status: HTMLElement;
let saveButton: HTMLButtonElement;
let saving = false;

/* GitHub --------------------------------------------------------------- */

class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function gh<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!response.ok) throw new HttpError(response.status, await response.text());
  return response.json();
}

const decode = (base64: string) => new TextDecoder().decode(Uint8Array.from(atob(base64.replace(/\n/g, '')), (c) => c.charCodeAt(0)));

async function readFile(name: string, ref: string): Promise<string> {
  if (DRY) {
    // Vite serves any project file as a string module in development.
    const module = await import(/* @vite-ignore */ `/src/content/${name}.md?raw`);
    return module.default;
  }
  const file = await gh<{ content: string }>(`/contents/src/content/${name}.md?ref=${ref}`);
  return decode(file.content);
}

/** Writes every change into its files and commits them as one commit. */
async function commit(): Promise<string | undefined> {
  const head = DRY ? '' : (await gh<{ object: { sha: string } }>(`/git/ref/heads/${BRANCH}`)).object.sha;
  const byFile = new Map<string, { path: Path; from: string; to: string }[]>();
  for (const { group, to } of changes.values()) {
    for (const place of group.places) {
      const list = byFile.get(place.file) ?? [];
      list.push({ path: place.path, from: place.value, to });
      byFile.set(place.file, list);
    }
  }
  const tree: { path: string; mode: '100644'; type: 'blob'; content: string }[] = [];
  for (const [name, edits] of byFile) {
    let source = await readFile(name, head);
    for (const edit of edits) source = setText(source, edit.path, edit.from, edit.to);
    tree.push({ path: `src/content/${name}.md`, mode: '100644', type: 'blob', content: source });
  }
  const message = `Nội dung: sửa trực tiếp · ${[...byFile.keys()].join(', ')}`;
  if (DRY) {
    console.info(`[Chế độ sửa · thử] ${message}`);
    for (const file of tree) console.info(`--- ${file.path}\n${file.content}`);
    return undefined;
  }
  const base = await gh<{ tree: { sha: string } }>(`/git/commits/${head}`);
  const newTree = await gh<{ sha: string }>('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: base.tree.sha, tree }) });
  const created = await gh<{ sha: string }>('/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }) });
  await gh(`/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: JSON.stringify({ sha: created.sha, force: false }) });
  return created.sha;
}

/** Follows the site's build for a commit until it is live or fails. */
async function follow(sha: string) {
  const started = Date.now();
  while (Date.now() - started < 20 * 60_000) {
    await new Promise((r) => setTimeout(r, 15_000));
    try {
      const { workflow_runs: runs } = await gh<{ workflow_runs: { path: string; status: string; conclusion: string | null }[] }>(`/actions/runs?head_sha=${sha}`);
      const run = runs.find((r) => r.path === WORKFLOW);
      if (!run || run.status !== 'completed') continue;
      if (run.conclusion === 'success') say('Đã lên trang. Khách sẽ thấy chữ mới.', 'ok');
      else say('Build lỗi: chữ mới chưa lên trang (trang cũ vẫn chạy bình thường). Hãy báo người phụ trách kỹ thuật.', 'error');
      return;
    } catch { /* try again on the next round */ }
  }
  say('Chưa thấy kết quả cập nhật trang. Hãy tải lại sau ít phút.', 'error');
}

/* Finding the texts ---------------------------------------------------- */

async function findTexts() {
  const lang = document.documentElement.lang.slice(0, 2) || 'vi';
  const index: { files: string[]; entries: [string, string, number, Path][] } = await (await fetch('/admin/noi-dung.json', { cache: 'no-store' })).json();
  for (const [entryLang, value, file, path] of index.entries) {
    const text = norm(value);
    if (entryLang !== lang || !text) continue;
    const group = groups.get(text) ?? { text, places: [], elements: [] };
    group.places.push({ file: index.files[file], path, value });
    groups.set(text, group);
  }

  const found: HTMLElement[] = [];
  for (const el of document.body.querySelectorAll<HTMLElement>(TAGS)) {
    if (el.closest('[data-edit-skip],[data-edit-ui],script,style,noscript,template')) continue;
    if (!el.getClientRects().length || getComputedStyle(el).visibility !== 'visible') continue;
    const group = groups.get(norm(el.textContent ?? ''));
    if (group) found.push(el);
  }
  // The innermost element that holds the whole text.
  for (const el of found) {
    if (found.some((other) => other !== el && el.contains(other))) continue;
    const group = groups.get(norm(el.textContent ?? ''))!;
    group.elements.push(el);
    owner.set(el, group);
    el.classList.add('hn-editable');
  }
}

/* Editing in place ----------------------------------------------------- */

let current: { el: HTMLElement; group: Group; html: string; lines: boolean; tools: HTMLElement } | undefined;

const valueOf = (group: Group) => changes.get(group)?.to ?? group.places[0].value;

function begin(el: HTMLElement) {
  if (current) finish(true);
  const group = owner.get(el)!;
  const lines = LINE_TAGS.has(el.tagName);
  const html = el.innerHTML;
  el.textContent = lines ? valueOf(group) : valueOf(group).replace(/\n/g, ' ');
  el.classList.add('hn-editing');
  el.toggleAttribute('data-title-lines', lines);
  el.setAttribute('contenteditable', 'plaintext-only');
  if (el.contentEditable !== 'plaintext-only') el.setAttribute('contenteditable', 'true');
  el.spellcheck = false;

  const tools = document.createElement('div');
  tools.className = 'hn-tools';
  tools.setAttribute('data-edit-ui', '');
  const others = group.places.length - 1;
  tools.innerHTML = `
    ${lines ? '<p class="hn-tools__note">Enter: xuống dòng · Backspace ở đầu dòng: gộp dòng. Chỉ áp dụng màn hình rộng; điện thoại tự xuống dòng.</p>' : ''}
    ${others > 0 ? `<p class="hn-tools__note">Chữ này còn có ở ${others} chỗ khác trên website; sửa ở đây sẽ đổi cả những chỗ đó.</p>` : ''}
    <p class="hn-tools__warn" hidden></p>
    <div class="hn-tools__row">
      ${lines ? '<button type="button" data-act="join">Gộp thành một dòng</button>' : ''}
      <button type="button" data-act="cancel">Huỷ</button>
      <button type="button" data-act="done" class="hn-primary">Xong</button>
    </div>`;
  tools.addEventListener('mousedown', (e) => e.preventDefault());
  tools.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-act]')?.dataset.act;
    if (act === 'join') { el.textContent = read(el, true).replace(/\n/g, ' '); place(el); check(el); }
    if (act === 'cancel') finish(true);
    if (act === 'done') finish(false);
  });
  document.body.append(tools);
  current = { el, group, html, lines, tools };
  position();
  el.focus();
  place(el);
  check(el);
}

/** The edited text: lines trimmed (headings), otherwise one line. */
const read = (el: HTMLElement, lines: boolean) => {
  const text = el.innerText.replace(/\r/g, '');
  return lines
    ? text.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n')
    : text.replace(/[ \t\n]+/g, ' ').trim();
};

/** Caret at the end of the element. */
function place(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection = getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function position() {
  if (!current) return;
  const box = current.el.getBoundingClientRect();
  const tools = current.tools;
  const top = box.bottom + 8 + tools.offsetHeight > innerHeight ? box.top - tools.offsetHeight - 8 : box.bottom + 8;
  tools.style.top = `${Math.max(8, top)}px`;
  tools.style.left = `${Math.min(Math.max(8, box.left), innerWidth - tools.offsetWidth - 8)}px`;
}

/** Warns when a line still wraps because the space is narrow. */
function check(el: HTMLElement) {
  const warn = current?.tools.querySelector<HTMLElement>('.hn-tools__warn');
  if (!warn || !current?.lines) return;
  const wanted = read(el, true).split('\n').length;
  // Lines shown: the heading's height over its line height (counting text
  // boxes miscounts at browser zoom levels such as 110%).
  const style = getComputedStyle(el);
  const line = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
  const height = el.getBoundingClientRect().height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  warn.hidden = Math.round(height / line) <= wanted || innerWidth < 1024;
  warn.textContent = 'Có dòng vẫn tự xuống dòng vì khung chữ hẹp; thử tách ngắn hơn.';
}

function finish(cancel: boolean) {
  if (!current) return;
  const { el, group, html, lines, tools } = current;
  const text = read(el, lines);
  if (!cancel && !text) {
    const warn = tools.querySelector<HTMLElement>('.hn-tools__warn')!;
    warn.hidden = false;
    warn.textContent = 'Không để trống được.';
    return;
  }
  current = undefined;
  tools.remove();
  el.removeAttribute('contenteditable');
  el.classList.remove('hn-editing');
  if (cancel || text === valueOf(group)) {
    el.innerHTML = html;
    el.toggleAttribute('data-title-lines', valueOf(group).includes('\n'));
    return;
  }
  if (text === group.places[0].value) changes.delete(group);
  else changes.set(group, { group, to: text });
  for (const other of group.elements) {
    other.textContent = text;
    other.toggleAttribute('data-title-lines', LINE_TAGS.has(other.tagName) && text.includes('\n'));
    other.classList.toggle('hn-changed', changes.has(group));
  }
  update();
}

/* The bar ---------------------------------------------------------------- */

function say(message: string, tone: 'info' | 'ok' | 'error' = 'info') {
  status.textContent = message;
  status.dataset.tone = tone;
}

function update() {
  const n = changes.size;
  saveButton.disabled = saving || n === 0;
  bar.querySelector<HTMLElement>('[data-count]')!.textContent = n ? `${n} thay đổi chưa lưu` : 'Bấm vào chữ để sửa';
}

async function save() {
  if (current) finish(false);
  if (!changes.size || saving) return;
  saving = true;
  update();
  say('Đang lưu…');
  try {
    let sha: string | undefined;
    try {
      sha = await commit();
    } catch (error) {
      // The branch moved while saving: start again from the new commit.
      if (error instanceof HttpError && error.status === 422) sha = await commit();
      else throw error;
    }
    // The saved texts are the texts from now on.
    for (const { group, to } of changes.values()) {
      groups.delete(group.text);
      group.places = group.places.map((p) => ({ ...p, value: to }));
      group.text = norm(to);
      groups.set(group.text, group);
      group.elements.forEach((el) => el.classList.remove('hn-changed'));
    }
    changes.clear();
    if (DRY) say('Thử trên máy: không lưu lên GitHub (xem console).', 'ok');
    else {
      say('Đã lưu. Đang cập nhật trang, thường mất vài phút…');
      follow(sha!);
    }
  } catch (error) {
    if (error instanceof Conflict) say(`${error.message}. Hãy tải lại trang rồi sửa lại.`, 'error');
    else if (error instanceof HttpError && error.status === 401) say('Phiên đăng nhập đã hết. Vào “Quản trị đầy đủ” để đăng nhập lại.', 'error');
    else if (error instanceof HttpError && (error.status === 403 || error.status === 404)) say('Tài khoản này không có quyền lưu.', 'error');
    else say('Chưa lưu được. Kiểm tra mạng rồi thử lại.', 'error');
    console.error(error);
  } finally {
    saving = false;
    update();
  }
}

function buildBar() {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
  bar = document.createElement('div');
  bar.className = 'hn-bar';
  bar.setAttribute('data-edit-ui', '');
  bar.innerHTML = `
    <strong class="hn-bar__title">Chế độ sửa</strong>
    <span class="hn-bar__count" data-count></span>
    <span class="hn-bar__status" data-status role="status"></span>
    <span class="hn-bar__actions">
      <button type="button" data-act="discard">Huỷ thay đổi</button>
      <button type="button" data-act="save" class="hn-primary">Lưu</button>
      <a href="/admin/">Quản trị đầy đủ</a>
      <button type="button" data-act="exit">Thoát</button>
    </span>`;
  status = bar.querySelector('[data-status]')!;
  saveButton = bar.querySelector('[data-act="save"]')!;
  bar.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-act]')?.dataset.act;
    if (act === 'save') save();
    if (act === 'discard' && changes.size && confirm('Bỏ mọi thay đổi chưa lưu?')) { changes.clear(); location.reload(); }
    if (act === 'exit' && (!changes.size || confirm('Còn thay đổi chưa lưu. Vẫn thoát?'))) {
      changes.clear();
      sessionStorage.removeItem(EDITING);
      location.reload();
    }
  });
  document.body.append(bar);
  document.documentElement.classList.add('hn-edit-mode');
  update();
}

/* Start ------------------------------------------------------------------ */

export async function start(signedInToken: string) {
  token = signedInToken;
  buildBar();
  if (!DRY) {
    try {
      const repo = await gh<{ permissions?: { push?: boolean } }>('');
      if (!repo.permissions?.push) { say('Tài khoản này không có quyền sửa website.', 'error'); return; }
    } catch (error) {
      say(error instanceof HttpError && error.status === 401 ? 'Phiên đăng nhập đã hết. Vào “Quản trị đầy đủ” để đăng nhập lại.' : 'Không kết nối được GitHub.', 'error');
      return;
    }
  }
  await findTexts();
  if (DRY) say('Thử trên máy: Lưu sẽ không gửi lên GitHub.');

  // Editable texts open for editing instead of following links or buttons.
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('.hn-editable');
    if (!el || el.closest('[data-edit-ui]')) return;
    e.preventDefault();
    e.stopPropagation();
    if (current?.el !== el) begin(el);
  }, true);
  document.addEventListener('keydown', (e) => {
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); finish(true); }
    else if (e.key === 'Enter' && !current.lines) { e.preventDefault(); finish(false); }
  });
  document.addEventListener('input', () => { if (current) { check(current.el); position(); } });
  addEventListener('scroll', position, { passive: true });
  addEventListener('resize', position);
  addEventListener('beforeunload', (e) => {
    if (changes.size || current) e.preventDefault();
  });
}
