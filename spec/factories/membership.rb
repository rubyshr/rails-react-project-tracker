# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :membership do
    user { create(:user) }
    project { create(:project) }
    role {'owner'}
  end
end
