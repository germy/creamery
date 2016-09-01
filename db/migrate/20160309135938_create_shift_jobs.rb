class CreateShiftJobs < ActiveRecord::Migration
  def change
    create_table :shift_jobs do |t|
      t.integer :job_id
      t.integer :shift_id

      # t.timestamps null: false
    end
  end
end
