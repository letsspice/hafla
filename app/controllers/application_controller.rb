class ApplicationController < ActionController::Base
  before_action :authenticate_user!, unless: :devise_controller?
  before_action :ensure_organization_profile_complete, if: :user_signed_in?

  private

  def after_sign_up_path_for(_resource)
    new_organization_path
  end

  def ensure_organization_profile_complete
    return if devise_controller? || request.path == new_organization_path || request.path == destroy_user_session_path

    return unless current_user.organizations.empty?

    redirect_to new_organization_path, alert: 'Please complete your organization profile to continue.'
  end
end
