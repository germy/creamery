module Contexts
  module FlavorContexts
    # Context for flavors 
    def create_flavors
      @chocolate  = FactoryGirl.create(:flavor)
      @vanilla    = FactoryGirl.create(:flavor, name: "Vanilla", active: false)
      @strawberry = FactoryGirl.create(:flavor, name: "Strawberry")
      @mint_chip  = FactoryGirl.create(:flavor, name: "Mint Chocolate Chip")
    end
    
    def remove_flavors
      @chocolate.delete
      @vanilla.delete
      @strawberry.delete
      @mint_chip.delete
    end
  end
end