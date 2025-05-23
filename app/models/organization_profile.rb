# == Schema Information
#
# Table name: organization_profiles
#
#  id              :uuid             not null, primary key
#  city            :string           not null
#  country         :string           not null
#  currency        :string           not null
#  phone           :string           not null
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
end
