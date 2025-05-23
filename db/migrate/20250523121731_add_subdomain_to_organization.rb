class AddSubdomainToOrganization < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :subdomain, :string, null: false
    add_index :organizations, :subdomain, unique: true
  end
end
