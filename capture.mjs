import { execSync } from 'child_process';
import { createServer } from 'http';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';

const PORT = 4336;
const DIR = './dist-qa';

const server = createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  if (url.endsWith('/')) url += 'index.html';
  try {
    const p = join(DIR, url);
    const s = statSync(p);
    if (s.isFile()) {
      res.writeHead(200);
      res.end(readFileSync(p));
      return;
    }
  } catch (e) {}
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, async () => {
  console.log(`Server on ${PORT}`);
  try {
    execSync(`npx -y playwright install chromium`);
    const code = `
      const { chromium } = require('playwright');
      (async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('http://127.0.0.1:${PORT}/');
        await page.waitForLoadState('networkidle');
        const hero = await page.$('.hero');
        await hero.screenshot({ path: 'hero-polish-1440.png' });
        
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('http://127.0.0.1:${PORT}/');
        await page.waitForLoadState('networkidle');
        const hero2 = await page.$('.hero');
        await hero2.screenshot({ path: 'hero-polish-390.png' });
        
        await browser.close();
      })();
    `;
    import('fs').then(fs => {
      fs.writeFileSync('pw.js', code);
      execSync('npx -y playwright test || node pw.js', { stdio: 'inherit' });
      fs.unlinkSync('pw.js');
    });
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
    process.exit(0);
  }
});
