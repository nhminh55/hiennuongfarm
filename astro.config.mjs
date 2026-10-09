// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hiennuongfarm.vn',
  devToolbar: { enabled: false },
  // Dấu ấn has no landing page; its first page stands in for the address.
  redirects: { '/dau-an': '/dau-an/bao-chi/' },
});
