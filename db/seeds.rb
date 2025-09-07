# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Seeding database..."

# Create a User
puts "Creating user..."
User.create!(
  email: "aggie@thelore.ke",
  password: "password",
  password_confirmation: "password"
)

# Create an Organization
puts "Creating organization..."
Organization.create!(
  name: "The Lore KE",
  user_id: User.first.id
)

# Create an Organization Profile
puts "Creating organization profile..."
OrganizationProfile.create!(
  organization_id: Organization.first.id,
  phone_code: "+254",
  phone: "1234567890",
  currency: "KES",
  country: "KE",
  city: "Nairobi",
  timezone: "Africa/Nairobi"
)

puts "Database seeded successfully!"
puts "User: #{User.first.email} , Password: password"