Rails.application.routes.draw do

  get "up" => "rails/health#show", as: :rails_health_check

  constraints subdomain: /.+/ do
    root to: 'organizations#show', as: :organization_root
  end

  root "home#index"

  devise_for :users
  resources :organizations, only: [:index, :show]
  resources :organization_profiles

  namespace :organization_admin do
    resources :organizations
  end

end
