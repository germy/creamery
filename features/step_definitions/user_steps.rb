require './test/contexts'
include Contexts

Given /^an initial setup$/ do
  # context used for phase 3 only
  create_stores
  create_employees
  create_assignments
  create_additional_stores
  create_additional_employees
  create_additional_assignments
end

Given /^no setup yet$/ do
  # assumes initial setup already run as background
  remove_stores
  remove_employees
  remove_assignments
  remove_additional_stores
  remove_additional_employees
  remove_additional_assignments
end

# Remove, only for level_4 features
Given /^only stores$/ do
  # Stores only, no employees or assignments
  create_stores
end
