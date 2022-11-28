# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    password_digest { Faker::PhoneNumber.subscriber_number(length: 6) }
    name { Faker::Name.name }
    email { Faker::Internet.email }
    initials { Faker::Name.initials }
  end
end
