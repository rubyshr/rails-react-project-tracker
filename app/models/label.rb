class Label < ApplicationRecord
	validates :label_name, presence: true
end
