class Assignment < ActiveRecord::Base
  # get modules to help with some functionality
  include CreameryHelpers::Validations

  # Callbacks
  before_create :end_previous_assignment
  before_update :remove_future_shifts_from_terminated_assignment
  before_destroy :is_destroyable?
  after_rollback :terminate_assignment
  
  # Relationships
  belongs_to :employee
  belongs_to :store
  has_many :shifts
  
  # Validations
  validates_numericality_of :pay_level, only_integer: true, greater_than: 0, less_than: 7
  validates_date :start_date, on_or_before: lambda { Date.current }, on_or_before_message: "cannot be in the future"
  validates_date :end_date, after: :start_date, on_or_before: lambda { Date.current }, allow_blank: true
  validate :employee_is_active_in_system, on: :create
  validate :store_is_active_in_system, on: :create
  validates_presence_of :employee_id, on: :update
  validates_presence_of :store_id, on: :update
  
  # Scopes
  scope :current,       -> { where(end_date: nil) }
  scope :past,          -> { where.not(end_date: nil) }
  scope :by_store,      -> { joins(:store).order('name') }
  scope :by_employee,   -> { joins(:employee).order('last_name, first_name') }
  scope :chronological, -> { order('start_date DESC, end_date DESC') }
  scope :for_store,     ->(store_id) { where("store_id = ?", store_id) }
  scope :for_employee,  ->(employee_id) { where("employee_id = ?", employee_id) }
  scope :for_pay_level, ->(pay_level) { where("pay_level = ?", pay_level) }
  scope :for_role,      ->(role) { joins(:employee).where("role = ?", role) }

  # Private methods for callbacks and custom validations
  private  
  
  def end_previous_assignment
    current_assignment = Employee.find(self.employee_id).current_assignment
    if current_assignment.nil?
      return true 
    else
      terminate_all_future_shifts
      current_assignment.update_attribute(:end_date, self.start_date.to_date)
    end
  end
  
  def employee_is_active_in_system
    is_active_in_system(:employee)
  end

  def store_is_active_in_system
    is_active_in_system(:store)
  end

  def remove_future_shifts_from_terminated_assignment
    terminate_all_future_shifts unless self.end_date.nil?
  end

  def terminate_all_future_shifts
    @future_shifts = self.shifts.upcoming
    @future_shifts.each {|s| s.destroy}
  end

  def is_destroyable?
    @destroyable = self.shifts.past.empty?
  end
  
  def terminate_assignment
    terminate_all_future_shifts if !@destroyable.nil? && @destroyable == false
    self.update_attribute(:end_date, Date.current)if !@destroyable.nil? && @destroyable == false
    @destroyable = nil
  end
end
