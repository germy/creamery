module Contexts
  module StoreContexts
    # Context for stores 
    def create_stores
      @oakland = FactoryGirl.create(:store, name: "Oakland", phone: "412-268-8211")
      @hazelwood = FactoryGirl.create(:store, name: "Hazelwood", active: false)
      @cmu = FactoryGirl.create(:store)
    end
    
    def remove_stores
      @cmu.delete
      @hazelwood.delete
      @oakland.delete
    end

    def create_additional_stores
      @convention = FactoryGirl.create(:store, name: "Convention Center", street: "1000 Fort Duquesne Blvd", zip: "15222", phone: "4122683665")
      @acac = FactoryGirl.create(:store, name: "ACAC", street: "250 East Ohio", zip: "15212", phone: "4122683259")
      @bistro = FactoryGirl.create(:store, name: "Bistro", street: "325 East Ohio", zip: "15212", phone: "4122683265", active: true)     
    end

    def remove_additional_stores
      @convention.delete
      @acac.delete
      @bistro.delete
    end
  end
end