# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :link do
    related_link { Faker::Internet.url }
    user { create(:user) }
    story { create(:story) }
  end
end
