import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;
const MK_ENV = process.env.MK_ENV;

Given(
  "que eu estou logado no sistema",
  { timeout: 60000 },
  async function (this: ICustomWorld) {
    // Acessa a página do sistema com a URL do ambiente
    await this.page!.goto(`${MK_ENV}`);

    // Preenche os campos de usuário e senha
    await this.page!.fill('input[name="user"]', `${MK_USER}`);
    await this.page!.fill('input[name="password"]', `${MK_PASSWORD}`);

    // Clica no botão de login
    await this.page!.click('button[name="user"]');
  }
);

Given("estou na tela inicial do sistema", async function (this: ICustomWorld) {
  // Aguarda o carregamento dos frames na página
  await this.page!.waitForSelector("frameset");
  await this.page!.waitForLoadState("domcontentloaded");
});

Given(
  "eu clico na moeda de configuração",
  { timeout: 30000 },
  async function (this: ICustomWorld) {
    await this.page!.waitForSelector("frameset");
    await this.page!.waitForLoadState("domcontentloaded");
    await this.page!.waitForLoadState("load");
    try {
      const frames = this.page!.frames();
      const mainFrame = frames.find((frame) =>
        frame.name().includes("mainsystem")
      );
      const mainForm = mainFrame?.frameLocator('iframe[name="mainform"]');
      try {
        await mainForm?.getByTitle("Financeiro").click();
      } catch (error) {
        console.log("Erro ao clicar na moeda de configuração: ", error);
      }
    } catch (error: any) {
      console.error(
        `Erro ao clicar na moeda de configuração: ${error.message}`
      );
    }
  }
);

Given(
  "eu clico na aba de perfis de contrato",
  { timeout: 30000 },
  async function (this: ICustomWorld) {
    await this.page!.waitForLoadState('domcontentloaded');
    try {
      const frames = this.page!.frames();
      const mainFrame = frames.find((frame) =>
        frame.name().includes("mainsystem")
      );
      const mainForm = mainFrame?.frameLocator('iframe[name="mainform"]');
      const mainForm2 = mainForm?.frameLocator('iframe[id="URLFrame6802985"]');
      const mainForm3 = mainForm2?.frameLocator('iframe[name="mainform"]');
      try {
        if (mainForm3) {
          await mainForm3?.locator('a[title="Gerenciador de Contas a Pagar"]').click();
        } else {
          console.log("Erro ao clicar na aba de perfis de contrato");
        }
      } catch (error) {
        console.log("Erro ao clicar na moeda de configuração: ", error);
      }
    } catch (error: any) {
      console.error(
        `Erro ao clicar na moeda de configuração: ${error.message}`
      );
    }
  }
);
