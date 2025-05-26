class OrganizationsController < ApplicationController
  def new
    @organization = Organization.new
    @organization.build_organization_profile
  end

  def create
    @organization = Organization.new(organization_params)
    if @organization.save
      redirect_to @organization, notice: 'Organization created successfully.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def organization_params
    params.require(:organization).permit(
      :name,
      organization_profile_attributes: [:city, :country, :currency, :phone, :timezone]
    )
  end
end
