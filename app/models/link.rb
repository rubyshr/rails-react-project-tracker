class Link < ApplicationRecord
  belongs_to :user
  belongs_to :story 
  validates :related_link, presence: true
end
