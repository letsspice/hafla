class AddMissingSocialMediaFields < ActiveRecord::Migration[7.1]
  def change
    add_column :organization_brand_assets, :pinterest_url, :string, limit: 500
    add_column :organization_brand_assets, :whatsapp_url, :string, limit: 500
  end
end
