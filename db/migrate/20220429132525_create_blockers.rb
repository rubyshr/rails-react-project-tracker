class CreateBlockers < ActiveRecord::Migration[5.1]
  def change
    create_table :blockers do |t|
      t.string :block_reason
      t.references :user, foreign_key: true
      t.references :story, foreign_key: true

      t.timestamps
    end
  end
end
