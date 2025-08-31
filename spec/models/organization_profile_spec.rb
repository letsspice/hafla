# == Schema Information
#
# Table name: organization_profiles
#
#  id              :uuid             not null, primary key
#  city            :string           not null
#  country         :string           not null
#  currency        :string           not null
#  description     :text
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
require 'rails_helper'

RSpec.describe OrganizationProfile, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
