class HomeController < ApplicationController
  skip_authorization_check
  def home
    if current_user.nil?
      @active_stores = Store.active.alphabetical.to_a.paginate(:page => params[:active_stores_page], :per_page => 5)
      @flavors = Flavor.all.to_a.paginate(:page => params[:flavors_page], :per_page => 5)
    elsif current_user.employee.role == "employee" 
      @current_assignments = Assignment.current.by_store.by_employee.chronological.select{ |a| can? :read, a}.to_a.paginate(:page => params[:current_assignments_page], :per_page => 15)    
      @assignment = Assignment.current.for_employee(current_user.employee).first
      unless @assignment.nil?
        @shifts = @assignment.shifts.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 8) 
      end
    elsif current_user.employee.role == "manager"
      @current_assignments = Assignment.current.by_store.by_employee.chronological.select{ |a| can? :read, a}.to_a.paginate(:page => params[:current_assignments_page], :per_page => 8)    
      @assignment = Assignment.current.for_employee(current_user.employee).first
      unless @assignment.nil?
        @today_shifts = Shift.for_store(@assignment.store).for_next_days(0).select{ |s| can? :read, s}.to_a.paginate(:page => params[:incomplete_shifts_page], :per_page => 8) 
        @shifts = @assignment.shifts.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 8) 
        @incomplete_shifts = Shift.for_store(@assignment.store).incomplete.select{ |s| can? :read, s}.to_a.paginate(:page => params[:incomplete_shifts_page], :per_page => 8) 
      end     
    elsif current_user.employee.role == "admin"
      @stores = Store.alphabetical.to_a.paginate(:page => params[:stores_page], :per_page => 7)
      @active_employees = Employee.active.alphabetical.select{ |e| can? :read, e}.to_a.paginate(:page => params[:active_employees_page], :per_page => 7)
    end
  end

  def about
  end

  def privacy
  end

  def contact
  end

end
