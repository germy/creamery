Feature: Extra Tests
  As an professor
  I want to be able to verify students have considered additional cases
  So I can be sure they are learning and thinking

  
  # No error or display when there are no assigned employees
  Scenario: View Bistro details (no current assignments)
    Given an initial setup
    When I go to the Bistro details page
    Then I should see "Address: "
    And I should see "325 East Ohio"
    And I should see "Pittsburgh, PA 15212"
    And I should not see "Liu, Angela"
    And I should not see "Pay"
    And I should not see "Current Employees"
    

  # No error or display when there are no assignment history
  Scenario: View details for Mark (no assignment history)
    Given an initial setup
    When I go to the details on Mark Heimann
    Then I should see "Heimann, Mark"
    And I should see "Phone: 724-713-3333"
    And I should not see "Phone: 7247133333"
    And I should not see "Phone: 4122684209"
    And I should see "Date of Birth: 01/25/93"
    And I should not see "Date of birth: 1993-01-25"
    And I should see "SSN: 084213091"
    And I should see "Active: Yes"
    And I should not see "Pay"
    And I should not see "Dates"
    And I should not see "Start"
    And I should not see "End"
    
  # No error or display when no employees yet
  Scenario: View details when only stores
    Given only stores
    When I go to the home page
    And I click on the link "Stores"
    Then I should see "Current Stores"
    And I should see "CMU"
    And I click on the link "Employees"
    Then I should not see "Name"
    And I should not see "Phone"
    
  # Can see inactive stores
  Scenario: It is possible to view inactive stores
    Given only stores
    When I go to the home page
    And I click on the link "Stores"
    Then I should see "Hazelwood"
    And I should see "CMU"

  # No error if employee has no phone (not required)
  Scenario: Employee with no phone is still viewable
    Given an initial setup
    When I go to details on Melanie Freeman
    Then I should see "Freeman, Melanie"
    And I should see "Phone"
    And I should see "SSN: 084359855"
    And I should see "Role: Manager"
    And I should see "Active: Yes"
    And I should see "Assignment History"
    And I should see "Convention Center"
    And I should not see "ID"
    And I should not see "_id"
    And I should not see "Created"
