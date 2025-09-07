# Organization Brand Assets

The Organization Brand Assets model handles all brand-related assets for organizations, including logos, colors, cover images, descriptions, slogans, and social media links.

## Features

### Logo Management
- Supports multiple formats: HEIC, WebP, SVG, PNG, JPG
- Recommended minimum width: 512 pixels
- At least one logo format must be provided
- Priority order: SVG > PNG > JPG > WebP > HEIC

### Color Management
- Primary and secondary brand colors
- Hex color format validation (e.g., #FF0000)
- Optional fields

### Cover Image Management
- Supports multiple formats: HEIC, WebP, SVG, PNG, JPG
- Recommended minimum dimensions: 1920×1080 pixels
- At least one cover image format must be provided
- Priority order: SVG > PNG > JPG > WebP > HEIC

### Text Content
- **Description**: Business description (stored in Organization Profile)
- **Slogan**: Brand statement or tagline (max 255 characters)

### Social Media Links
- Instagram, Twitter, Facebook, TikTok, YouTube
- Snapchat, LinkedIn, Discord, Spotify, Threads
- URL format validation
- Optional fields

## Database Schema

The model creates a new table `organization_brand_assets` with:

- UUID primary key
- Foreign key to organizations table
- Logo fields (UUID references for Active Storage)
- Color fields (hex format)
- Cover image fields (UUID references for Active Storage)
- Description and slogan fields
- Social media URL fields
- Timestamps

## Usage Examples

### Creating Brand Assets

```ruby
# Create brand assets for an organization
organization = Organization.find(id)
brand_assets = organization.build_organization_brand_assets(
  primary_color: '#FF0000',
  secondary_color: '#00FF00',
  slogan: 'Excellence in everything we do',
  instagram_url: 'https://instagram.com/org',
  twitter_url: 'https://twitter.com/org'
)

# Attach logo files
brand_assets.logo_png_file.attach(
  io: File.open('path/to/logo.png'),
  filename: 'logo.png',
  content_type: 'image/png'
)

# Attach cover image
brand_assets.cover_image_png_file.attach(
  io: File.open('path/to/cover.png'),
  filename: 'cover.png',
  content_type: 'image/png'
)

brand_assets.save!
```

### Accessing Brand Assets

```ruby
organization = Organization.find(id)

# Get brand assets
brand_assets = organization.organization_brand_assets

# Get primary logo (best available format)
primary_logo = brand_assets.primary_logo

# Get primary cover image (best available format)
primary_cover = brand_assets.primary_cover_image

# Get available logo formats
available_formats = brand_assets.available_logo_formats

# Get active social media links
social_links = brand_assets.active_social_links

# Check if social links exist
has_social = brand_assets.has_social_links?
```

### Validation

The model includes comprehensive validation:

- At least one logo format must be provided
- At least one cover image format must be provided
- Colors must be valid hex format
- Social media URLs must be valid URLs
- File types must match their respective fields
- File size limit: 10MB per image

### Nested Attributes

Organizations can accept nested attributes for brand assets:

```ruby
# In Organization model
accepts_nested_attributes_for :organization_brand_assets

# Usage
organization.update(
  organization_brand_assets_attributes: {
    primary_color: '#FF0000',
    slogan: 'New slogan'
  }
)
```

## File Storage

All image files are stored using Active Storage, which provides:

- Automatic file processing
- Multiple storage backends (local, S3, etc.)
- Image variants and transformations
- Secure file access

## Migration

To apply the database changes:

```bash
# Run the migration
rails db:migrate
```

The migration will:
- Create the `organization_brand_assets` table
- Add the `description` field to `organization_profiles`
- Set up all necessary indexes and constraints
- Ensure data integrity with database-level validations

## Testing

The model includes comprehensive RSpec tests covering:

- Associations
- Validations
- Custom validation methods
- Instance methods
- File attachments
- Error handling

Run tests with:

```bash
rspec spec/models/organization_brand_assets_spec.rb
```

## Best Practices

1. **Logo Formats**: Provide multiple formats for better compatibility
2. **Image Quality**: Use high-resolution images (512px+ for logos, 1920x1080+ for covers)
3. **Color Consistency**: Ensure brand colors are consistent across all assets
4. **File Optimization**: Optimize images for web use while maintaining quality
5. **Social Media**: Keep social media links updated and valid

## Related Models

- **Organization**: Parent model with `has_one :organization_brand_assets`
- **OrganizationProfile**: Contains business description field
- **User**: Owner of the organization

## Future Enhancements

Potential improvements could include:

- Image processing and optimization
- Brand guidelines templates
- Asset versioning
- Bulk asset import/export
- CDN integration
- Asset analytics and usage tracking
