module Contexts
  module AssignmentContexts
    # Context for assignments (assumes contexts for stores, employees)
    def create_assignments
      @assign_ed      = FactoryGirl.create(:assignment, employee: @ed, store: @cmu) # ended a month ago
      @assign_ben     = FactoryGirl.create(:assignment, employee: @ben, store: @cmu, start_date: 2.years.ago.to_date, end_date: 6.months.ago.to_date, pay_level: 3)
      @promote_ben    = FactoryGirl.create(:assignment, employee: @ben, store: @cmu, start_date: 6.months.ago.to_date, end_date: nil, pay_level: 4)
      @assign_cindy   = FactoryGirl.create(:assignment, employee: @cindy, store: @cmu, start_date: 14.months.ago.to_date, end_date: nil)
      @assign_kathryn = FactoryGirl.create(:assignment, employee: @kathryn, store: @oakland, start_date: 10.months.ago.to_date, end_date: nil, pay_level: 3)
    end
    
    def remove_assignments
      @assign_ed.delete
      @assign_cindy.delete
      @assign_ben.delete
      @promote_ben.delete
      @assign_kathryn.delete
    end

    def create_additional_assignments
      @assign_liu    = FactoryGirl.create(:assignment, employee: @liu, store: @cmu, start_date: 3.years.ago.to_date, end_date: 6.months.ago.to_date, pay_level: 4)
      @assign_wilson = FactoryGirl.create(:assignment, employee: @wilson, store: @cmu, start_date: 3.years.ago.to_date, end_date: 2.year.ago.to_date, pay_level: 4)
      @assign_correa = FactoryGirl.create(:assignment, employee: @correa, store: @cmu, start_date: 2.years.ago.to_date, end_date: nil, pay_level: 4)
      @brunk_assign  = FactoryGirl.create(:assignment, employee: @brunk, store: @cmu, start_date: 14.months.ago.to_date, end_date: nil, pay_level: 1)      

      @reassign_wilson = FactoryGirl.create(:assignment, employee: @wilson, store: @acac, start_date: 2.years.ago.to_date, end_date: nil, pay_level: 3)
      @davis_assign    = FactoryGirl.create(:assignment, employee: @davis, store: @acac, start_date: 16.months.ago.to_date, end_date: nil, pay_level: 1)
      @daigle_assign   = FactoryGirl.create(:assignment, employee: @daigle, store: @acac, start_date: "2011-11-22", end_date: nil, pay_level: 3)
      @olbeter_assign  = FactoryGirl.create(:assignment, employee: @olbeter, store: @acac, start_date: 49.months.ago.to_date, end_date: nil, pay_level: 1)
      @wakeley_assign  = FactoryGirl.create(:assignment, employee: @wakeley, store: @acac, start_date: 27.months.ago.to_date, end_date: 5.weeks.ago.to_date, pay_level: 2)
      @taylor_assign   = FactoryGirl.create(:assignment, employee: @taylor, store: @acac, end_date: nil, pay_level: 2)
      
      @assign_freeman        = FactoryGirl.create(:assignment, employee: @freeman, store: @convention, start_date: 4.years.ago.to_date, end_date: nil, pay_level: 3)
      @promote_freeman       = FactoryGirl.create(:assignment, employee: @freeman, store: @convention, start_date: 27.months.ago.to_date, end_date: nil, pay_level: 4)
      @promote_freeman_again = FactoryGirl.create(:assignment, employee: @freeman, store: @convention, start_date: 10.months.ago.to_date, end_date: nil, pay_level: 5)
      @hersh_assign          = FactoryGirl.create(:assignment, employee: @hersh, store: @convention, start_date: 27.months.ago.to_date, end_date: nil, pay_level: 1)
      @porter_assign         = FactoryGirl.create(:assignment, employee: @porter, store: @convention, start_date: 16.months.ago.to_date, end_date: nil, pay_level: 1)
      @holt_assign           = FactoryGirl.create(:assignment, employee: @holt, store: @convention, end_date: nil, pay_level: 1)
      @schell_assign         = FactoryGirl.create(:assignment, employee: @schell, store: @acac, start_date: 4.years.ago.to_date, end_date: 2.years.ago.to_date, pay_level: 2)
      @promote_schell        = FactoryGirl.create(:assignment, employee: @schell, store: @convention, start_date: 2.years.ago.to_date, end_date: nil, pay_level: 3)
      @miller_assign         = FactoryGirl.create(:assignment, employee: @miller, store: @convention, start_date: 2.years.ago.to_date, end_date: 2.months.ago.to_date, pay_level: 2)

      @rubinstein_assign     = FactoryGirl.create(:assignment, employee: @rubinstein, store: @convention, start_date: 27.months.ago.to_date, end_date: nil, pay_level: 2)
      @rubinstein_reassigned = FactoryGirl.create(:assignment, employee: @rubinstein, store: @cmu, start_date: 14.months.ago.to_date, end_date: nil, pay_level: 2)
    end

    def remove_additional_assignments
      @assign_liu.delete
      @assign_wilson.delete
      @assign_correa.delete
      @brunk_assign.delete 
      @reassign_wilson.delete
      @davis_assign.delete
      @daigle_assign.delete
      @olbeter_assign.delete
      @wakeley_assign.delete
      @taylor_assign.delete
      @assign_freeman.delete
      @promote_freeman.delete
      @promote_freeman_again.delete
      @hersh_assign.delete
      @brunk_assign.delete
      @porter_assign.delete
      @holt_assign.delete
      @schell_assign.delete
      @promote_schell.delete
      @miller_assign.delete
      @rubinstein_assign.delete
      @rubinstein_reassigned.delete
    end

  end
end