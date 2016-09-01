class CreateFlavors < ActiveRecord::Migration
  def change
    create_table :flavors do |t|
      t.string :name
      t.boolean :active, default: true

      # t.timestamps null: false
    end
  end
end
