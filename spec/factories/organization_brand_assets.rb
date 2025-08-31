# == Schema Information
#
# Table name: organization_brand_assets
#
#  id              :uuid             not null, primary key
#  description     :text
#  discord_url     :string(500)
#  facebook_url    :string(500)
#  instagram_url   :string(500)
#  linkedin_url    :string(500)
#  primary_color   :string(7)
#  secondary_color :string(7)
#  slogan          :string(255)
#  snapchat_url    :string(500)
#  spotify_url     :string(500)
#  threads_url     :string(500)
#  tiktok_url      :string(500)
#  twitter_url     :string(500)
#  youtube_url     :string(500)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :uuid             not null
#
# Indexes
#
#  index_organization_brand_assets_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id) ON DELETE => cascade
#
FactoryBot.define do
  factory :organization_brand_assets do
    association :organization
    
    # Colors
    primary_color { '#FF0000' }
    secondary_color { '#00FF00' }
    
    # Description and slogan
    description { 'A leading organization in the industry' }
    slogan { 'Excellence in everything we do' }
    
    # Social media links
    instagram_url { 'https://instagram.com/organization' }
    twitter_url { 'https://twitter.com/organization' }
    facebook_url { 'https://facebook.com/organization' }
    linkedin_url { 'https://linkedin.com/company/organization' }
    
    # Logo and cover image attachments will be added in tests as needed
    # since they require actual file attachments
    
    trait :with_logo do
      after(:build) do |brand_assets|
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake logo content'),
          filename: 'logo.png',
          content_type: 'image/png'
        )
      end
    end
    
    trait :with_cover_image do
      after(:build) do |brand_assets|
        brand_assets.cover_image_png_file.attach(
          io: StringIO.new('fake cover image content'),
          filename: 'cover.png',
          content_type: 'image/png'
        )
      end
    end
    
    trait :complete do
      with_logo
      with_cover_image
    end
  end
end
