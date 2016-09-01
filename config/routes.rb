Rails.application.routes.draw do
  # Routes for main resources
  resources :users
  resources :store_flavors
  resources :flavors
  resources :jobs
  resources :shift_jobs
  resources :shifts
  # Routes for main resources
  resources :stores
  resources :employees
  resources :assignments

  resources :sessions, :only => [:create]
  get 'login' => 'sessions#new', :as => :login
  get 'logout' => 'sessions#destroy', :as => :logout

  # Semi-static page routes
  get 'home' => 'home#home', as: :home
  get 'about' => 'home#about', as: :about
  get 'contact' => 'home#contact', as: :contact
  get 'privacy' => 'home#privacy', as: :privacy

  get '/shifts/:id/start_now' => 'shifts#start_now'
  get '/shifts/:id/end_now' => 'shifts#end_now'
  
  # Set the root url
  root :to => 'home#home'  
  
end
