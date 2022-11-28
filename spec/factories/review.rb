# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :review do
    review_type { Faker::Name.initials }
    project { create(:project) }
  end
end
