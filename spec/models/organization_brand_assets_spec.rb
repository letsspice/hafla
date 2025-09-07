require 'rails_helper'

RSpec.describe OrganizationBrandAssets, type: :model do
  let(:user) { create(:user) }
  let(:organization) { create(:organization, user: user) }
  let(:brand_assets) { build(:organization_brand_assets, organization: organization) }

  describe 'associations' do
    it { should belong_to(:organization) }

    it 'has Active Storage attachments for logo files' do
      expect(brand_assets).to respond_to(:logo_heic_file)
      expect(brand_assets).to respond_to(:logo_webp_file)
      expect(brand_assets).to respond_to(:logo_svg_file)
      expect(brand_assets).to respond_to(:logo_png_file)
      expect(brand_assets).to respond_to(:logo_jpg_file)
    end

    it 'has Active Storage attachments for cover image files' do
      expect(brand_assets).to respond_to(:cover_image_heic_file)
      expect(brand_assets).to respond_to(:cover_image_webp_file)
      expect(brand_assets).to respond_to(:cover_image_svg_file)
      expect(brand_assets).to respond_to(:cover_image_png_file)
      expect(brand_assets).to respond_to(:cover_image_jpg_file)
    end
  end

  describe 'validations' do
    it { should validate_presence_of(:organization_id) }
    it { should validate_uniqueness_of(:organization_id) }

    it 'validates primary_color format' do
      brand_assets.primary_color = '#FF0000'
      expect(brand_assets).to be_valid

      brand_assets.primary_color = 'invalid'
      expect(brand_assets).not_to be_valid
      expect(brand_assets.errors[:primary_color]).to include('must be a valid hex color code')
    end

    it 'validates secondary_color format' do
      brand_assets.secondary_color = '#00FF00'
      expect(brand_assets).to be_valid

      brand_assets.secondary_color = 'invalid'
      expect(brand_assets).not_to be_valid
      expect(brand_assets.errors[:secondary_color]).to include('must be a valid hex color code')
    end

    it 'validates slogan length' do
      brand_assets.slogan = 'A' * 256
      expect(brand_assets).not_to be_valid
      expect(brand_assets.errors[:slogan]).to include('is too long (maximum is 255 characters)')
    end

    it 'validates social media URLs' do
      brand_assets.instagram_url = 'https://instagram.com/username'
      expect(brand_assets).to be_valid

      brand_assets.instagram_url = 'invalid-url'
      expect(brand_assets).not_to be_valid
      expect(brand_assets.errors[:instagram_url]).to include('must be a valid URL')
    end
  end

  describe 'custom validations' do
    context 'logo validation' do
      it 'requires at least one logo format' do
        expect(brand_assets).not_to be_valid
        expect(brand_assets.errors[:base]).to include('At least one logo format must be provided')
      end

      it 'is valid with at least one logo format' do
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake image content'),
          filename: 'logo.png',
          content_type: 'image/png'
        )
        expect(brand_assets).to be_valid
      end
    end

    context 'cover image validation' do
      it 'requires at least one cover image format' do
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake image content'),
          filename: 'logo.png',
          content_type: 'image/png'
        )
        expect(brand_assets).not_to be_valid
        expect(brand_assets.errors[:base]).to include('At least one cover image format must be provided')
      end

      it 'is valid with at least one cover image format' do
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake image content'),
          filename: 'logo.png',
          content_type: 'image/png'
        )
        brand_assets.cover_image_png_file.attach(
          io: StringIO.new('fake cover image content'),
          filename: 'cover.png',
          content_type: 'image/png'
        )
        expect(brand_assets).to be_valid
      end
    end

    context 'file format validation' do
      it 'validates logo file format' do
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake image content'),
          filename: 'logo.jpg',
          content_type: 'image/jpeg'
        )
        expect(brand_assets).not_to be_valid
        expect(brand_assets.errors[:logo_png_file]).to include('must be a PNG file')
      end

      it 'validates cover image file format' do
        brand_assets.logo_png_file.attach(
          io: StringIO.new('fake image content'),
          filename: 'logo.png',
          content_type: 'image/png'
        )
        brand_assets.cover_image_png_file.attach(
          io: StringIO.new('fake cover image content'),
          filename: 'cover.jpg',
          content_type: 'image/jpeg'
        )
        expect(brand_assets).not_to be_valid
        expect(brand_assets.errors[:cover_image_png_file]).to include('must be a PNG file')
      end
    end
  end

  describe 'instance methods' do
    before do
      brand_assets.logo_png_file.attach(
        io: StringIO.new('fake image content'),
        filename: 'logo.png',
        content_type: 'image/png'
      )
      brand_assets.cover_image_png_file.attach(
        io: StringIO.new('fake cover image content'),
        filename: 'cover.png',
        content_type: 'image/png'
      )
    end

    describe '#primary_logo' do
      it 'returns the primary logo file' do
        expect(brand_assets.primary_logo).to eq(brand_assets.logo_png_file)
      end

      it 'prefers SVG over other formats' do
        brand_assets.logo_svg_file.attach(
          io: StringIO.new('fake svg content'),
          filename: 'logo.svg',
          content_type: 'image/svg+xml'
        )
        expect(brand_assets.primary_logo).to eq(brand_assets.logo_svg_file)
      end
    end

    describe '#primary_cover_image' do
      it 'returns the primary cover image file' do
        expect(brand_assets.primary_cover_image).to eq(brand_assets.cover_image_png_file)
      end

      it 'prefers SVG over other formats' do
        brand_assets.cover_image_svg_file.attach(
          io: StringIO.new('fake svg content'),
          filename: 'cover.svg',
          content_type: 'image/svg+xml'
        )
        expect(brand_assets.primary_cover_image).to eq(brand_assets.cover_image_svg_file)
      end
    end

    describe '#available_logo_formats' do
      it 'returns available logo formats' do
        expect(brand_assets.available_logo_formats).to include('PNG')
      end
    end

    describe '#available_cover_image_formats' do
      it 'returns available cover image formats' do
        expect(brand_assets.available_cover_image_formats).to include('PNG')
      end
    end

    describe '#active_social_links' do
      it 'returns only present social media links' do
        brand_assets.instagram_url = 'https://instagram.com/username'
        brand_assets.twitter_url = 'https://twitter.com/username'

        expect(brand_assets.active_social_links).to include(
          instagram: 'https://instagram.com/username',
          twitter: 'https://twitter.com/username'
        )
        expect(brand_assets.active_social_links).not_to include(:facebook)
      end
    end

    describe '#has_social_links?' do
      it 'returns true when social links are present' do
        brand_assets.instagram_url = 'https://instagram.com/username'
        expect(brand_assets.has_social_links?).to be true
      end

      it 'returns false when no social links are present' do
        expect(brand_assets.has_social_links?).to be false
      end
    end
  end
end
