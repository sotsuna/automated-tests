@configuracao_perfildecontrato
Feature: Gerenciador de Contas a Pagar
  Description: Como um usuário do sistema
  Eu quero acessar o Gerenciador de Contas a Pagar
  Para visualizar as informações das contas

  Background:
  Given que eu estou logado no sistema
  And estou na tela inicial do sistema

  Scenario: Visualizar Gerenciador de Contas a Pagar
    Given eu clico na moeda do Financeiro
    And eu clico na aba no menu do Gerenciador de Contas a Pagar
    Then eu devo visualizar as informações do contrato
    