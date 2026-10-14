import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { validateArticle, validateDownloadURL, optimizeImage, publishArticle, publicationStatus, readLimited } from './publisher.mjs';
import { createPublisherServer } from './server.mjs';
const sample = () => ({
  title: 'Bài thử kỹ thuật', slug: 'bai-thu-ky-thuat', excerpt: 'Chỉ dùng để kiểm tra, không xuất bản.',
  date: '2026-10-14', category: 'tu-dat-den-nam', status: 'draft',
  openaiFileIdRefs: [0, 1].map(i => ({ id: `file-${i}`, download_link: `https://files.oaiusercontent.com/test-${i}` })),
  images: [{ alt: 'Ảnh thử ngang', caption: 'Chú thích ảnh thử' }, { alt: 'Ảnh thử dọc' }], coverIndex: 0,
  blocks: [{ type: 'paragraph', text: 'Nội dung thử với <script> và [liên kết](javascript:alert(1)).' }, { type: 'heading', text: 'Mục tiếp theo' }, { type: 'image', imageIndex: 1 }],
});
const png = () => sharp({ create: { width: 2400, height: 1200, channels: 3, background: '#aabbaa' } }).png().toBuffer();
function fakeGithub({ existing = null, conflict = false } = {}) {
  const writes = [];
  const blobs = new Map();
  const github = async (path, method = 'GET', body) => {
    if (method !== 'GET') writes.push({ path, method, body });
    if (path === 'git/ref/heads/main') return { object: { sha: 'a'.repeat(40) } };
    if (path.startsWith('contents/')) return existing;
    if (path.startsWith('git/commits/') && method === 'GET') return { tree: { sha: 'old-tree' } };
    if (path === 'git/blobs') { const sha = `blob-${blobs.size}`; blobs.set(sha, body); return { sha }; }
    if (path === 'git/trees') return { sha: 'new-tree' };
    if (path === 'git/commits') return { sha: 'b'.repeat(40) };
    if (path === 'git/refs/heads/main') { if (conflict) throw new Error('ref conflict'); return {}; }
    throw new Error(`Unexpected API ${path}`);
  };
  return { github, writes, blobs };
}
test('validation rejects path traversal, reserved slugs, invalid dates, missing attachments and oversized body', () => {
  for (const change of [{ slug: '../x' }, { slug: 'trang' }, { date: '2026-02-30' }, { openaiFileIdRefs: [] }, { blocks: [{ type: 'paragraph', text: 'x'.repeat(5001) }] }]) assert.throws(() => validateArticle({ ...sample(), ...change }));
});
test('attachment links reject credentials, insecure protocols, arbitrary hosts and suffix lookalikes', () => {
  for (const url of ['http://files.oaiusercontent.com/a', 'https://localhost/a', 'https://files.oaiusercontent.com.evil.test/a', 'https://user:pass@files.oaiusercontent.com/a', 'https://files.oaiusercontent.com:8443/a']) assert.throws(() => validateDownloadURL(url));
  assert.equal(validateDownloadURL('https://files.oaiusercontent.com/a'), 'https://files.oaiusercontent.com/a');
});
test('image conversion preserves proportions, limits long edge, strips metadata and never upscales', async () => {
  const { data } = await optimizeImage(await png()); const meta = await sharp(data).metadata();
  assert.equal(meta.format, 'webp'); assert.equal(meta.width, 1800); assert.equal(meta.height, 900); assert.equal(meta.exif, undefined);
  const small = await sharp({ create: { width: 100, height: 200, channels: 3, background: '#fff' } }).png().toBuffer();
  assert.equal((await sharp((await optimizeImage(small)).data).metadata()).width, 100);
  await assert.rejects(optimizeImage(Buffer.from('not an image')));
});
test('publish writes both WebP assets and safe article as one non-forced commit', async () => {
  const bytes = await png(); const fake = fakeGithub();
  const result = await publishArticle(sample(), { github: fake.github, fetcher: async () => new Response(bytes) });
  assert.equal(result.status, 'draft_saved'); assert.equal(result.articleUrl, null);
  const tree = fake.writes.find(w => w.path === 'git/trees').body;
  assert.equal(tree.tree.length, 2); // identical photos reuse one asset assert.equal(tree.base_tree, 'old-tree');
  assert.equal(fake.writes.at(-1).body.force, false);
  const article = [...fake.blobs.values()].find(b => b.encoding === 'utf-8').content;
  assert.match(article, /draft: true/); assert.match(article, /\\<script\\>/); assert.match(article, /\.webp/);
  assert.doesNotMatch(article, /<script>/);
});
test('expired second photo causes zero GitHub writes', async () => {
  const bytes = await png(); const fake = fakeGithub(); let calls = 0;
  await assert.rejects(publishArticle(sample(), { github: fake.github, fetcher: async () => ++calls === 1 ? new Response(bytes) : new Response('', { status: 403 }) }), /hết hạn/);
  assert.equal(fake.writes.length, 0);
});
test('existing slug is never overwritten; identical retry does not duplicate a commit', async () => {
  const bytes = await png(); const fetcher = async () => new Response(bytes); const first = fakeGithub();
  await publishArticle(sample(), { github: first.github, fetcher });
  const content = [...first.blobs.values()].find(b => b.encoding === 'utf-8').content;
  const retry = fakeGithub({ existing: { content: Buffer.from(content).toString('base64') } });
  assert.equal((await publishArticle(sample(), { github: retry.github, fetcher })).status, 'already_saved'); assert.equal(retry.writes.length, 0);
  const occupied = fakeGithub({ existing: { content: Buffer.from('old approved article').toString('base64') } });
  await assert.rejects(publishArticle(sample(), { github: occupied.github, fetcher }), /Slug đã tồn tại/); assert.equal(occupied.writes.length, 0);
});
test('bounded downloads reject oversized responses', async () => {
  await assert.rejects(readLimited(new Response('12345'), 4), /giới hạn/);
});
test('status does not confuse saved content with successful deployment', async () => {
  for (const [status, conclusion, expected] of [['in_progress', null, 'deploy_pending'], ['completed', 'failure', 'deploy_failed'], ['completed', 'success', 'deployed']]) {
    assert.equal((await publicationStatus('b'.repeat(40), async () => ({ workflow_runs: [{ id: 1, head_sha: 'b'.repeat(40), status, conclusion }] }))).status, expected);
  }
});
test('HTTP endpoint enforces bearer authentication before processing photos', async () => {
  const server = createPublisherServer({ actionKey: 'k'.repeat(32), github: async () => { throw new Error('must not run'); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await fetch(`${base}/articles`, { method: 'POST', body: '{}' })).status, 401);
    assert.equal((await fetch(`${base}/articles`, { method: 'POST', headers: { Authorization: `Bearer ${'k'.repeat(32)}`, 'Content-Type': 'application/json' }, body: '{bad' })).status, 400);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
test('concurrent main change is not force-overwritten or reported as published', async () => {
  const fake = fakeGithub({ conflict: true }); const bytes = await png();
  await assert.rejects(publishArticle({ ...sample(), status: 'published' }, { github: fake.github, fetcher: async () => new Response(bytes) }), /conflict/);
  assert.equal(fake.writes.at(-1).body.force, false);
});
