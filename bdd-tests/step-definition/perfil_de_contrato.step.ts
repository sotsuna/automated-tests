import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';


Given('que eu estou logado no sistema', async function (this: ICustomWorld) {
  await this.page!.goto('http://172.0.0.234:8313/mk/login/?sys=MK0');
  await this.page!.fill('input[name="user"]', 'marco.kist');
  await this.page!.fill('input[name="password"]', 'Mart0123!');
  await this.page!.click('button[name="user"]');
});

Given('estou na tela inicial do sistema', {timeout: 2 * 5000}, async function (this: ICustomWorld) {
  const mainFrame = await this.page!.frame({url: 'http://172.0.0.234:8313/mk/form.jsp?sys=MK0&action=openform&formID=8267&align=0&mode=-1&goto=-1&filter=&scrolling=False&firstLoad=true'});
  if (mainFrame) {
    await mainFrame.waitForSelector('title');
  }
});

Given('eu clico na moeda de configuração', async function (this: ICustomWorld) {
  await this.page!.locator('///html/body/form[1]/div/div[3]/div[1]/div/ul/li[9]/a').click();
});