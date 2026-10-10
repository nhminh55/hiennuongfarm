// @ts-check
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { defineConfig } from 'astro/config';
import yaml from 'js-yaml';

/**
 * `import data from './x.md?data'` gives just the frontmatter of a content
 * file as a plain object. The farm-play games use it to take their text into
 * browser scripts without bundling Astro's Markdown runtime; a slip in the
 * YAML stops the build with the file name.
 * @returns {import('vite').Plugin}
 */
function markdownData() {
  const prefix = '\0md-data:';
  return {
    name: 'markdown-data',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith('.md?data')) return null;
      const resolved = await this.resolve(source.slice(0, -'?data'.length), importer, { skipSelf: true });
      // The id must not end in .md, or Astro's Markdown plugin loads it.
      return resolved && prefix + resolved.id + '.js';
    },
    load(id) {
      if (!id.startsWith(prefix)) return null;
      const file = id.slice(prefix.length, -'.js'.length);
      this.addWatchFile(file);
      const name = relative(process.cwd(), file).replaceAll('\\', '/');
      const match = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n?---/);
      if (!match) throw new Error(`${name}: thiếu phần --- ở đầu file`);
      let data;
      try { data = yaml.load(match[1]); } catch (e) { throw new Error(`${name}: ${/** @type {Error} */ (e).message}`); }
      return `export default ${JSON.stringify(data)};`;
    },
  };
}

export default defineConfig({
  site: 'https://hiennuongfarm.vn',
  devToolbar: { enabled: false },
  // Dấu ấn has no landing page; its first page stands in for the address.
  redirects: { '/dau-an': '/dau-an/bao-chi/' },
  vite: { plugins: [markdownData()] },
});
