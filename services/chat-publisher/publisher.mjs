import sharp from 'sharp';
import { createHash } from 'node:crypto';

export class InputError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
const categories = ['hieu-ve-nam', 'bep-nha-nam', 'tu-dat-den-nam'];
const reserved = [...categories, 'trang', 'index'];
export const maxImageBytes = 15 * 1024 * 1024;
const string = (value, name, max = 1000) => {
  if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new InputError(`${name}: thiếu nội dung hoặc vượt giới hạn.`);
  }
  return value.trim();
};
// The pilot accepts structured plain text, not executable HTML/MDX or arbitrary paths.
const markdownText = text => text.replace(/[\\`*_{}\[\]()<>!#|~]/g, '\\$&');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

export function validateArticle(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new InputError('Dữ liệu bài không hợp lệ.');
  const slug = string(input.slug, 'slug', 100);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || reserved.includes(slug)) throw new InputError('Slug không hợp lệ hoặc trùng địa chỉ chuyên mục.');
  if (!categories.includes(input.category)) throw new InputError('Chuyên mục không hợp lệ.');
  const date = string(input.date, 'date', 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new InputError('Ngày đăng không hợp lệ.');
  if (!['draft', 'published'].includes(input.status)) throw new InputError('Chọn draft hoặc published.');
  const refs = input.openaiFileIdRefs;
  if (!Array.isArray(refs) || refs.length < 1 || refs.length > 2) throw new InputError('Bản thử nhận 1–2 ảnh đính kèm.');
  if (!Array.isArray(input.images) || input.images.length !== refs.length) throw new InputError('Mỗi ảnh cần một mô tả ảnh.');
  const images = input.images.map((image, i) => ({
    alt: string(image?.alt, `Ảnh ${i + 1}: mô tả`, 500),
    ...(image?.caption ? { caption: string(image.caption, 'Chú thích', 500) } : {}),
  }));
  if (!Number.isInteger(input.coverIndex) || !images[input.coverIndex]) throw new InputError('Ảnh bìa không hợp lệ.');
  if (!Array.isArray(input.blocks) || input.blocks.length < 1 || input.blocks.length > 80) throw new InputError('Cần 1–80 khối nội dung.');
  let textLength = 0;
  const blocks = input.blocks.map(block => {
    if (!block || !['paragraph', 'heading', 'quote', 'image'].includes(block.type)) throw new InputError('Loại khối không hợp lệ.');
    if (block.type === 'image') {
      if (!Number.isInteger(block.imageIndex) || !images[block.imageIndex]) throw new InputError('Chỉ số ảnh trong bài không hợp lệ.');
      return { type: 'image', imageIndex: block.imageIndex };
    }
    const text = string(block.text, 'Nội dung', 5000); textLength += text.length;
    return { type: block.type, text };
  });
  if (!textLength || textLength > 30000) throw new InputError('Nội dung chữ cần nằm trong 1–30.000 ký tự.');
  return {
    slug, category: input.category, date, status: input.status,
    title: string(input.title, 'Tiêu đề', 200), excerpt: string(input.excerpt, 'Mô tả', 600),
    images, blocks, coverIndex: input.coverIndex, refs,
  };
}

export function validateDownloadURL(link) {
  let url;
  try { url = new URL(link); } catch { throw new InputError('Ảnh thiếu link tải thật từ ChatGPT.'); }
  const host = url.hostname;
  const allowed = host === 'files.oaiusercontent.com' || host.endsWith('.oaiusercontent.com') ||
    /^oaisdmntpr[a-z0-9]*\.blob\.core\.windows\.net$/.test(host) ||
    /^oaisdsorpr[a-z0-9]*\.blob\.core\.windows\.net$/.test(host) ||
    /^oaisdmntpr[a-z0-9]*aws\.s3\.[a-z0-9-]+\.amazonaws\.com$/.test(host);
  if (url.protocol !== 'https:' || url.port || url.username || url.password || !allowed) throw new InputError('Chỉ nhận link ảnh đính kèm từ máy chủ OpenAI được cho phép.');
  return url.href;
}

export async function readLimited(response, limit) {
  if (!response.body) throw new InputError('Không có dữ liệu.');
  if (Number(response.headers.get('content-length')) > limit) throw new InputError('Dữ liệu vượt giới hạn.', 413);
  const reader = response.body.getReader(); const chunks = []; let total = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read(); if (done) break;
      total += value.length;
      if (total > limit) { await reader.cancel(); throw new InputError('Dữ liệu vượt giới hạn.', 413); }
      chunks.push(Buffer.from(value));
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}

export async function optimizeImage(bytes) {
  let meta;
  try { meta = await sharp(bytes, { limitInputPixels: 40_000_000 }).metadata(); }
  catch { throw new InputError('Ảnh bị hỏng hoặc không đọc được.'); }
  if (!['jpeg', 'png', 'webp'].includes(meta.format) || (meta.pages ?? 1) > 1) throw new InputError('Chỉ nhận ảnh tĩnh JPG, PNG hoặc WebP.');
  // No generated pixels, retouching, crop, upscaling or original EXIF/location data.
  const image = sharp(bytes, { limitInputPixels: 40_000_000 }).rotate().resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true });
  for (const quality of [84, 81, 78]) {
    const data = await image.clone().webp({ quality }).toBuffer();
    if (data.length <= 300 * 1024 || quality === 78) {
      return { data, warning: data.length > 300 * 1024 ? 'Ảnh vượt mục tiêu 300 KB; giữ chất lượng tối thiểu 78.' : null };
    }
  }
}

function serializeArticle(a, paths) {
  const q = JSON.stringify;
  const cover = a.images[a.coverIndex];
  const front = [
    '---', `title: ${q(a.title)}`, `excerpt: ${q(a.excerpt)}`, `category: ${a.category}`,
    `date: ${a.date}`, 'author: "Hiền Nương Farm"', 'featured: false', `draft: ${a.status === 'draft'}`,
    'cover:', `  src: ${q(paths[a.coverIndex].relative)}`, `  alt: ${q(cover.alt)}`,
    ...(cover.caption ? [`  caption: ${q(cover.caption)}`] : []), '---', '',
  ];
  const body = a.blocks.map(b => {
    if (b.type === 'image') {
      const i = b.imageIndex;
      return `![${markdownText(a.images[i].alt)}](${paths[i].relative})${a.images[i].caption ? `\n\n*${markdownText(a.images[i].caption)}*` : ''}`;
    }
    const text = markdownText(b.text);
    return b.type === 'heading' ? `## ${text.replace(/\r?\n/g, ' ')}` : b.type === 'quote' ? text.split(/\r?\n/).map(line => `> ${line}`).join('\n') : text;
  }).join('\n\n');
  return front.join('\n') + body + '\n';
}

export function githubClient(token, fetcher = fetch) {
  return async (path, method = 'GET', body) => {
    const response = await fetcher(`https://api.github.com/repos/nhminh55/hiennuongfarm/${path}`, {
      method, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 404 && method === 'GET') return null;
    if (!response.ok) throw new InputError(response.status === 422 ? 'GitHub đã thay đổi hoặc từ chối ghi. Thử lại; chưa xác nhận đăng thành công.' : `GitHub không thực hiện được yêu cầu (HTTP ${response.status}).`, response.status === 422 ? 409 : 502);
    return response.json();
  };
}

export async function publishArticle(input, { github, fetcher = fetch }) {
  const a = validateArticle(input);
  const warnings = []; const assets = [];
  for (let i = 0; i < a.refs.length; i++) {
    const ref = a.refs[i];
    if (!ref || typeof ref !== 'object' || typeof ref.id !== 'string') throw new InputError('ChatGPT chưa cung cấp file reference thật; gửi lại ảnh qua Action.');
    const url = validateDownloadURL(ref.download_link);
    const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new InputError('Link ảnh hết hạn hoặc tải lỗi. Gửi lại ảnh và thử lại.', 400);
    const result = await optimizeImage(await readLimited(response, maxImageBytes));
    if (result.warning) warnings.push(result.warning);
    const filename = `${a.slug}-${digest(result.data).slice(0, 20)}.webp`;
    assets.push({ path: `src/assets/chuyen-nha-nam/${filename}`, relative: `../../assets/chuyen-nha-nam/${filename}`, data: result.data });
  }
  const content = serializeArticle(a, assets);
  const path = `src/content/chuyen-nha-nam/${a.slug}.md`;
  const fingerprint = digest(content);
  const ref = await github('git/ref/heads/main');
  if (!ref?.object?.sha) throw new InputError('Không tìm thấy nhánh main.', 502);
  const head = ref.object.sha;
  const existing = await github(`contents/${path}?ref=${head}`);
  if (existing) {
    if (Buffer.from(existing.content ?? '', 'base64').toString('utf8') === content) return {
      status: 'already_saved', slug: a.slug, fingerprint, warnings,
      message: 'Bài giống hệt đã có trong GitHub. Chưa xác nhận deploy; không tạo bài trùng.',
      articleUrl: a.status === 'published' ? `https://hiennuongfarm.vn/chuyen-nha-nam/${a.slug}/` : null,
    };
    throw new InputError('Slug đã tồn tại. Bản thử không ghi đè bài cũ; chọn slug khác.', 409);
  }
  const commit = await github(`git/commits/${head}`);
  const tree = [];
  // Download/validate every image before creating Git objects. Commit article + images atomically.
  for (const asset of new Map(assets.map(asset => [asset.path, asset])).values()) {
    const blob = await github('git/blobs', 'POST', { content: asset.data.toString('base64'), encoding: 'base64' });
    tree.push({ path: asset.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const article = await github('git/blobs', 'POST', { content, encoding: 'utf-8' });
  tree.push({ path, mode: '100644', type: 'blob', sha: article.sha });
  const newTree = await github('git/trees', 'POST', { base_tree: commit.tree.sha, tree });
  const next = await github('git/commits', 'POST', { message: `content: ${a.status === 'draft' ? 'draft' : 'publish'} ${a.slug}`, tree: newTree.sha, parents: [head] });
  await github('git/refs/heads/main', 'PATCH', { sha: next.sha, force: false });
  return {
    status: a.status === 'draft' ? 'draft_saved' : 'deploy_pending', slug: a.slug, fingerprint, commitSha: next.sha, warnings,
    articleUrl: a.status === 'published' ? `https://hiennuongfarm.vn/chuyen-nha-nam/${a.slug}/` : null,
    message: a.status === 'draft' ? 'Đã lưu nháp trong GitHub; bài chưa công khai.' : 'Đã lưu bài và ảnh trong GitHub; cần kiểm tra deploy trước khi nói bài đã lên web.',
  };
}

export async function publicationStatus(sha, github) {
  if (!/^[a-f0-9]{40}$/.test(sha)) throw new InputError('Commit SHA không hợp lệ.');
  const result = await github(`actions/workflows/deploy-pages.yml/runs?head_sha=${sha}&per_page=5`);
  if (!result) throw new InputError('Không đọc được workflow deploy.', 502);
  const run = result.workflow_runs?.filter(r => r.head_sha === sha).sort((a, b) => b.id - a.id)[0];
  if (!run) return { status: 'deploy_pending', message: 'Chưa thấy workflow deploy cho commit này.' };
  return { status: run.status !== 'completed' ? 'deploy_pending' : run.conclusion === 'success' ? 'deployed' : 'deploy_failed', conclusion: run.conclusion, workflowUrl: run.html_url };
}
