class OrganizationAdmin::OrganizationsController < ApplicationController
  before_action :authorize_organization_admin
  before_action :set_organization, except: %i[new create]

  def new
    @organization = current_user.organizations.build
    @organization.build_organization_profile
  end

  def create
    @organization = current_user.organizations.build(organization_params)
    respond_to do |format|
      if @organization.save
        format.html do
          session[:organization_id] = @organization.id
          redirect_to organization_admin_organization_path(@organization.slug),
                      notice: 'Organization created successfully.'
        end
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private

  def organization_params
    params.require(:organization).permit(
      :name,
      organization_profile_attributes: %i[city country currency phone timezone phone_code]
    )
  end

  def authorize_organization_admin
    return if current_user.org_admin?

    redirect_to root_path, alert: 'You are not authorized to access this page.'
  end

  def set_organization
    @organization = current_user.organizations.friendly.find(params[:id])
  end
end
