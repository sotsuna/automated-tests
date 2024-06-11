Feature: Login in MK ERP

  Scenario: Login with valid credentials
    Given I am on the login page
    And I fill in the username field with <string>
    And I fill in the password field with <string>
    When I press "Login"
    Then I should see the main navbar