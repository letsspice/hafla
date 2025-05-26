class OrganizationsController < ApplicationController
  def new
    @organization = current_user.organizations.new
  end

  def create
    @organization = current_user.organizations.new(organization_params)
    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'Organization created successfully.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private

  def organization_params
    params.require(:organization).permit(
      :name,
      organization_profile_attributes: [:city, :country, :currency, :phone, :timezone, :phone_code]
    )
  end
end
