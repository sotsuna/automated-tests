import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;

async function waitForFramesAndLoad(page: any) {
  await page.waitForSelector("frameset");
  await page.waitForLoadState("domcontentloaded");
}

function getMainFrame(page: any) {
  const frames = page.frames();
  return frames.find((frame: any) => frame.name().includes("mainsystem"));
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
    const mainFrame = getMainFrame(this.page);
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
    const mainFrame = getMainFrame(this.page);
    if (mainFrame) {
      try {
        const frameLayer1 = mainFrame.frameLocator('iframe[name="mainform"]');
        console.log('\n Mainform: \n', frameLayer1);
        const frameLayer2 = frameLayer1.frameLocator('iframe[id="URLFrame6170976"]');
        console.log('\n URLFrame6170976: \n', frameLayer2);
        const frameLayer3 = frameLayer2.frameLocator('iframe[name="mainform"]');
        console.log('\n Mainform 2: \n', frameLayer3);
        // await frameLayer3?.locator('a').click();
      } catch (error) {
        console.error("Erro ao clicar na aba do gerenciador de contas a pagar ", error);
      }
    } else {
      console.error("Frame principal não encontrado.");
    }
  }
);
