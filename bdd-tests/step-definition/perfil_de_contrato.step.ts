import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';

const MK_USER = process.env.MK_USER;
const MK_PASSWORD = process.env.MK_PASSWORD;
const MK_ENV = process.env.MK_ENV;

const mainFrameUrl = "open.do?sys=MK0";

// Função reutilizável para procurar frames, pode ser movida para outro arquivo no futuro
async function procurarFrames(this: ICustomWorld, urlFrameRequisitado: string) {
  const frames = await this.page!.frames();
  const frame = frames.find(f => f.url().includes(urlFrameRequisitado));
  if (!frame) {
    throw new Error(`Frame com URL '${urlFrameRequisitado}' não encontrado`);
  }
  return frame;
}

Given('que eu estou logado no sistema', async function (this: ICustomWorld) {
  // Acessa a página do sistema com a URL do ambiente
  await this.page!.goto(`${MK_ENV}`);
  
  // Preenche os campos de usuário e senha
  await this.page!.fill('input[name="user"]', `${MK_USER}`);
  await this.page!.fill('input[name="password"]', `${MK_PASSWORD}`);
  
  // Clica no botão de login
  await this.page!.click('button[name="user"]');
});

Given('estou na tela inicial do sistema', async function (this: ICustomWorld) {
  // Aguarda o carregamento dos frames na página
  await this.page!.waitForSelector('frameset');
  await this.page!.waitForLoadState('domcontentloaded');
});

Given('eu clico na moeda de configuração', { timeout: 60000 }, async function (this: ICustomWorld) {
  try {
    await this.page!.waitForLoadState('load');
    // Procura o frame principal da aplicação com a URL especificada
    const mainFrame = await procurarFrames.call(this, mainFrameUrl);
    
    // Loga o frame encontrado para verificação
    console.log(mainFrame);
    
    // Exemplo de ação dentro do frame: clique em um botão de configuração
    const mainSystem = mainFrame?.frameLocator('mainsystem');
    const mainForm = mainSystem?.frameLocator('mainform');
    const configButton = mainForm?.getByTitle('Configurações');
    if (configButton) {
      console.log('cliclado papai')
      await configButton.click();
    } else {
      throw new Error('Botão de configuração não encontrado');
    }
  } catch (error: any) {
    console.error(`Erro ao clicar na moeda de configuração: ${error.message}`);
  }
});
