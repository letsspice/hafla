// app/javascript/controllers/dropdown_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "icon"]

  connect() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside.bind(this))
  }

  disconnect() {
    document.removeEventListener('click', this.handleClickOutside.bind(this))
  }

  toggle(event) {
    event.stopPropagation()
    
    if (this.menuTarget.classList.contains('opacity-0')) {
      this.show()
    } else {
      this.hide()
    }
  }

  show() {
    this.menuTarget.classList.remove('opacity-0', 'invisible')
    this.menuTarget.classList.add('opacity-100', 'visible')
    this.iconTarget.style.transform = 'rotate(180deg)'
  }

  hide() {
    this.menuTarget.classList.add('opacity-0', 'invisible')
    this.menuTarget.classList.remove('opacity-100', 'visible')
    this.iconTarget.style.transform = 'rotate(0deg)'
  }

  handleClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.hide()
    }
  }

  selectSocialLink(event) {
    const platform = event.currentTarget.dataset.platform
    this.hide()
    
    // Here you can add logic to add the selected social platform
    // For now, we'll just log it
    console.log(`Selected platform: ${platform}`)
    
    // You can trigger an action to add the social link
    // this.dispatch('socialLinkSelected', { detail: { platform } })
  }
}

