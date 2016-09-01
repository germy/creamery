require 'test_helper'

class ShiftJobTest < ActiveSupport::TestCase
  should belong_to(:shift)
  should belong_to(:job)
  should validate_presence_of(:shift_id)
  should validate_presence_of(:job_id)

  context "Creating a context for shift_jobs" do
    setup do
      create_stores
      create_employees
      create_assignments
      create_shifts
      create_jobs
    end

    teardown do
      remove_stores
      remove_employees
      remove_assignments
      remove_shifts
      remove_jobs
    end
    should "identify a non-existent shift as part of an invalid shift_job" do
      ghost_shift = FactoryGirl.build(:shift, assignment: @assign_cindy, date: 3.days.from_now.to_date)
      bad_shift_job = FactoryGirl.build(:shift_job, shift: ghost_shift, job: @cashier)
      deny bad_shift_job.valid?
    end

    should "identify a non-active or non-existent job as part of an invalid shift job" do
      inactive_job_on_shift = FactoryGirl.build(:shift_job, shift: @cindy_shift1, job: @mover)
      deny inactive_job_on_shift.valid?
      ghost_job  = FactoryGirl.build(:job, name: "Greeting")
      nonexistent_job_on_shift = FactoryGirl.build(:shift_job, shift: @cindy_shift1, job: ghost_job)
      deny nonexistent_job_on_shift.valid?
    end
  end
end
