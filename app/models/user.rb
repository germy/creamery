class User < ActiveRecord::Base
  has_secure_password
  # get modules to help with some functionality
  include CreameryHelpers::Validations

  # Relationships
  belongs_to :employee

  # Validations
  validates_uniqueness_of :email, case_sensitive: false, :message => "Email has already be registed in the system"
  validates_format_of :email, :with => /\A[\w]([^@\s,;]+)@(([\w-]+\.)+(com|edu|org|net|gov|mil|biz|info))\z/i, :message => "is not a valid format"
  validate :employee_is_active_in_system, on: :update
  validates_presence_of :password, on: :create
  validates_presence_of :password_confirmation, on: :create   
  
  private
  def employee_is_active_in_system
    is_active_in_system(:employee)
  end

  # for use in authorizing with CanCan
  ROLES = [['Administrator', :admin],['Manager', :manager],["Employee", :employee],["Guest", :guest]]

  def role?(authorized_role)
    return false if role.nil?
    role.downcase.to_sym == authorized_role
  end

  # login by email address
  def self.authenticate(email, password)
    find_by_email(email).try(:authenticate, password)
  end  

end
