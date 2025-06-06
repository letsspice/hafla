class ApplicationController < ActionController::Base
  before_action :load_organization_by_subdomain
  before_action :authenticate_user!, if: :admin_request?
  before_action :ensure_organization_profile_complete, if: -> { admin_request? && user_signed_in? }

  private

  def admin_request?
    request.subdomain.blank? || request.subdomain == 'www'
  end

  def ensure_organization_profile_complete
    return if skip_organization_check?
    return unless current_user.organizations.empty?

    redirect_to new_organization_admin_organization_path,
                alert: 'Please complete your organization profile to continue.'
  end

  def skip_organization_check?
    devise_controller? ||
      request.path == new_organization_admin_organization_path ||
      request.path == destroy_user_session_path ||
      (controller_name == 'organizations' && action_name == 'create')
  end

  def load_organization_by_subdomain
    return if request.subdomain.blank? || request.subdomain == 'www'

    @organization = Organization.find_by(subdomain: request.subdomain)

    return if @organization

    render plain: 'Organization not found', status: :not_found
  end

  def user_not_authorized
    flash[:alert] = 'You are not authorized to perform this action.'
    redirect_to(request.referer || root_path)
  end
end
