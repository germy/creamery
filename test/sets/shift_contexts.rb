module Contexts
  module ShiftContexts
    def create_shifts
      create_upcoming_shifts
      create_past_shifts
    end

    def remove_shifts
      remove_upcoming_shifts
      remove_past_shifts
    end

    def create_upcoming_shifts
      @assign_ed_1    = FactoryGirl.create(:assignment, employee: @ed, store: @cmu, start_date: 1.month.ago.to_date, end_date: nil, pay_level: 2)
      @ed_shift1      = FactoryGirl.create(:shift, assignment: @assign_ed_1)
      @ed_shift2      = FactoryGirl.create(:shift, assignment: @assign_ed_1, date: 1.day.from_now.to_date)
      @ed_shift3      = FactoryGirl.create(:shift, assignment: @assign_ed_1, date: 2.days.from_now.to_date)
      @ben_shift1     = FactoryGirl.create(:shift, assignment: @promote_ben)
      @ben_shift2     = FactoryGirl.create(:shift, assignment: @promote_ben, date: 1.day.from_now.to_date)
      @kathryn_shift1 = FactoryGirl.create(:shift, assignment: @assign_kathryn)
      @cindy_shift1   = FactoryGirl.create(:shift, assignment: @assign_cindy, date: 2.days.from_now.to_date)
    end

    def remove_upcoming_shifts
      @assign_ed_1.delete
      @ed_shift1.delete     
      @ed_shift2.delete
      @ed_shift3.delete
      @ben_shift1.delete
      @ben_shift2.delete
      @kathryn_shift1.delete
      @cindy_shift1.delete
    end

    def create_past_shifts
      @assign_ed_2  = FactoryGirl.create(:assignment, employee: @ed, store: @cmu, start_date: 1.month.ago.to_date, end_date: nil, pay_level: 2)
      @ed_past_shift1 = FactoryGirl.create(:shift, assignment: @assign_ed_2, date: 1.week.from_now.to_date)
      @ed_past_shift1.update_attribute(:date, 1.day.ago.to_date)
      @ed_past_shift2 = FactoryGirl.create(:shift, assignment: @assign_ed_2, date: 1.week.from_now.to_date)
      @ed_past_shift2.update_attribute(:date, 2.days.ago.to_date)
      @ed_past_shift3 = FactoryGirl.create(:shift, assignment: @assign_ed_2, date: 1.week.from_now.to_date)
      @ed_past_shift3.update_attribute(:date, 3.days.ago.to_date)
      @kathryn_past_shift1 = FactoryGirl.create(:shift, assignment: @assign_kathryn, date: 1.week.from_now.to_date)
      @kathryn_past_shift1.update_attribute(:date, 1.day.ago.to_date)
    end

    def remove_past_shifts
      @assign_ed_2.delete
      @ed_past_shift1.delete
      @ed_past_shift2.delete
      @ed_past_shift3.delete
      @kathryn_past_shift1.delete
    end

  end
end
