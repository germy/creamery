class CreateStoreFlavors < ActiveRecord::Migration
  def change
    create_table :store_flavors do |t|
      t.integer :store_id
      t.integer :flavor_id

      # t.timestamps null: false
    end
  end
end
