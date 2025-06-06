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
  accepts_nested_attributes_for :organization_profile

  # validations
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :subdomain, presence: true, uniqueness: true

  # callbacks
  before_validation :set_subdomain

  private

  def set_subdomain
    return unless subdomain.blank?

    base_subdomain = name.to_s.parameterize
    candidate = base_subdomain
    candidate = "#{base_subdomain}-#{SecureRandom.hex(4)}" while Organization.exists?(subdomain: candidate)
    self.subdomain = candidate
  end
end
