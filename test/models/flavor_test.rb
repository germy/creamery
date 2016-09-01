require 'test_helper'

class FlavorTest < ActiveSupport::TestCase
  # Test relationships
  should have_many(:store_flavors)
  should have_many(:stores).through(:store_flavors)

  # Test basic validations
  should validate_presence_of(:name)

  context "Creating a context for flavors" do
    setup do 
      create_flavors
    end
    
    teardown do
      remove_flavors
    end
    
    # test the scope 'alphabetical'
    should "shows that there are four flavors in in alphabetical order" do
      assert_equal ["Chocolate", "Mint Chocolate Chip", "Strawberry", "Vanilla"], Flavor.alphabetical.map{|f| f.name}
    end
    
    # test the scope 'active'
    should "shows that there are three active flavors" do
      assert_equal 3, Flavor.active.size
      assert_equal ["Chocolate", "Mint Chocolate Chip", "Strawberry"], Flavor.active.map{|f| f.name}.sort
    end
    
    # test the scope 'inactive'
    should "shows that there is one inactive flavor" do
      assert_equal 1, Flavor.inactive.size
      assert_equal ["Vanilla"], Flavor.inactive.map{|f| f.name}.sort
    end

    should "correctly assess that flavors are not destroyable" do
      deny @chocolate.destroy
      deny @vanilla.destroy
    end

    should "make an undestroyed flavor inactive" do
      deny @chocolate.destroy
      @chocolate.reload
      deny @chocolate.active
    end
  end
end
