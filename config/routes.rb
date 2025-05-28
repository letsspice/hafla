Rails.application.routes.draw do

  get "up" => "rails/health#show", as: :rails_health_check

  constraints subdomain: /.+/ do
    root to: 'organizations#show', as: :organization_root
  end

  root "organizations#index"

  devise_for :users
  resources :organizations
  resources :organization_profiles

  namespace :admin do
    root to: 'dashboard#index'
  end

end
