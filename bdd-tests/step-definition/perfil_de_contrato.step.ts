import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;
const MK_ENV = process.env.MK_ENV;

// Função auxiliar para esperar por frames e carregamento da página
async function waitForFramesAndLoad(page: any) {
  await page.waitForSelector("frameset");
  await page.waitForLoadState("domcontentloaded");
}

// Função auxiliar para obter o frame principal
function getMainFrame(page: any) {
  const frames = page.frames();
  return frames.find((frame: any) => frame.name().includes("mainsystem"));
}

Given(
  "que eu estou logado no sistema",
  { timeout: 60000 },
  async function (this: ICustomWorld) {
    await this.page!.goto(`${MK_ENV}`);
    await this.page!.fill('input[name="user"]', `${MK_USER}`);
    await this.page!.fill('input[name="password"]', `${MK_PASSWORD}`);
    await this.page!.click('button[name="user"]');
  }
);

Given("estou na tela inicial do sistema", async function (this: ICustomWorld) {
  await waitForFramesAndLoad(this.page);
});

Given(
  "eu clico na moeda de configuração",
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
  "eu clico na aba de perfis de contrato",
  { timeout: 30000 },
  async function (this: ICustomWorld) {
    await waitForFramesAndLoad(this.page);
    const mainFrame = getMainFrame(this.page);
    if (mainFrame) {
      try {
        const mainForm = mainFrame.content();
        console.log(mainForm); // Este log parece ser temporário, pode ser removido se não for necessário
        // Código adicional para interação com o mainForm aqui, se necessário
      } catch (error) {
        console.error("Erro ao clicar na aba de perfis de contrato: ", error);
      }
    } else {
      console.error("Frame principal não encontrado.");
    }
  }
);
