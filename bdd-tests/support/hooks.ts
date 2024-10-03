import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, ChromiumBrowser } from '@playwright/test';
import { ICustomWorld } from './custom-world';
require ('dotenv').config();

declare global {
    var browser: ChromiumBrowser;
}

BeforeAll(async function () {
    global.browser = await chromium.launch({
        headless: false,
        slowMo: 2000,
        devtools: true, 
        logger: {
            isEnabled: (name, severity) => name === 'browser',
            log: (name, severity, message) => console.log(`[${name}] ${message}`)
        },
        args: ["--start-maximized"]
    });
});

// AfterAll(async function () {
//     await global.browser.close();
// });

Before(async function (this: ICustomWorld) {
    this.context = await global.browser.newContext();
    this.page = await this.context?.newPage();
    this.page.goto(`${process.env.MK_ENV}`);
});

After(async function (this: ICustomWorld) {
    await this.page?.screenshot({ path: `screenshots/screenshot-${Date.now()}.png` });
});