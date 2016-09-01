class ShiftJob < ActiveRecord::Base
  include CreameryHelpers::Validations
  # relationships
  belongs_to :shift
  belongs_to :job
  # validations
  validates_presence_of :shift_id, :job_id
  validate :shift_is_active_in_system, on: :create
  validate :job_is_active_in_system, on: :create

  private  
  
  def shift_is_active_in_system
    is_active_in_system(:shift)
  end

  def job_is_active_in_system
    is_active_in_system(:job)
  end
end
