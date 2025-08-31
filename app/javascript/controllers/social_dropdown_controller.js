import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "icon"]

  connect() {
    console.log('Social Dropdown Controller: Connected')
    console.log('Social Dropdown Controller: Available targets:', this.targets)
    console.log('Social Dropdown Controller: Has menu target:', this.hasMenuTarget)
    console.log('Social Dropdown Controller: Has icon target:', this.hasIconTarget)
    
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside.bind(this))
  }

  disconnect() {
    document.removeEventListener('click', this.handleClickOutside.bind(this))
  }

  toggle(event) {
    event.stopPropagation()
    
    if (this.hasMenuTarget && this.menuTarget.classList.contains('opacity-0')) {
      this.show()
    } else {
      this.hide()
    }
  }

  show() {
    if (this.hasMenuTarget) {
      this.menuTarget.classList.remove('opacity-0', 'invisible')
      this.menuTarget.classList.add('opacity-100', 'visible')
    }
    
    if (this.hasIconTarget) {
      this.iconTarget.style.transform = 'rotate(180deg)'
    }
  }

  hide() {
    if (this.hasMenuTarget) {
      this.menuTarget.classList.add('opacity-0', 'invisible')
      this.menuTarget.classList.remove('opacity-100', 'visible')
    }
    
    if (this.hasIconTarget) {
      this.iconTarget.style.transform = 'rotate(0deg)'
    }
  }

  handleClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.hide()
    }
  }

  selectSocialLink(event) {
    const platform = event.currentTarget.dataset.platform
    console.log('Social Dropdown: Selecting platform:', platform)
    this.hide()
    
    // Dispatch a regular DOM event that bubbles up
    const customEvent = new CustomEvent('socialPlatformSelected', {
      detail: {
        platform: platform,
        platformName: this.getPlatformName(platform)
      },
      bubbles: true,
      composed: true
    })
    
    console.log('Social Dropdown: Dispatching DOM event for platform:', platform)
    this.element.dispatchEvent(customEvent)
  }

  getPlatformName(platform) {
    const platformNames = {
      'instagram': 'Instagram',
      'linkedin': 'LinkedIn',
      'pinterest': 'Pinterest',
      'snapchat': 'Snapchat',
      'whatsapp': 'WhatsApp',
      'discord': 'Discord'
    }
    return platformNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
  }
}
