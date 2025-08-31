import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["profileSection", "brandAssetsSection", "profileLink", "brandAssetsLink"]

  connect() {
    // Show profile section by default
    this.showSection("profile")
  }

  showSection(event) {
    event.preventDefault()
    const sectionName = event.currentTarget.dataset.section
    this.switchToSection(sectionName)
  }

  switchToSection(sectionName) {
    // Hide all sections
    this.profileSectionTarget.classList.add("hidden")
    this.brandAssetsSectionTarget.classList.add("hidden")
    
    // Remove active states from all links
    this.profileLinkTarget.classList.remove("bg-gray-100", "text-gray-900")
    this.profileLinkTarget.classList.add("text-gray-600", "hover:text-gray-900", "hover:bg-gray-50")
    this.brandAssetsLinkTarget.classList.remove("bg-gray-100", "text-gray-900")
    this.brandAssetsLinkTarget.classList.add("text-gray-600", "hover:text-gray-900", "hover:bg-gray-50")
    
    // Show selected section and activate link
    if (sectionName === "profile") {
      this.profileSectionTarget.classList.remove("hidden")
      this.profileLinkTarget.classList.remove("text-gray-600", "hover:text-gray-900", "hover:bg-gray-50")
      this.profileLinkTarget.classList.add("bg-gray-100", "text-gray-900")
    } else if (sectionName === "brand-assets") {
      this.brandAssetsSectionTarget.classList.remove("hidden")
      this.brandAssetsLinkTarget.classList.remove("text-gray-600", "hover:text-gray-900", "hover:bg-gray-50")
      this.brandAssetsLinkTarget.classList.add("bg-gray-100", "text-gray-900")
    }
  }
}
