class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #

    unless user 
      can :read, Store, :active => true
      can :index, Store
      can :index, Flavor
      can :read, Flavor
      cannot :read_inactive, Store
      cannot :index, ShiftJob      
    else
      if user.employee.role == 'admin' then
        can :manage, :all
        cannot :index, ShiftJob
        cannot :start_shift
        cannot :end_now
        cannot :end_shift
        cannot :start_now
      # Employee's Abilities
      #####################
      elsif user.employee.role == 'employee' then   
        can :read, Store
        can :read_inactive, Store        
        can :read, Flavor
        can :read, Job
        can :index, Job        
        can [:read, :update], Employee do |e|
         e.id == user.employee.id
        end
        cannot :update_ssn, Employee
        cannot :update_role, Employee
        cannot :read_inactive_employee, Employee        
        can :index, Employee
        can :manage, User do |u|
          u.id == user.id
        end
        can :read, Assignment do |a|
          a.employee_id == user.employee.id
        end
        can :index, Assignment
        can :read, Shift do |s|
          Assignment.for_employee(user.employee).include? s.assignment
        end
        can [:start_shift, :start_now], Shift do |s|
          s.date.to_date == Date.current.to_date
        end
        can [:end_shift, :end_now], Shift do |s|
          s.date.to_date == Date.current.to_date
        end   
        can :index, Shift
        can :read, ShiftJob do |sj|
          Assignment.for_employee(user.employee).include? sj.shift.assignment
        end
        cannot :index, ShiftJob


      # Manager's Abilities
      #####################
      elsif user.employee.role == 'manager' then
        can :read, Store
        can :read_inactive, Store         
        can :read, Job
        can :read, Flavor
        if Assignment.current.for_employee(user.employee.id).length > 0 then #checks if manager is assigned to any store, currently
          can :read, Employee do |e|
            if Assignment.current.for_employee(e).length > 0 then
              Assignment.current.for_employee(user.employee.id).first.store_id == Assignment.current.for_employee(e.id).first.store_id
            end
          end
          can :read, Assignment do |a|  
            a == Assignment.current.for_employee(a.employee.id).first && Assignment.current.for_employee(user.employee.id).first.store_id == Assignment.current.for_employee(a.employee.id).first.store_id  
          end
          can [:read, :create, :update, :destroy], Shift do |s|
            s.assignment_id == Assignment.current.for_employee(s.assignment.employee.id).first.id && Assignment.current.for_employee(user.employee.id).first.store_id == Assignment.current.for_employee(s.assignment.employee.id).first.store_id              
          end
          can :new, Shift
        else
          can :read, Employee do |e|
            e.id == user.employee.id
          end
          can :read, Assignment do |e|
            e.assignment_id == user.employee.id
          end          
        end
        can :new, ShiftJob
        can [:read, :create, :destroy], ShiftJob do |sj|
          unless sj.shift_id.nil? then
            Assignment.current.for_employee(user.employee.id).first.store_id == sj.shift.assignment.store_id        
          end
        end
        can :new, StoreFlavor
        can [:create, :destroy], StoreFlavor do |sf|
          unless sf.store_id.nil? then
            Assignment.current.for_employee(user.employee.id).first.store_id == sf.store_id
          end
        end
        cannot :index, ShiftJob
      else
        nil
      end
    end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
