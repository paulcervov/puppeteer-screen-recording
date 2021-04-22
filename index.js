const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 1280,
            height: 720,
        },
    });
    const page = await browser.newPage();
    await page.goto('https://mail.ru', {
        waitUntil: 'networkidle2'
    });
    await page.screenshot({
        path: `screenshots/${Date.now()}.jpg`,
        type: "jpeg",
        quality: 50,
        fullPage: true
    });

    await browser.close();
})();
