module Contexts
  module JobContexts
    def create_jobs
      @cashier = FactoryGirl.create(:job)
      @mopping = FactoryGirl.create(:job, name: "Mopping")
      @making  = FactoryGirl.create(:job, name: "Ice cream making")
      @mover   = FactoryGirl.create(:job, name: "Mover", active: false)
    end

    def remove_jobs
      @cashier.delete
      @mopping.delete
      @making.delete
      @mover.delete
    end
  end
end