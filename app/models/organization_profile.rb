# == Schema Information
#
# Table name: organization_profiles
#
#  id              :uuid             not null, primary key
#  city            :string           not null
#  country         :string           not null
#  currency        :string           not null
#  phone           :string           not null
#  phone_code      :string           not null
#  timezone        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :uuid             not null
#
# Indexes
#
#  index_organization_profiles_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
class OrganizationProfile < ApplicationRecord

  # associations
  belongs_to :organization

  # validations
  validates :city, presence: true
  validates :country, presence: true
  validates :currency, presence: true
  validates :phone_code, presence: true
  validates :phone, presence: true,
                    format: { with: /\A\d{7,15}\z/, message: "must be between 7 and 15 digits" },
                    uniqueness: { scope: :phone_code }
  validates :timezone, presence: true

  # callbacks
  before_validation :normalize_phone

  private

  def normalize_phone
    self.phone = phone.gsub(/\D/, '') if phone.present?
  end
end
