/**
 * GitHub sign-in for the admin (/admin, Sveltia CMS), step 1 of 2: sends the
 * popup to GitHub with a one-time state that callback.ts checks.
 * Cloudflare Pages Function; secrets GITHUB_CLIENT_ID and
 * GITHUB_CLIENT_SECRET are set in the Pages project, never in the repo.
 */

interface Env {
  GITHUB_CLIENT_ID?: string;
}

// The repository is public: writing its contents needs public_repo only.
const SCOPE = 'public_repo';

export const onRequestGet = ({ request, env }: { request: Request; env: Env }) => {
  if (!env.GITHUB_CLIENT_ID) return new Response('GITHUB_CLIENT_ID chưa được cài trong Cloudflare Pages.', { status: 500 });
  const state = crypto.randomUUID();
  const callback = new URL('/api/auth/callback', request.url).href;
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: callback, scope: SCOPE, state }).toString();
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.href,
      'Set-Cookie': `admin-oauth-state=${state}; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};
