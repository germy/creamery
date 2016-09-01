require 'test_helper'

class StoreFlavorTest < ActiveSupport::TestCase
  should belong_to(:store)
  should belong_to(:flavor)
  should validate_presence_of(:store_id)
  should validate_presence_of(:flavor_id)

  context "Creating a context for store_flavors" do
    setup do
      create_stores
      create_flavors
    end

    teardown do
      remove_stores
      remove_flavors
    end
    should "identify a non-active or non-existent store as part of an invalid store flavor" do
      inactive_store_used = FactoryGirl.build(:store_flavor, store: @hazelwood, flavor: @chocolate)
      deny inactive_store_used.valid?
      ghost_store  = FactoryGirl.build(:store, name: "Western Ave")
      non_flavor_used = FactoryGirl.build(:store_flavor, store: ghost_store, flavor: @chocolate)
      deny non_flavor_used.valid?
    end

    should "identify a non-active or non-existent flavor as part of an invalid store flavor" do
      inactive_flavor_used = FactoryGirl.build(:store_flavor, store: @cmu, flavor: @vanilla)
      deny inactive_flavor_used.valid?
      ghost_flavor  = FactoryGirl.build(:flavor, name: "Chocolate Banana")
      non_flavor_used = FactoryGirl.build(:store_flavor, store: @cmu, flavor: ghost_flavor)
      deny non_flavor_used.valid?
    end
  end
end
