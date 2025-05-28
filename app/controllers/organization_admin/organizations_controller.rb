class OrganizationAdmin::OrganizationsController < ApplicationController
   authorize OrganizationAdminPolicy

    def new
      @organization = current_user.organizations.build
      @organization.build_organization_profile
    end
  
    def create 
      @organization = current_user.organizations.build(organization_params)
      respond_to do |format|
        if @organization.save
          format.html { redirect_to organization_admin_root_path(@organization), notice: 'Organization created successfully.' }
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
  end
  