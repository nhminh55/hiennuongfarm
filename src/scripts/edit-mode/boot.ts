/**
 * Edit mode, first step (every page): for a visitor signed in to the admin
 * (/admin), offers "Sửa trang" and loads the editor (./editor.ts) on
 * request. Everyone else stops at the first check and loads nothing more.
 *
 * The admin's sign-in is the one Sveltia CMS keeps in this site's
 * localStorage; /admin sends a fresh sign-in here with ?sua=1. Edit mode
 * stays on from page to page until the editor's "Thoát".
 */
import { adminToken, EDITING } from './session';

const token = adminToken();
if (token) {
  const url = new URL(location.href);
  if (url.searchParams.has('sua')) {
    url.searchParams.delete('sua');
    history.replaceState(history.state, '', url);
    sessionStorage.setItem(EDITING, '1');
  }

  const start = () => import('./editor').then((editor) => editor.start(token));

  if (sessionStorage.getItem(EDITING)) start();
  else {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hn-edit-start';
    button.textContent = '✎ Sửa trang';
    button.setAttribute('data-edit-ui', '');
    button.style.cssText = 'position:fixed;left:1rem;bottom:1rem;z-index:1000;padding:.6rem 1rem;border-radius:999px;background:var(--color-deep-green);color:var(--color-cream);font:500 .875rem/1 var(--font-body);box-shadow:0 4px 16px rgba(0,0,0,.18);cursor:pointer';
    button.addEventListener('click', () => {
      sessionStorage.setItem(EDITING, '1');
      button.remove();
      start();
    });
    document.body.append(button);
  }
}
