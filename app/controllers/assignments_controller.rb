class AssignmentsController < ApplicationController
  check_authorization
  load_and_authorize_resource
  before_action :set_assignment, only: [:show, :edit, :update, :destroy, :end_assignment]

  def index
    @current_assignments = Assignment.current.by_store.by_employee.chronological.select{ |a| can? :read, a}.to_a.paginate(:page => params[:current_assignments_page], :per_page => 15)
    @past_assignments = Assignment.past.by_employee.by_store.select{ |a| can? :read, a}.to_a.paginate(:page => params[:past_assignments_page], :per_page => 10)
  end

  def show
    # get the shift history for this assignment (later; empty now)
    @shifts = @assignment.shifts.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 8) 
  end

  def new
    @assignment = Assignment.new  
    @assignment.start_date = Date.current
    @assignment.end_date = Date.current     
  end

  def edit    
  end

  def create
    @update_assignment = assignment_params
    @update_assignment[:start_date] = Date.strptime(assignment_params[:start_date].to_s, "%m/%d/%Y") 
    unless assignment_params[:end_date].nil?
      @update_assignment[:end_date] = Date.strptime(assignment_params[:end_date].to_s, "%m/%d/%Y")        
    end
    @assignment = Assignment.new(@update_assignment)     
    @employee = @assignment.employee    
    @store = @assignment.store      
    if @assignment.save
      respond_to do |format|   
        if params[:from] == "Create Store Assignment" then     
          @current_assignments = @store.assignments.current.by_employee.to_a.paginate(:page => params[:current_assignments_page], :per_page => 7)      
          @from = "store"
        end
        if params[:from] == "Create Employee Assignment" then
          @assignments = @employee.assignments.chronological.to_a.paginate(:page => params[:assignments_page], :per_page => 7)
          @from = "employee"
        end        
        format.js
        format.html { redirect_to assignment_path(@assignment), notice: "#{@assignment.employee.proper_name} is assigned to #{@assignment.store.name}." }
      end
      # redirect_to assignment_path(@assignment), notice: "#{@assignment.employee.proper_name} is assigned to #{@assignment.store.name}."
    else
      render action: 'new'
    end
  end

  def update
    start_date = @assignment.start_date
    end_date = @assignment.end_date
    @update_assignment = assignment_params
    @update_assignment[:start_date] = Date.strptime(assignment_params[:start_date].to_s, "%m/%d/%Y")    
    @update_assignment[:end_date] = Date.strptime(assignment_params[:end_date].to_s, "%m/%d/%Y")    
    if @assignment.update(@update_assignment)
      redirect_to assignments_path, notice: "#{@assignment.employee.proper_name}'s assignment to #{@assignment.store.name} is updated."
    else    
      @assignment.start_date = start_date 
      @assignment.end_date = end_date
      redirect_to action: 'edit'
    end
  end

  def destroy
    @store = @assignment.store
    @assignment.destroy
    respond_to do |format|       
      @current_assignments = @store.assignments.current.by_employee.to_a.paginate(:page => params[:current_assignments_page], :per_page => 7)      
      format.js   
      format.html { redirect_to assignments_path, notice: "Assignment is deleted." }
    end
  end

  private
  def set_assignment
    @assignment = Assignment.find(params[:id])
  end

  def assignment_params
    params.require(:assignment).permit(:employee_id, :store_id, :start_date, :end_date, :pay_level)
  end

end
