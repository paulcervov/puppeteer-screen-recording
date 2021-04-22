const { launch, getStream }  = require("puppeteer-stream");
const fs = require("fs");

const file = fs.createWriteStream(`video/${Date.now()}.webm`);

async function test() {

    const browser = await launch({
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720,
    });

    await page.goto("https://dl8.webmfiles.org/big-buck-bunny_trailer.webm");
    const stream = await getStream(page, { audio: true, video: true });
    console.log("Recording...");
    stream.pipe(file);

    setTimeout(async () => {
        await stream.destroy();
        file.close();
        console.log("Finished.");
    }, 1000 * 32);
}

test();
