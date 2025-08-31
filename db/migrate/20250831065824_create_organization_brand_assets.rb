class CreateOrganizationBrandAssets < ActiveRecord::Migration[7.1]
  def change
    create_table :organization_brand_assets, id: :uuid do |t|
      t.references :organization, null: false, foreign_key: { on_delete: :cascade }, type: :uuid
      
      
      # Color fields
      t.string :primary_color, limit: 7 # Hex color code
      t.string :secondary_color, limit: 7 # Hex color code
      
      t.string :slogan, limit: 255
      t.text :description
      
      # Social media links
      t.string :instagram_url, limit: 500
      t.string :twitter_url, limit: 500
      t.string :facebook_url, limit: 500
      t.string :tiktok_url, limit: 500
      t.string :youtube_url, limit: 500
      t.string :snapchat_url, limit: 500
      t.string :linkedin_url, limit: 500
      t.string :discord_url, limit: 500
      t.string :spotify_url, limit: 500
      t.string :threads_url, limit: 500
      
      t.timestamps
    end
  end
end