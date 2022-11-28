# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  post 'pusher/auth', to: 'pusher#auth'

  scope :api, defaults: { format: :json } do
    resources :users, only: %i[create update]

    resource :session, only: %i[create destroy]

    resources :projects, only: %i[index show create update destroy] do
      resources :stories, only: %i[create index]
    end

    resources :memberships, only: %i[create index]
    resources :stories, only: %i[show update destroy] do
      post '/follow_story', to: 'stories#follow_story'
      resources :comments, only: %i[create index]
      resources :tasks, only: %i[create index]
      resources :blockers, only: %i[create index]
      resources :links, only: %i[create index]
      patch '/prioritize', to: 'stories#prioritize'
    end

    get '/find_follow/:id', to: 'stories#find_follow'

    resources :tasks, only: %i[update destroy]
    resources :blockers, only: %i[update destroy]
    resources :links, only: %i[update destroy]
    resources :labels, only: %i[index create update destroy]
  end
  resources :reviews, only: [:index]
end
