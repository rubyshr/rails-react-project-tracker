class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :review_type, null: false
      t.references :project, null: false, foreign_key: true
      t.timestamps
    end
  end
end
