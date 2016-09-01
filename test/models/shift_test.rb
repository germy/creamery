require 'test_helper'

class ShiftTest < ActiveSupport::TestCase
  should belong_to(:assignment)
  should have_many(:shift_jobs)
  should have_many(:jobs).through(:shift_jobs)
  should have_one(:employee).through(:assignment)
  should have_one(:store).through(:assignment)

  should allow_value(Time.now).for(:start_time)
  should allow_value(1.hour.from_now).for(:start_time)
  should allow_value(2.hours.ago).for(:start_time)
  should_not allow_value("fred").for(:start_time)
  should_not allow_value(3.14159).for(:start_time)
  should_not allow_value(nil).for(:start_time)

  context "Creating a context for shifts" do
    setup do 
      create_stores
      create_employees
      create_assignments
      create_shifts
    end
    
    teardown do
      remove_stores
      remove_employees
      remove_assignments
      remove_shifts
    end
    
    # test the scope 'chronological'
    should "have a scope to order chronologically" do
      assert_equal ["Ed", "Ed", "Ed", "Kathryn", "Ben", "Kathryn", "Ben", "Cindy"], Shift.chronological.map{|s| s.employee.first_name}
    end
    # test the scope 'by_store'
    should "have a scope to order by store name" do
      assert_equal ["CMU", "CMU", "CMU", "CMU", "CMU", "CMU", "Oakland", "Oakland"], Shift.by_store.map{|s| s.store.name}
    end
    # test the scope 'by_employee'
    should "have a scope to order by employee name" do
      assert_equal ["Crawford, Cindy", "Gruberman, Ed", "Gruberman, Ed", "Gruberman, Ed", "Janeway, Kathryn", "Janeway, Kathryn", "Sisko, Ben", "Sisko, Ben"], Shift.by_employee.map{|s| s.employee.name}
    end
    # test the scope 'past'
    should "have a scope for past shifts" do
      assert_equal 4, Shift.past.size
    end
    # test the scope 'upcoming'
    should "have a scope for upcoming shifts" do
      assert_equal 4, Shift.upcoming.size
    end
    # test the scope 'for_employee'
    should "have a scope called for_employee" do
      assert_equal 2, Shift.for_employee(@ben.id).size
      assert_equal 1, Shift.for_employee(@cindy.id).size
      assert_equal 2, Shift.for_employee(@kathryn.id).size
    end
    # test the scope 'for_store'
    should "have a scope called for_store" do
      assert_equal 6, Shift.for_store(@cmu.id).size
      assert_equal 2, Shift.for_store(@oakland.id).size
    end
    # test the scope 'for_next_days'
    should "have a scope called for_next_days" do
      assert_equal 2, Shift.for_next_days(0).size
      assert_equal 4, Shift.for_next_days(2).size
    end
    # test the scope 'for_past_days'
    should "have a scope called for_past_days" do
      assert_equal 2, Shift.for_past_days(1).size
      assert_equal 3, Shift.for_past_days(2).size
      assert_equal 4, Shift.for_past_days(3).size
    end
    # test the scope 'completed'
    should "have a scope for completed shifts" do
      create_jobs
      create_shift_jobs
      assert_equal 3, Shift.completed.to_a.size
      remove_jobs
      remove_shift_jobs
    end
    # test the scope 'incomplete'
    should "have a scope for incomplete shifts" do
      create_jobs
      create_shift_jobs
      assert_equal 5, Shift.incomplete.to_a.size
      remove_jobs
      remove_shift_jobs    
    end

    # test the class method 'not_complete' (same as scope 'incomplete')
    should "have a class method for find not completed shifts" do
      create_jobs
      create_shift_jobs
      assert_equal 5, Shift.not_completed.to_a.size
      remove_jobs
      remove_shift_jobs    
    end

    # test validation of shift date
    should "only accept date data for date field" do
      @shift_kj_bad = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: "FRED")
      deny @shift_kj_bad.valid?
      @shift_kj_bad2 = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: "14:00:00")
      deny @shift_kj_bad2.valid?
      @shift_kj_bad3 = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: 2015)
      deny @shift_kj_bad3.valid?
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: 2.weeks.ago.to_date)
      assert @shift_kj_good.valid? 
    end
    
    should "not allow date to be nil" do
      @shift_kj_bad = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: nil)
      deny @shift_kj_bad.valid?
    end
    
    should "ensure that shift dates do not precede the assignment start date" do
      @shift_kj_bad = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: 2.years.ago.to_date)
      deny @shift_kj_bad.valid?
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn, date: 2.weeks.ago.to_date)
      assert @shift_kj_good.valid?
    end

    # test validation of end_time
    should "only accept time data for end time" do 
      @shift_kj_bad = FactoryGirl.build(:shift, assignment: @assign_kathryn, end_time: 2015)
      deny @shift_kj_bad.valid?
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn, start_time: Time.local(2000,1,1,12,0,0), end_time: Time.local(2000,1,1,16,0,0))
      assert @shift_kj_good.valid?
    end

    should "allow end time can be nil" do
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn, end_time: nil)
      assert @shift_kj_good.valid?
    end

    should "ensure that shift end times do not precede the shift start time" do
      # default factory is that shifts start at 11am
      @shift_kj_bad = FactoryGirl.build(:shift, assignment: @assign_kathryn, end_time: Time.local(2000,1,1,10,0,0))
      deny @shift_kj_bad.valid?
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn, end_time: Time.local(2000,1,1,14,0,0))
      assert @shift_kj_good.valid?
    end

    # test validation that assignment must be current
    should "ensure that shift are only given to current assignments" do
      @shift_ben_bad = FactoryGirl.build(:shift, assignment: @assign_ben)
      deny @shift_ben_bad.valid?
      @shift_kj_good = FactoryGirl.build(:shift, assignment: @assign_kathryn)
      assert @shift_kj_good.valid?
    end

    # test completed? method
    should "have a completed? method that works properly" do
      create_jobs
      create_shift_jobs
      assert @ed_past_shift1.shift_jobs.empty?
      deny @ed_past_shift1.completed?
      assert_equal 2, @ed_past_shift2.shift_jobs.size
      assert @ed_past_shift2.completed?
      remove_jobs
      remove_shift_jobs
    end
    
    # test callback to see that end_time is set to 3 hours afterwards
    should "have a callback which sets end time to three hours on create, but not on update" do
      # end_time is set on create
      @shift_kj_good = FactoryGirl.create(:shift, assignment: @assign_kathryn, start_time: Time.local(2000,1,1,14,0,0), end_time: nil)
      assert_equal "17:00:00", @shift_kj_good.end_time.strftime("%H:%M:%S")
      # end_time is left alone on update
      assert_equal "14:00:00", @kathryn_shift1.end_time.strftime("%H:%M:%S")
      @kathryn_shift1.notes = "She did a good job today."
      @kathryn_shift1.start_time = Time.local(2000,1,1,12,0,0)
      @kathryn_shift1.save!
      assert_equal "14:00:00", @kathryn_shift1.end_time.strftime("%H:%M:%S")
    end

    # test start_now method
    should "have start_now method that updates database" do 
      @ben_shift1.start_now
      @ben_shift1.reload
      date_shift = Time.current - Time.local(2000,1,1,0,0,0)
      assert_in_delta(Time.current.to_i - date_shift, @ben_shift1.end_time.in_time_zone.to_i, 50000)
    end

    # test end_now method
    should "have end_now method that updates database" do 
      @ben_shift1.end_now
      @ben_shift1.reload
      date_shift = Time.current - Time.local(2000,1,1,0,0,0)
      assert_in_delta(Time.current.to_i - date_shift, @ben_shift1.end_time.in_time_zone.to_i, 50000)
    end

    # test the duration method
    should "correctly calculate the duration of a shift" do 
      assert_equal 3.0, @ben_shift1.duration
      @kathryn_shift1.end_time = "3:30pm".to_time
      assert_equal 4.5, @kathryn_shift1.duration
    end
  end
end
