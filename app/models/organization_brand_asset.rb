# == Schema Information
#
# Table name: organization_brand_assets
#
#  id              :uuid             not null, primary key
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
class OrganizationBrandAsset < ApplicationRecord
  # attachments
  has_one_attached :logo
  has_one_attached :cover_image

  # associations
  belongs_to :organization
end
