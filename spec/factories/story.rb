# frozen_string_literal: true

FactoryBot.define do
  factory :story do
    project { create(:project) }
    owner { create(:user) }
    author { create(:user) }
    title { Faker::Lorem.sentence }
    description {}
    state { 'delivered' }
    points { Faker::Number.between(from: 0, to: 3) }
    priority { 'high' }
    kind { 'bug' }
  end
end
