# == Schema Information
#
# Table name: organizations
#
#  id         :uuid             not null, primary key
#  name       :string
#  slug       :string
#  subdomain  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_organizations_on_subdomain  (subdomain) UNIQUE
#  index_organizations_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Organization < ApplicationRecord
  # concerns
  include Sluggable

  # class methods
  friendly_slug_scope to_slug: :name

  # associations
  belongs_to :user
  has_one :organization_profile, dependent: :destroy
  has_one :organization_brand_asset, dependent: :destroy
  accepts_nested_attributes_for :organization_profile
  accepts_nested_attributes_for :organization_brand_asset

  # validations
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :subdomain, presence: true, uniqueness: true

  # callbacks
  before_validation :set_subdomain
  before_save :set_organization_brand_asset

  # instance methods
  def initials
    name.split.map(&:first).join.upcase
  end

  private

  def set_subdomain
    return unless subdomain.blank?

    base_subdomain = name.to_s.parameterize
    candidate = base_subdomain
    candidate = "#{base_subdomain}-#{SecureRandom.hex(4)}" while Organization.exists?(subdomain: candidate)
    self.subdomain = candidate
  end

  def set_organization_brand_asset
    self.organization_brand_asset = OrganizationBrandAsset.new
    self.organization_brand_asset.save!
  end
end
