import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
require('dotenv').config();

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;
const MK_ENV = process.env.MK_ENV;

Given('I am on the login page', {timeout: 60000},async function (this: ICustomWorld) {
    await this.page!.goto(`${MK_ENV}`);
});

Given('I fill in the username field with <string>', {timeout: 60000}, async function (this: ICustomWorld) {
    await this.page!.fill('input[name="user"]', `${MK_USER}`);
});

Given('I fill in the password field with <string>', {timeout: 60000}, async function (this: ICustomWorld) {
    await this.page!.fill('input[name="password"]', `${MK_PASSWORD}`);
});

When('I press <button>', {timeout: 60000}, async function (this: ICustomWorld) {
    await this.page!.click('button[name="user"]');
});

Then('I should see the main form', {timeout: 60000}, async function (this: ICustomWorld) { 
    await this.page!.mainFrame();
});