// Generated fixtures are temporary, never published or committed.
import { writeFile, unlink, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { publishArticle } from './publisher.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const files = new Map(); const created = [];
const bytes = await sharp({ create: { width: 2000, height: 1000, channels: 3, background: '#bcb' } }).png().toBuffer();
const github = async (path, method = 'GET', body) => {
  if (path === 'git/ref/heads/main') return { object: { sha: 'a'.repeat(40) } };
  if (path.startsWith('contents/')) return null;
  if (method === 'GET' && path.startsWith('git/commits/')) return { tree: { sha: 'base' } };
  if (path === 'git/blobs') { const sha = String(files.size); files.set(sha, body); return { sha }; }
  if (path === 'git/trees') {
    for (const entry of body.tree) {
      const filename = resolve(root, entry.path);
      try { await access(filename); throw new Error(`Refusing to overwrite ${entry.path}`); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      const blob = files.get(entry.sha);
      await writeFile(filename, Buffer.from(blob.content, blob.encoding === 'base64' ? 'base64' : 'utf8')); created.push(filename);
    }
    return { sha: 'tree' };
  }
  if (path === 'git/commits') return { sha: 'b'.repeat(40) };
  if (path === 'git/refs/heads/main') return {};
  throw new Error(`Unexpected API ${path}`);
};
try {
  for (const status of ['draft', 'published']) {
    await publishArticle({
      title: 'Bài kiểm tra kỹ thuật — không xuất bản', slug: `publisher-qa-${status}`, excerpt: 'Fixture tạm để kiểm tra Astro.', category: 'tu-dat-den-nam', date: '2026-10-14', status,
      openaiFileIdRefs: [{ id: 'file-qa', download_link: 'https://files.oaiusercontent.com/qa' }],
      images: [{ alt: 'Ảnh fixture', caption: 'Ảnh thử kỹ thuật' }], coverIndex: 0,
      blocks: [{ type: 'paragraph', text: '<script>alert(1)</script> không được thực thi.' }, { type: 'heading', text: 'Đề mục thử' }, { type: 'image', imageIndex: 0 }],
    }, { github, fetcher: async () => new Response(bytes) });
  }
  try { execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe', timeout: 120_000 }); }
  catch (error) { process.stderr.write(String(error.stdout ?? '').slice(-5000)); process.stderr.write(String(error.stderr ?? '').slice(-2000)); throw error; }
  const html = await readFile(resolve(root, 'dist/chuyen-nha-nam/publisher-qa-published/index.html'), 'utf8');
  assert.match(html, /Ảnh fixture/); assert.match(html, /Đề mục thử/); assert.match(html, /\.webp/);
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  await assert.rejects(access(resolve(root, 'dist/chuyen-nha-nam/publisher-qa-draft/index.html')));
  assert.doesNotMatch(await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8'), /publisher-qa-draft/);
  console.log('Astro integration passed: published article + image render; draft absent from routes and sitemap; script text escaped.');
} finally {
  for (const filename of created) await unlink(filename);
}
