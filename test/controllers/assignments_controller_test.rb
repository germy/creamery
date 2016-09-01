require 'test_helper'

class AssignmentsControllerTest < ActionController::TestCase
  setup do
    create_employees
    create_stores
    create_assignments
  end

  teardown do
    remove_employees
    remove_stores
    remove_assignments
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:current_assignments)
    assert_not_nil assigns(:past_assignments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create a new assignment" do
    assert_difference('Assignment.count') do
      post :create, assignment: { employee_id: @ben.id, store_id: @oakland.id, start_date: Date.current, pay_level: 5 }
    end
    assert_redirected_to assignments_path
    assert_equal "Ben Sisko is assigned to Oakland.", flash[:notice]
    post :create, assignment: { employee_id: nil, store_id: @oakland.id, start_date: Date.current, pay_level: 5 }
    assert_template :new
  end

  test "should get edit" do
    get :edit, id: @assign_ben
    assert_not_nil assigns(:assignment)
    assert_response :success
  end

  test "should update an assignment" do
    patch :update, id: @promote_ben, assignment: { employee_id: @ben.id, store_id: @cmu.id, start_date: @promote_ben.start_date, pay_level: 5 }
    assert_redirected_to assignments_path
    assert_equal "Ben Sisko's assignment to CMU is updated.", flash[:notice]
    patch :update, id: @promote_ben, assignment: { employee_id: nil, store_id: @cmu.id, start_date: @promote_ben.start_date, pay_level: 4 }
    assert_template :edit
  end

  test "should destroy assignment" do
    assert_difference('Assignment.count', -1) do
      delete :destroy, id: @promote_ben
    end
    assert_redirected_to assignments_path
    assert_equal "Successfully removed Ben Sisko from CMU.", flash[:notice]
  end
end