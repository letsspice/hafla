class AddDescriptionToOrganizationProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :organization_profiles, :description, :text
  end
end
