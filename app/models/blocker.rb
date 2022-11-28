class Blocker < ApplicationRecord
  belongs_to :user
  belongs_to :story 
  validates :block_reason, presence: true
end
