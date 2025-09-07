import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template"]

  connect() {
    console.log('Social Links Controller: Connected')
    console.log('Social Links Controller: Available targets:', this.targets)
    console.log('Social Links Controller: Has container target:', this.hasContainerTarget)
    console.log('Social Links Controller: Has template target:', this.hasTemplateTarget)
    
    // Listen for DOM events that bubble up
    document.addEventListener('socialPlatformSelected', this.handleSocialPlatformSelected.bind(this))
    console.log('Social Links Controller: Listening for socialPlatformSelected events on document')
    
    // Initialize the dropdown to hide platforms that already have values
    this.initializeDropdown()
  }

  disconnect() {
    document.removeEventListener('socialPlatformSelected', this.handleSocialPlatformSelected.bind(this))
  }

  handleSocialPlatformSelected(event) {
    console.log('Social platform selected:', event.detail)
    const { platform, platformName } = event.detail
    
    // Check if this platform already exists
    if (this.platformExists(platform)) {
      this.showPlatform(platform)
      return
    }
    
    // Add new platform
    this.addSocialPlatform(platform, platformName)
    
    // Update the dropdown to hide this platform option
    this.updateDropdownAfterSelection(platform)
  }

  platformExists(platform) {
    return document.querySelector(`[data-social-platform="${platform}"]`) !== null
  }

  showPlatform(platform) {
    const platformElement = document.querySelector(`[data-social-platform="${platform}"]`)
    if (platformElement) {
      platformElement.classList.remove('hidden')
      platformElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  addSocialPlatform(platform, platformName) {
    console.log('Social Links Controller: Adding platform:', platform, platformName)
    const container = this.containerTarget
    
    if (!container) {
      console.error('Container not found')
      return
    }
    
    // Create a simple input field for now
    const newPlatform = document.createElement('div')
    newPlatform.className = 'flex items-start justify-between social-platform-item'
    newPlatform.dataset.socialPlatform = platform
    
    newPlatform.innerHTML = `
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-900 mb-2">${platformName}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div class="w-5 h-5 rounded-full flex items-center justify-center" style="background-color: ${this.getPlatformColor(platform)}">
              <i class="${this.getPlatformIconClass(platform)}"></i>
            </div>
          </div>
          <input type="url" 
                class="w-full text-sm border border-gray-300 rounded-md pl-10 pr-3 py-2 social-url-input" 
                name="organization[organization_brand_asset_attributes][${platform}_url]"
                placeholder="${this.getPlatformPlaceholder(platform)}">
        </div>
      </div>
      <button type="button" class="ml-4 text-red-600 hover:text-red-700 text-sm font-medium mt-8 remove-platform-btn" 
              data-platform="${platform}"
              data-action="click->social-links#removePlatform">Remove</button>
    `
    
    // Insert the new platform at the end of the container
    container.appendChild(newPlatform)
    
    // Scroll to the new platform
    newPlatform.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  removePlatform(event) {
    const platform = event.currentTarget.dataset.platform
    const platformElement = event.currentTarget.closest('.social-platform-item')
    
    if (platformElement) {
      // Hide the platform instead of removing it completely
      platformElement.classList.add('hidden')
      
      // Clear the input value
      const inputElement = platformElement.querySelector('.social-url-input')
      if (inputElement) {
        inputElement.value = ''
      }
    }
  }

  getPlatformColor(platform) {
    const colors = {
      'instagram': '#E4405F',
      'linkedin': '#0077B5',
      'pinterest': '#BD081C',
      'snapchat': '#FFFC00',
      'whatsapp': '#25D366',
      'discord': '#5865F2'
    }
    return colors[platform] || '#6B7280'
  }

  getPlatformIconClass(platform) {
    const iconClasses = {
      'instagram': 'fab fa-instagram text-white',
      'linkedin': 'fab fa-linkedin text-white',
      'pinterest': 'fab fa-pinterest text-white',
      'snapchat': 'fab fa-snapchat text-white',
      'whatsapp': 'fab fa-whatsapp text-white',
      'discord': 'fab fa-discord text-white'
    }
    return iconClasses[platform] || 'fas fa-link text-white'
  }

  getPlatformPlaceholder(platform) {
    const placeholders = {
      'instagram': 'https://instagram.com/username',
      'linkedin': 'https://linkedin.com/company/company-name',
      'pinterest': 'https://pinterest.com/username',
      'snapchat': 'https://snapchat.com/add/username',
      'whatsapp': 'https://wa.me/phone-number',
      'discord': 'https://discord.gg/invite-code'
    }
    return placeholders[platform] || `https://${platform}.com/username`
  }

  getExistingValue(platform) {
    // Try to get existing value from the form or data attributes
    const existingInput = document.querySelector(`input[name*="${platform}_url"]`)
    return existingInput ? existingInput.value : ''
  }

  testController() {
    console.log('Social Links Controller: Test method called')
    console.log('Container target:', this.containerTarget)
    console.log('Container target:', this.containerTarget)
    console.log('Template target:', this.templateTarget)
    
    // Test adding a platform manually
    this.addSocialPlatform('test', 'Test Platform')
  }

  initializeDropdown() {
    // Get all social platforms and check which ones already have values
    const platforms = ['instagram', 'linkedin', 'pinterest', 'snapchat', 'whatsapp', 'discord']
    
    platforms.forEach(platform => {
      if (this.hasExistingValue(platform)) {
        this.hideDropdownOption(platform)
        this.showExistingPlatform(platform)
      }
    })
  }

  hasExistingValue(platform) {
    const input = document.querySelector(`input[name*="${platform}_url"]`)
    return input && input.value && input.value.trim() !== ''
  }

  hideDropdownOption(platform) {
    const dropdownOption = document.querySelector(`[data-platform="${platform}"]`)
    if (dropdownOption) {
      dropdownOption.style.display = 'none'
      console.log(`Hidden dropdown option for ${platform}`)
    }
  }

  showExistingPlatform(platform) {
    // Check if the platform element already exists and is visible
    const existingElement = document.querySelector(`[data-social-platform="${platform}"]`)
    if (existingElement && existingElement.classList.contains('hidden')) {
      existingElement.classList.remove('hidden')
      console.log(`Showed existing platform: ${platform}`)
    }
  }

  updateDropdownAfterSelection(platform) {
    // Hide the selected platform from the dropdown
    this.hideDropdownOption(platform)
    
    // Show the platform in the social links section if it was hidden
    this.showExistingPlatform(platform)
  }
}
