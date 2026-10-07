const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  
  const getPos = async (width, height) => {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://127.0.0.1:4321/');
    await page.waitForLoadState('networkidle');
    const info = await page.evaluate(() => {
      const scrim = document.querySelector('.hero__scrim').getBoundingClientRect();
      const sub = document.querySelector('.hero__sub').getBoundingClientRect();
      const head = document.querySelector('.hero__title').getBoundingClientRect();
      return {
        scrim: { w: scrim.width, h: scrim.height },
        head: { cx: (head.left + head.width/2)/scrim.width, cy: (head.top + head.height/2)/scrim.height },
        sub: { cx: (sub.left + sub.width/2)/scrim.width, cy: (sub.top + sub.height/2)/scrim.height, w: sub.width/scrim.width, h: sub.height/scrim.height }
      };
    });
    await page.close();
    return info;
  };

  try {
    const d = await getPos(1440, 900);
    console.log('1440:', d);
    const m = await getPos(390, 844);
    console.log('390:', m);
  } catch (e) {
    console.log(e);
  }
  await browser.close();
})();
