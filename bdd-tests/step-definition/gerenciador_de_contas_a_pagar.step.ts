import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { Frame } from "playwright";

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;

async function waitForFramesAndLoad(page: any) {
  await page.waitForSelector("frameset");
  await page.waitForLoadState("domcontentloaded");
}

Given(
  "que eu estou logado no sistema",
  { timeout: 60000 },
  async function (this: ICustomWorld) {
    await this.page!.fill('input[name="user"]', `${MK_USER}`);
    await this.page!.fill('input[name="password"]', `${MK_PASSWORD}`);
    await this.page!.click('button[name="user"]');
  }
);

Given("estou na tela inicial do sistema", async function (this: ICustomWorld) {
  await waitForFramesAndLoad(this.page);
});

Given(
  "eu clico na moeda do Financeiro",
  { timeout: 30000 },
  async function (this: ICustomWorld) {
    await waitForFramesAndLoad(this.page);
    const mainFrame = this.page?.frames().find((frame: Frame) => frame.name() === "mainsystem");
    if (mainFrame) {
      try {
        const mainForm = mainFrame.frameLocator('iframe[name="mainform"]');
        await mainForm?.getByTitle("Financeiro").click();
      } catch (error) {
        console.error("Erro ao clicar na moeda de configuração: ", error);
      }
    } else {
      console.error("Frame principal não encontrado.");
    }
  }
);

Given(
  "eu clico na aba no menu do Gerenciador de Contas a Pagar",
  { timeout: 30000 },
  async function (this: ICustomWorld) {
    await waitForFramesAndLoad(this.page);
    const expectedFrame = this.page?.frames().find((frame: Frame) => frame.name() === "mainsystem")?.frameLocator('mainform').frameLocator('URLFrame6170976').frameLocator('mainform');
    if (expectedFrame) { 
      console.log("Frame encontrado: ", expectedFrame);
      await expectedFrame?.getByTitle("Gerenciador de Contas a Pagar").click();
    } else {
      throw new Error("Frame principal não encontrado.");
    }
  }
);
