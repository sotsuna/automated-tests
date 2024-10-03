import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { Frame } from "playwright";
import { expect } from "playwright/test";

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

    await this.page?.locator('#lay').locator('div#PainelMenu')
    .locator('div#PainelMenuPrincipal').locator('ul#ulPainelMenu0').locator('li#1878993')

    // Primeiro, capture o frame principal
    const mainSystemFrame = this.page?.frame({ name: "mainsystem" });
    if (!mainSystemFrame) throw new Error("Frame principal 'mainsystem' não encontrado.");

    // Depois, capture o próximo frame dentro do mainSystemFrame
    const urlFrame = mainSystemFrame?.frameLocator('iframe[name="URLFrame6170976"]');
    if (!urlFrame) throw new Error("Frame 'URLFrame6170976' não encontrado.");

    // Agora, dentro do URLFrame, capture o frame final onde o botão está localizado
    const mainFormFrame = urlFrame?.frameLocator('iframe[name="mainform"]');
    if (!mainFormFrame) throw new Error("Frame 'mainform' não encontrado.");


    // Por fim, localize e clique no elemento desejado
    const elementHandle = mainFormFrame?.frameLocator('iframe[name="URLFrame3777425"]')
    const elementClicable = elementHandle.locator('li#1878993')
    expect(elementClicable).toBeVisible()      
    elementClicable.click({force: true})
    await this.page?.waitForTimeout(20000)
    if (!elementHandle) throw new Error("Elemento 'Gerenciador de Contas a Pagar' não encontrado.");
  }
);
