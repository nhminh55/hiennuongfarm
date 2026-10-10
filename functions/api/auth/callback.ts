/**
 * GitHub sign-in for the admin, step 2 of 2: checks the state, trades the
 * code for a token and hands it to the admin window that opened the popup,
 * using the Netlify/Decap CMS handshake Sveltia CMS expects:
 * popup → "authorizing:github"; admin echoes it; popup →
 * "authorization:github:success:{token}". The token is sent only to the
 * site's own origins.
 */

interface Env {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

const ALLOWED_ORIGINS = [/^https:\/\/hiennuongfarm\.pages\.dev$/, /^https:\/\/[a-z0-9-]+\.hiennuongfarm\.pages\.dev$/, /^https:\/\/(www\.)?hiennuongfarm\.vn$/];

const page = (status: 'success' | 'error', content: object) => {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><meta charset="utf-8"><title>Đăng nhập</title><body><p>${status === 'success' ? 'Đã đăng nhập, cửa sổ sẽ tự đóng.' : 'Đăng nhập không thành công.'}</p><script>
const allowed = [${ALLOWED_ORIGINS.map(String).join(', ')}];
const message = ${JSON.stringify(message)};
const isError = ${status === 'error'};
window.addEventListener('message', (e) => {
  if (e.data !== 'authorizing:github') return;
  if (!isError && !allowed.some((re) => re.test(e.origin))) return;
  window.opener.postMessage(message, e.origin);
  setTimeout(() => window.close(), 500);
});
window.opener && window.opener.postMessage('authorizing:github', '*');
</script>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'admin-oauth-state=; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      'Cache-Control': 'no-store',
    },
  });
};

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const cookie = /(?:^|;\s*)admin-oauth-state=([^;]+)/.exec(request.headers.get('Cookie') ?? '')?.[1];
  if (!state || state !== cookie) return page('error', { message: 'Phiên đăng nhập không hợp lệ, hãy thử lại.' });
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return page('error', { message: 'Thiếu GITHUB_CLIENT_ID hoặc GITHUB_CLIENT_SECRET trong Cloudflare Pages.' });

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'hiennuongfarm-admin' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: url.searchParams.get('code') }),
  });
  const data = (await response.json().catch(() => ({}))) as { access_token?: string; error_description?: string };
  if (!data.access_token) return page('error', { message: data.error_description ?? 'GitHub không trả về token.' });
  return page('success', { token: data.access_token, provider: 'github' });
};
