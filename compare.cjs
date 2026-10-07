const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://127.0.0.1:4321/');
    await page.waitForLoadState('networkidle');
    const st = await page.evaluate(() => {
      const scrim = document.querySelector('.hero__scrim');
      const content = document.querySelector('.hero__content');
      const title = document.querySelector('.hero__title');
      return {
        scrimBg: window.getComputedStyle(scrim).background,
        contentTransform: window.getComputedStyle(content).transform,
        titleSize: window.getComputedStyle(title).fontSize
      };
    });
    console.log('4321 Styles:', st);
  } catch(e) {
    console.log('Error:', e.message);
  }
  await browser.close();
})();
