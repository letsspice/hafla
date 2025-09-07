class OrganizationAdmin::OrganizationsController < ApplicationController
  before_action :authorize_organization_admin
  before_action :set_organization, except: %i[new create]

  def new
    @organization = current_user.organizations.build
    @organization.build_organization_profile
    @organization.build_organization_brand_assets
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

  def update
    @organization = current_user.organizations.friendly.find(params[:id])
    respond_to do |format|
      if @organization.update(organization_params)
        format.html do
          redirect_to settings_organization_admin_organization_path(@organization.slug),
                      notice: 'Details updated successfully.'
        end
        format.json { render :show, status: :ok, location: @organization }
      else
        format.html { render :settings, status: :unprocessable_entity }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @organization = current_user.organizations.friendly.find(params[:id])
  end

  def show
    @organization = current_user.organizations.friendly.find(params[:id])
  end

  def settings
    return unless @organization.organization_brand_asset.blank?

    @organization.organization_brand_asset = OrganizationBrandAsset.new
    @organization.organization_brand_asset.save!
  end

  private

  def organization_params
    params.require(:organization).permit(
      :name,
      organization_profile_attributes: %i[city country currency phone timezone phone_code],
      organization_brand_asset_attributes: %i[
        id logo cover_image slogan
        facebook_url twitter_url tiktok_url youtube_url
        instagram_url linkedin_url pinterest_url
        discord_url snapchat_url spotify_url threads_url
        whatsapp_url primary_color secondary_color description
      ]
    )
  end

  def authorize_organization_admin
    return if current_user.org_admin?

    redirect_to root_path, alert: 'You are not authorized to access this page.'
  end

  def set_organization
    @organization = current_user.organizations.friendly.find(params[:id])
    @organization_profile = @organization.organization_profile
    @organizations = current_user.organizations
  end
end
