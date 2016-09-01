# require needed files

require './test/sets/store_contexts'
require './test/sets/employee_contexts'
require './test/sets/assignment_contexts'
require './test/sets/user_contexts'
require './test/sets/shift_contexts'
require './test/sets/job_contexts'
require './test/sets/shift_job_contexts'
require './test/sets/flavor_contexts'
require './test/sets/store_flavor_contexts'

module Contexts
  # explicitly include all sets of contexts used for testing 
  include Contexts::StoreContexts
  include Contexts::EmployeeContexts
  include Contexts::AssignmentContexts
  include Contexts::UserContexts
  include Contexts::ShiftContexts
  include Contexts::JobContexts
  include Contexts::ShiftJobContexts
  include Contexts::FlavorContexts
  include Contexts::StoreFlavorContexts

  # create a method that builds all the unit testing contexts
  # all at once, in their proper order
  def build_unit_test_contexts
    create_stores
    create_employees
    create_assignments
    create_jobs
    create_shifts
    create_shift_jobs
    create_flavors
    create_store_flavors
  end

  def remove_unit_test_contexts
    remove_stores
    remove_employees
    remove_assignments
    remove_jobs
    remove_shifts
    remove_shift_jobs
    remove_flavors
    remove_store_flavors
  end

end