class CreateLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :links do |t|
      t.string :related_link
      t.references :user, foreign_key: true
      t.references :story, foreign_key: true

      t.timestamps
    end
  end
end
