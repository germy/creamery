module Contexts
  module UserContexts
    # Context for users; assumes initial context for employees already set 
    def create_users
      @ed_user = FactoryGirl.create(:user, employee: @ed, email: "ed@example.com", password: "bob", password_confirmation: "bob")
      @cindy_user = FactoryGirl.create(:user, employee:@cindy, email: "cindy@example.com", password: "bob", password_confirmation: "bob")
      @ben_user = FactoryGirl.create(:user, employee:@ben, email: "ben@example.com", password: "bob", password_confirmation: "bob")
      @alex_user = FactoryGirl.create(:user, employee:@alex, email: "alex@example.com", password: "bob", password_confirmation: "bob")
    end
    
    def remove_users
      # @ed_user.delete
      # @cindy_user.delete
      # @ben_user.delete
      # @alex_user.delete
    end

  end
end
