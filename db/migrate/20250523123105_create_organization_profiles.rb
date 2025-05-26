class CreateOrganizationProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :organization_profiles, id: :uuid do |t|
      t.references :organization, null: false, foreign_key: true, type: :uuid
      t.string :phone_code, null: false
      t.string :phone, null: false
      t.string :currency, null: false
      t.string :country, null: false
      t.string :city, null: false
      t.string :timezone, null: false

      t.timestamps
    end
  end
end
