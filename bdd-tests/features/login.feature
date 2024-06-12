@authentication
Feature: Login in MK ERP

  @login
  Scenario: Login with valid credentials
    Given I am on the login page
    And I fill in the username field with <string>
    And I fill in the password field with <string>
    When I press <button>
    Then I should see the main form