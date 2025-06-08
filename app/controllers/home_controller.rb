# app/controllers/home_controller.rb
class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.org_admin?
      redirect_to organization_admin_organization_path(current_user.organizations.first)
    else
      render :index
    end
  end
end
