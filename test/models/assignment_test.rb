require 'test_helper'

class AssignmentTest < ActiveSupport::TestCase
  # Test relationships
  should belong_to(:employee)
  should belong_to(:store)
  should have_many(:shifts)

  # Test basic validations
  # for pay level
  should allow_value(1).for(:pay_level)
  should allow_value(2).for(:pay_level)
  should allow_value(3).for(:pay_level)
  should allow_value(4).for(:pay_level)
  should allow_value(5).for(:pay_level)
  should allow_value(6).for(:pay_level)
  should_not allow_value("bad").for(:pay_level)
  should_not allow_value(0).for(:pay_level)
  should_not allow_value(7).for(:pay_level)
  should_not allow_value(2.5).for(:pay_level)
  should_not allow_value(-2).for(:pay_level)
  # for start date
  should allow_value(7.weeks.ago.to_date).for(:start_date)
  should allow_value(2.years.ago.to_date).for(:start_date)
  should_not allow_value(1.week.from_now.to_date).for(:start_date)
  should_not allow_value("bad").for(:start_date)
  should_not allow_value(nil).for(:start_date)

  # Need to do the rest with a context
  context "Creating a context for assignments" do
    setup do
      create_stores
      create_employees
      create_assignments
    end

    teardown do
      remove_stores
      remove_employees
      remove_assignments
    end

    should "have a scope 'for_store' that works" do
      assert_equal 4, Assignment.for_store(@cmu.id).size
      assert_equal 1, Assignment.for_store(@oakland.id).size
    end

    should "have a scope 'for_employee' that works" do
      assert_equal 2, Assignment.for_employee(@ben.id).size
      assert_equal 1, Assignment.for_employee(@kathryn.id).size
    end

    should "have a scope 'for_pay_level' that works" do
      assert_equal 2, Assignment.for_pay_level(1).size
      assert_equal 0, Assignment.for_pay_level(2).size
      assert_equal 2, Assignment.for_pay_level(3).size
      assert_equal 1, Assignment.for_pay_level(4).size
    end

    should "have a scope 'for_role' that works" do
      assert_equal 2, Assignment.for_role("employee").size
      assert_equal 3, Assignment.for_role("manager").size
    end

    should "have all the assignments listed alphabetically by store name" do
      assert_equal ["CMU", "CMU", "CMU", "CMU", "Oakland"], Assignment.by_store.map{|a| a.store.name}
    end

    should "have all the assignments listed chronologically by start date" do
      assert_equal ["Ben", "Kathryn", "Ed", "Cindy", "Ben"], Assignment.chronological.map{|a| a.employee.first_name}
    end

    should "have all the assignments listed alphabetically by employee name" do
      assert_equal ["Crawford", "Gruberman", "Janeway", "Sisko", "Sisko"], Assignment.by_employee.map{|a| a.employee.last_name}
    end

    should "have a scope to find all current assignments for a store or employee" do
      assert_equal 2, Assignment.current.for_store(@cmu.id).size
      assert_equal 1, Assignment.current.for_store(@oakland.id).size
      assert_equal 1, Assignment.current.for_employee(@ben.id).size
      assert_equal 0, Assignment.current.for_employee(@ed.id).size
    end

    should "have a scope to find all past assignments for a store or employee" do
      assert_equal 2, Assignment.past.for_store(@cmu.id).size
      assert_equal 0, Assignment.past.for_store(@oakland.id).size
      assert_equal 1, Assignment.past.for_employee(@ben.id).size
      assert_equal 0, Assignment.past.for_employee(@cindy.id).size
    end

    should "allow for a end date in the past (or today) but after the start date" do
      # Note that we've been testing end_date: nil for a while now so safe to assume works...
      @assign_alex = FactoryGirl.build(:assignment, employee: @alex, store: @oakland, start_date: 3.months.ago.to_date, end_date: 1.month.ago.to_date)
      assert @assign_alex.valid?
      @second_assignment_for_alex = FactoryGirl.build(:assignment, employee: @alex, store: @oakland, start_date: 3.weeks.ago.to_date, end_date: Date.current)
      assert @second_assignment_for_alex.valid?
    end

    should "not allow for a end date in the future or before the start date" do
      # since Ed finished his last assignment a month ago, let's try to assign the lovable loser again ...
      @second_assignment_for_ed = FactoryGirl.build(:assignment, employee: @ed, store: @oakland, start_date: 2.weeks.ago.to_date, end_date: 3.weeks.ago.to_date)
      deny @second_assignment_for_ed.valid?
      @third_assignment_for_ed = FactoryGirl.build(:assignment, employee: @ed, store: @oakland, start_date: 2.weeks.ago.to_date, end_date: 3.weeks.from_now.to_date)
      deny @third_assignment_for_ed.valid?
    end

    should "identify a non-active store as part of an invalid assignment" do
      inactive_store = FactoryGirl.build(:assignment, store: @hazelwood, employee: @ed, start_date: 1.day.ago.to_date, end_date: nil)
      deny inactive_store.valid?
    end

    should "identify a non-active employee as part of an invalid assignment" do
      @fred = FactoryGirl.build(:employee, first_name: "Fred", active: false)
      inactive_employee = FactoryGirl.build(:assignment, store: @oakland, employee: @fred, start_date: 1.day.ago.to_date, end_date: nil)
      deny inactive_employee.valid?
    end

    should "end the current assignment if it exists before adding a new assignment for an employee" do
      @promote_kathryn = FactoryGirl.create(:assignment, employee: @kathryn, store: @oakland, start_date: 1.day.ago.to_date, end_date: nil, pay_level: 4)
      assert_equal 1.day.ago.to_date, @kathryn.assignments.first.end_date
      @promote_kathryn.destroy
    end

    should "allow an assignment with no past shifts to be destroyed" do 
      create_upcoming_shifts
      assert @assign_cindy.shifts.past.empty?
      assert @assign_cindy.destroy
      remove_upcoming_shifts
    end

    should "allow a destroyable assignment has upcoming shifts removed" do 
      create_upcoming_shifts
      deny Shift.for_employee(@cindy.id).empty?
      assert @assign_cindy.destroy
      assert Shift.for_employee(@cindy.id).empty?
      remove_upcoming_shifts  
    end

    should "not allow an assignment with past shifts to be destroyed" do 
      create_past_shifts
      deny @assign_ed_2.shifts.past.empty?
      deny @assign_ed_2.destroy
      remove_past_shifts
    end

    should "remove upcoming shifts from an assignment that was attempted to be destroyed" do 
      create_shifts
      deny Shift.for_employee(@kathryn.id).upcoming.empty?
      deny @assign_kathryn.destroy
      assert Shift.for_employee(@kathryn.id).upcoming.empty?
      remove_shifts  
    end

    should "remove upcoming shifts from an assignment that was ended" do 
      create_shifts
      deny @assign_kathryn.shifts.upcoming.empty?
      @assign_kathryn.end_date = Date.current
      @assign_kathryn.save
      @assign_kathryn.reload
      assert @assign_kathryn.shifts.upcoming.empty?
      remove_shifts      
    end

  end
end
