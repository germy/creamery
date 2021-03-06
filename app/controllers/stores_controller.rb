class StoresController < ApplicationController
  check_authorization
  load_and_authorize_resource
  before_action :set_store, only: [:show, :edit, :update, :destroy]
  
  def index
    @active_stores = Store.active.alphabetical.to_a.paginate(:page => params[:active_stores_page], :per_page => 10)
    @inactive_stores = Store.inactive.alphabetical.to_a.paginate(:page => params[:inactive_stores_page], :per_page => 10)
  end

  def show
    @current_assignments = @store.assignments.current.by_employee.to_a.paginate(:page => params[:current_assignments_page], :per_page => 7)
    @flavors = @store.store_flavors.to_a.paginate(:page => params[:flavors_page], :per_page => 5)
    @employee = Employee.new
    @employee.id = 0
    if @store.latitude.nil? and @store.latitude.nil? then
      @store.get_store_coordinates
    end
  end

  def new
    @store = Store.new
  end

  def edit
  end

  def create
    @store = Store.new(store_params)
    if @store.save
      @store.get_store_coordinates
      redirect_to store_path(@store), notice: "Successfully created #{@store.name}."
    else
      render action: 'new'
    end
  end

  def update
    if @store.update(store_params)
      @store.get_store_coordinates      
      redirect_to store_path(@store), notice: "Successfully updated #{@store.name}."
    else
      render action: 'edit'
    end
  end

  def destroy
    @store.destroy
    redirect_to stores_path, notice: "Successfully removed #{@store.name} from the AMC system."
  end

  private
  def set_store
    @store = Store.find(params[:id])
  end

  def store_params
    params.require(:store).permit(:name, :street, :city, :state, :zip, :phone, :active)
  end

end
