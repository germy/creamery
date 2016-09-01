class ShiftsController < ApplicationController
  check_authorization
  load_and_authorize_resource
  before_action :set_shift, only: [:show, :edit, :update, :destroy, :start_now, :end_now]

  # GET /shifts
  # GET /shifts.json
  def index
    @shifts = Shift.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 15)
  end

  # GET /shifts/1
  # GET /shifts/1.json
  def show
    @shift_jobs = @shift.shift_jobs.select{ |sj| can? :read, sj}.to_a.paginate(:page => params[:shift_jobs_page], :per_page => 7)
  end

  # GET /shifts/new
  def new
    @shift = Shift.new
    @shift.date = Date.current
  end

  # GET /shifts/1/edit
  def edit
  end

  # POST /shifts
  # POST /shifts.json
  def create
    @update_shift = shift_params
    @update_shift[:date] = Date.strptime(shift_params[:date].to_s, "%m/%d/%Y")   
    @shift = Shift.new(@update_shift)
    @assignment = @shift.assignment
    respond_to do |format|
      if @shift.save
        @shifts = @assignment.shifts.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 8)         
        format.js
        format.html { redirect_to @shift, notice: 'Shift was successfully created.' }
        format.json { render :show, status: :created, location: @shift }
      else
        format.html { render :new }
        format.json { render json: @shift.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /shifts/1
  # PATCH/PUT /shifts/1.json
  def update 
    @update_shift = shift_params
    @update_shift[:date] = Date.strptime(shift_params[:date].to_s, "%m/%d/%Y")
    respond_to do |format|
      if @shift.update(@update_shift)
        format.html { redirect_to @shift, notice: 'Shift was successfully updated.' }
        format.json { render :show, status: :ok, location: @shift }
      else
        format.html { render :edit }
        format.json { render json: @shift.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shifts/1
  # DELETE /shifts/1.json
  def destroy
    @assignment = @shift.assignment    
    @shift.destroy
    respond_to do |format|
      @shifts = @assignment.shifts.select{ |s| can? :read, s}.to_a.paginate(:page => params[:shifts_page], :per_page => 8)       
      format.js
      format.html { redirect_to shifts_url, notice: 'Shift was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def start_now
    @shift.start_now
    redirect_to :home, notice: 'Shift was started'
  end

  def end_now
    @shift.end_now
    redirect_to :home, notice: 'Shift was ended'    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shift
      @shift = Shift.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def shift_params
      params.require(:shift).permit(:assignment_id, :date, :start_time, :end_time, :notes)
    end
end
