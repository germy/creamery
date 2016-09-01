class Shift < ActiveRecord::Base
  # Relationships
  has_many :shift_jobs
  has_many :jobs, through: :shift_jobs
  belongs_to :assignment
  has_one :employee, through: :assignment
  has_one :store, through: :assignment

  # Validations
  validates_date :date, on_or_after: lambda { :assignment_starts }, on_or_before_message: "must be on or after the start of the assignment"
  validates_time :start_time
  validates_time :end_time, after: :start_time, allow_blank: true
  validate :assignment_must_be_current

  # Scopes
  scope :chronological, -> { order(:date, :start_time) }
  scope :by_store, -> { joins(:assignment, :store).order('stores.name') }
  scope :by_employee, -> { joins(:assignment, :employee).order('employees.last_name, employees.first_name') }
  scope :past, -> { where('date < ?', Date.current) }
  scope :upcoming, -> { where('date >= ?', Date.current) }
  scope :for_employee, ->(employee_id) { joins(:assignment, :employee).where("assignments.employee_id = ?", employee_id) }
  scope :for_store, ->(store_id) { joins(:assignment, :store).where("assignments.store_id = ?", store_id) }
  scope :for_next_days, ->(x) { where('date BETWEEN ? AND ?', Date.today, x.days.from_now.to_date) }
  scope :for_past_days, ->(x) { where('date BETWEEN ? AND ?', x.days.ago.to_date, 1.day.ago.to_date) }
  scope :completed, -> { joins(:shift_jobs).group(:shift_id) }
  scope :incomplete, -> { joins("LEFT JOIN shift_jobs ON shifts.id = shift_jobs.shift_id").where('shift_jobs.job_id IS NULL') }
  # alternative ways of finding 'incomplete' scope:
  # scope :incomplete, -> { where('id NOT IN (?)', Shift.completed.map(&:id)) }
  # a class method to also find incomplete shifts using array operations...
  def self.not_completed
    all_shifts = Shift.all
    completed_shifts = Shift.completed
    incompleted_shifts = all_shifts - completed_shifts
  end

  # Other methods
  def completed?
    self.shift_jobs.count > 0
  end

  def start_now
    self.update_attribute(:start_time, Time.current - 4.hours)
  end

  def end_now
    self.update_attribute(:end_time, Time.current - 4.hours)
  end

  def duration
    # returns the duration of the shift in units of hours (fractional)
    # since creamery not opened past midnight, don't have to
    # worry about crossing into next day, so just ...
    (self.end_time - self.start_time)/3600.0
  end
  
  # callback to set default end_time (on create only)
  before_create :set_shift_end_time
  
  private
  def assignment_starts
    @assignment_starts = self.assignment.start_date.to_date
  end
  
  def assignment_must_be_current
    unless self.assignment.nil? || self.assignment.end_date.nil?
      errors.add(:assignment_id, "is not a current assignment at the creamery")
    end
  end
  
  def set_shift_end_time
    self.end_time = self.start_time + (3*60*60)
  end

end
