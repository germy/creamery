require 'test_helper'

class EmployeesControllerTest < ActionController::TestCase
  setup do
    create_employees
  end

  teardown do
    remove_employees
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:active_employees)
    assert_not_nil assigns(:inactive_employees)
    assert_equal %w[Crawford Gruberman Heimann Janeway Sisko], assigns(:active_employees).map(&:last_name)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create a new employee" do
    assert_difference('Employee.count') do
      post :create, employee: { active: @ben.active, first_name: "Jake", last_name: @ben.last_name, role: "employee", ssn: "010101010", date_of_birth: 19.years.ago.to_date }
    end
    assert_redirected_to employee_path(assigns(:employee))
    assert_equal "Successfully created Jake Sisko.", flash[:notice]
    post :create, employee: { active: @ben.active, last_name: @ben.last_name, role: "employee", ssn: "0101", date_of_birth: 19.years.ago.to_date }
    assert_template :new
  end

  test "should show employee and assingment history" do
    create_stores
    create_assignments
    get :show, id: @ben
    assert_not_nil assigns(:employee)
    assert_not_nil assigns(:assignments)
    assert_equal "Sisko", assigns(:employee).last_name
    assert_equal [3, 4], assigns(:assignments).map(&:pay_level).sort
    assert_response :success
    remove_stores
    remove_assignments
  end

  test "should get edit" do
    get :edit, id: @ben
    assert_not_nil assigns(:employee)
    assert_response :success
  end

  test "should update an employee" do
    patch :update, id: @ben, employee: { active: @ben.active, first_name: @ben.first_name, last_name: @ben.last_name, role: @ben.role, ssn: @ben.ssn, date_of_birth: 49.years.ago.to_date }
    assert_redirected_to employee_path(assigns(:employee))
    assert_equal "Successfully updated Ben Sisko.", flash[:notice]
    patch :update, id: @ben, employee: { active: @ben.active, first_name: nil, last_name: @ben.last_name, role: @ben.role, ssn: @ben.ssn, date_of_birth: 49.years.ago.to_date }
    assert_template :edit
  end

  test "should destroy employee" do
    assert_difference('Employee.count', -1) do
      delete :destroy, id: @ben
    end
    assert_redirected_to employees_path
    assert_equal "Successfully removed Ben Sisko from the AMC system.", flash[:notice]
  end
end