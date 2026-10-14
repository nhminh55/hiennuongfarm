import { createServer } from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { InputError, githubClient, publishArticle, publicationStatus } from './publisher.mjs';

export function createPublisherServer({ actionKey, github, fetcher = fetch }) {
  if (!actionKey || actionKey.length < 32) throw new Error('PUBLISHER_API_KEY must contain at least 32 characters.');
  let busy = false;
  return createServer(async (request, response) => {
    const send = (status, data) => { response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); response.end(JSON.stringify(data)); };
    const url = new URL(request.url, 'http://localhost');
    if (request.method === 'GET' && url.pathname === '/health') return send(200, { status: 'ok' });
    const received = Buffer.from(request.headers.authorization ?? '');
    const expected = Buffer.from(`Bearer ${actionKey}`);
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) return send(401, { error: 'Không có quyền đăng bài.' });
    let ownsLock = false;
    try {
      if (request.method === 'GET' && /^\/publications\/[a-f0-9]{40}$/.test(url.pathname)) {
        return send(200, await publicationStatus(url.pathname.split('/').at(-1), github));
      }
      if (request.method !== 'POST' || url.pathname !== '/articles') return send(404, { error: 'Không tìm thấy endpoint.' });
      if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] ?? '')) throw new InputError('Cần application/json.', 415);
      if (busy) throw new InputError('Đang xử lý một bài khác; thử lại sau.', 429);
      busy = true; ownsLock = true;
      const chunks = []; let size = 0;
      for await (const chunk of request) {
        size += chunk.length;
        if (size > 128 * 1024) throw new InputError('Yêu cầu vượt 128 KB.', 413);
        chunks.push(chunk);
      }
      let input;
      try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new InputError('JSON không hợp lệ.'); }
      return send(200, await publishArticle(input, { github, fetcher }));
    } catch (error) {
      // Never log file URLs, credentials, request bodies or upstream raw errors.
      return send(error instanceof InputError ? error.status : 502, { error: error instanceof InputError ? error.message : 'Xử lý thất bại. Chưa xác nhận xuất bản; thử lại hoặc liên hệ người quản trị.' });
    } finally { if (ownsLock) busy = false; }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required.');
  const port = Number(process.env.PORT ?? 4335);
  if (!Number.isInteger(port) || port < 4330 || port > 65535) throw new Error('Use a port from 4330 to 65535.');
  const server = createPublisherServer({ actionKey: process.env.PUBLISHER_API_KEY, github: githubClient(process.env.GITHUB_TOKEN) });
  server.requestTimeout = 30_000;
  server.headersTimeout = 10_000;
  server.listen(port, process.env.HOST ?? '127.0.0.1', () => console.log(`Chat publisher listening on port ${port}`));
}
