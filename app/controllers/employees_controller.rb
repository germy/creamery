class EmployeesController < ApplicationController
  check_authorization
  load_and_authorize_resource
  before_action :set_employee, only: [:show, :edit, :update, :destroy]
  
  def index
    @active_employees = Employee.active.alphabetical.select{ |e| can? :read, e}.to_a.paginate(:page => params[:active_employees_page], :per_page => 10)
    @inactive_employees = Employee.inactive.alphabetical.select{ |e| can? :read, e}.to_a.paginate(:page => params[:inactive_employees_page], :per_page => 10)
  end

  def show
    @assignments = @employee.assignments.chronological.to_a.paginate(:page => params[:assignments_page], :per_page => 7)
    @user = @employee.user
  end

  def new
    @employee = Employee.new
    @employee.build_user
    @employee.date_of_birth = 20.years.ago
  end

  def edit
  end

  def create
    @update_employee = employee_params
    @update_employee[:date_of_birth] = Date.strptime(employee_params[:date_of_birth].to_s, "%m/%d/%Y") 
    @employee = Employee.new(@update_employee)
    @employee.date_of_birth = @employee.date_of_birth.to_s.to_date 
    respond_to do |format|
      if @employee.save
        format.html { redirect_to @employee, notice: "Successfully created #{@employee.proper_name}."}
      else
        format.html { render action: 'new' }
      end
    end
  end

  def update
    @update_employee = employee_params
    @update_employee[:date_of_birth] = Date.strptime(employee_params[:date_of_birth].to_s, "%m/%d/%Y")      
    if @employee.update(@update_employee)
      redirect_to employee_path(@employee), notice: "Successfully updated #{@employee.proper_name}."
    else
      render action: 'edit'
    end
  end

  def destroy
    @employee.destroy
    redirect_to employees_path, notice: "Successfully removed #{@employee.proper_name} from the AMC system."
  end

  private
  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    if @current_user == "employee" then
      params.require(:employee).permit(:first_name, :last_name, :date_of_birth, :phone, :active, user_attributes: [:id, :email, :password_confirmation, :password, :employee_id, :_destroy])
    else
      params.require(:employee).permit(:first_name, :last_name, :ssn, :date_of_birth, :role, :phone, :active, user_attributes: [:id, :email, :password_confirmation, :password, :employee_id, :_destroy])
    end
  end

end
