module Contexts
  module ShiftJobContexts
    def create_shift_jobs
      @ed_shift2_job1 = FactoryGirl.create(:shift_job, shift: @ed_past_shift2, job: @cashier)
      @ed_shift2_job2 = FactoryGirl.create(:shift_job, shift: @ed_past_shift2, job: @mopping)
      @ed_shift3_job1 = FactoryGirl.create(:shift_job, shift: @ed_past_shift3, job: @cashier)
      @ed_shift3_job2 = FactoryGirl.create(:shift_job, shift: @ed_past_shift3, job: @mopping)
      @kathryn_shift1_job1 = FactoryGirl.create(:shift_job, shift: @kathryn_past_shift1, job: @cashier)
    end

    def remove_shift_jobs
      @ed_shift2_job1.delete
      @ed_shift2_job2.delete
      @ed_shift3_job1.delete
      @ed_shift3_job2.delete
      @kathryn_shift1_job1.delete
    end
  end
end
