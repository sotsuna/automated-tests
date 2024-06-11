import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';

Given('I am on the login page', async function (this: ICustomWorld) {
    await this.page!.goto('http://172.0.0.234:8313/mk/login/?sys=MK0');
});

Given('I fill in the username field with <string>', async function (this: ICustomWorld) {
    await this.page!.fill('input[name="user"]', 'marco.kist');
});

Given('I fill in the password field with <string>', async function (this: ICustomWorld) {
    await this.page!.fill('input[name="password"]', 'Mart0123!');
});

When('I press "Login"', async function (this: ICustomWorld) {
    await this.page!.click('button[name="user"]');
});

Then('I should see the main navbar', async function (this: ICustomWorld) {
    await this.page!.waitForSelector('div[id="menuprincipal"]')
});