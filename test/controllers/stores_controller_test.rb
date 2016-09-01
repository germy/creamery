require 'test_helper'

class StoresControllerTest < ActionController::TestCase
  setup do
    create_stores
  end

  teardown do
    remove_stores
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:active_stores)
    assert_not_nil assigns(:inactive_stores)
    assert_equal %w[CMU Oakland], assigns(:active_stores).map(&:name)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create a new store" do
    assert_difference('Store.count') do
      post :create, store: { active: @cmu.active, city: @cmu.city, name: "Porter", phone: "4122683259", state: @cmu.state, street: @cmu.street, zip: @cmu.zip }
    end
    assert_redirected_to store_path(assigns(:store))
    assert_equal "Successfully created Porter.", flash[:notice]
    post :create, store: { active: @cmu.active, city: @cmu.city, phone: "4122683259", state: @cmu.state, street: @cmu.street, zip: @cmu.zip }
    assert_template :new
  end

  test "should show store and the current assingments at at store" do
    create_employees
    create_assignments
    get :show, id: @cmu
    assert_not_nil assigns(:store)
    assert_not_nil assigns(:current_assignments)
    assert_equal "CMU", assigns(:store).name
    assert_equal %w[Crawford Sisko], assigns(:current_assignments).map{|a| a.employee.last_name}
    assert_response :success
    remove_employees
    remove_assignments
  end

  test "should get edit" do
    get :edit, id: @cmu
    assert_not_nil assigns(:store)
    assert_response :success
  end

  test "should update a store" do
    patch :update, id: @cmu, store: { active: @cmu.active, city: @cmu.city, name: @cmu.name, phone: "4122688211", state: @cmu.state, street: @cmu.street, zip: @cmu.zip }
    assert_redirected_to store_path(assigns(:store))
    assert_equal "Successfully updated CMU.", flash[:notice]
    patch :update, id: @cmu, store: { active: @cmu.active, city: @cmu.city, name: nil, phone: "4122688211", state: @cmu.state, street: @cmu.street, zip: @cmu.zip }
    assert_template :edit
  end

  test "should destroy store" do
    ## Because we no longer destroy stores, just make them inactive, these tests are different than phase 3
    assert_difference('Store.count', 0) do
      delete :destroy, id: @cmu
    end
    @cmu.reload
    deny @cmu.active
    assert_redirected_to stores_path
    assert_equal "Successfully removed CMU from the AMC system.", flash[:notice]
  end
end

