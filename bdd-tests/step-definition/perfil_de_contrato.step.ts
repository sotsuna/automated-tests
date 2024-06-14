import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';

Given('que eu estou logado no sistema', { timeout: 2 * 5000 }, async function (this: ICustomWorld) {
  await this.page!.goto('http://172.0.0.234:8313/mk/login');
  await this.page!.fill('input[name="user"]', '');
  await this.page!.fill('input[name="password"]', '');
  await this.page!.click('button[name="user"]');
});

Given('estou na tela inicial do sistema', { timeout: 2 * 5000 }, async function (this: ICustomWorld) {
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    this.page?.frameLocator(
      '//html/frameset/frame'
    );
  } catch (error: any) {
    console.log(error);
  }
})

Given('eu clico na moeda de configuração', { timeout: 5000 * 3 }, async function (this: ICustomWorld) {
  try {
    const configButton = this.page?.frameLocator(
      '//html/frameset/frame'
    ).frameLocator('//html/body/iframe').locator('//html/body/form[1]/div/div[3]/div[1]/div/ul/li[9]/a');
    await configButton?.click();
    console.log(configButton);
  } catch (error: any) {
    console.log(error);
  };

});