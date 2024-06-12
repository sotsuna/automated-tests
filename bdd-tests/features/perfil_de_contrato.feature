@configuracao_perfildecontrato
Feature: Perfil de Contrato
  Description: Como um usuário do sistema
  Eu quero acessar o perfil de contrato
  Para visualizar as informações do contrato

  Background:
  Given que eu estou logado no sistema
  And estou na tela inicial do sistema

  Scenario: Visualizar perfil de contrato
    Given eu clico na moeda de configuração
    And eu clico na aba de perfis de contrato
    And eu clico sobre um contrato para editá-lo
    Then eu devo visualizar as informações do contrato
    