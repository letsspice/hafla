class OrganizationsController < ApplicationController

  before_action :set_organization

  private

  def set_organization
    @organization = Organization.friendly.find(params[:id])
    @organizations = current_user.organizations
  end
end
