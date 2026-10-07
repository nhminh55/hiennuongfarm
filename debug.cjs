const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Expose a function to catch when the element disappears
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://127.0.0.1:4336/');
  
  console.log("Waiting for network idle...");
  await page.waitForLoadState('networkidle');
  
  const check = async (label) => {
    try {
      const info = await page.evaluate(() => {
        const el = document.querySelector('.hero__annotation');
        if (!el) return 'Not found in DOM';
        const st = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          display: st.display,
          opacity: st.opacity,
          visibility: st.visibility,
          zIndex: st.zIndex,
          position: st.position,
          top: st.top,
          classList: el.className,
          parentClassList: el.parentElement.className,
          rect: `${rect.width}x${rect.height} at ${rect.x},${rect.y}`,
          html: el.outerHTML.substring(0, 50) + '...'
        };
      });
      console.log(`\n--- ${label} ---`);
      console.log(info);
    } catch(e) {
      console.log(label, "Error:", e.message);
    }
  };

  await check('After Load');
  
  console.log("\nWaiting 3 seconds...");
  await page.waitForTimeout(3000);
  await check('After 3 seconds');
  
  // Find what is covering it
  const covered = await page.evaluate(() => {
     const el = document.querySelector('.hero__annotation');
     if (!el) return null;
     const rect = el.getBoundingClientRect();
     // Check center of the element
     const topEl = document.elementFromPoint(rect.x + rect.width/2, rect.y + rect.height/2);
     return topEl ? topEl.className : 'null';
  });
  console.log("\nElement on top of it:", covered);
  
  await browser.close();
})();
