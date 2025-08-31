import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["logoInput", "coverImageInput"]

  connect() {
    console.log("Brand Assets controller connected")
  }

  // Logo handling
  previewLogo(event) {
    const file = event.target.files[0]
    if (file) {
      this.previewImage(file, 'logo-preview')
    }
  }

  removeLogo(event) {
    event.preventDefault()
    const preview = document.getElementById('logo-preview')
    preview.innerHTML = `
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="mt-2 text-sm text-gray-600">No logo uploaded</p>
      </div>
    `
    
    // Clear the file input
    if (this.hasLogoInputTarget) {
      this.logoInputTarget.value = ''
    }
  }

  // Cover image handling
  previewCoverImage(event) {
    const file = event.target.files[0]
    if (file) {
      this.previewImage(file, 'cover-image-preview')
    }
  }

  removeCoverImage(event) {
    event.preventDefault()
    const preview = document.getElementById('cover-image-preview')
    preview.innerHTML = `
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="mt-2 text-sm text-gray-600">No cover image uploaded</p>
      </div>
    `
    
    // Clear the file input
    if (this.hasCoverImageInputTarget) {
      this.coverImageInputTarget.value = ''
    }
  }

  // Generic image preview function
  previewImage(file, previewId) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      const preview = document.getElementById(previewId)
      
      reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" class="max-h-full max-w-full object-contain rounded" alt="Preview">`
      }
      
      reader.readAsDataURL(file)
    }
  }

  // Color management
  updateRGB(event) {
    const input = event.target
    const colorType = input.dataset.colorType
    const rgbComponent = input.dataset.rgb
    const value = parseInt(input.value) || 0
    
    // Clamp value between 0 and 255
    const clampedValue = Math.max(0, Math.min(255, value))
    input.value = clampedValue
    
    this.updateColorFromRGB(colorType, rgbComponent, clampedValue)
  }

  updateColorFromRGB(colorType, component, value) {
    // Get current RGB values from the same color type group
    const colorGroup = document.querySelector(`[data-color-type="${colorType}"]`).closest('.color-group') || document.querySelector(`[data-color-type="${colorType}"]`)
    const r = parseInt(colorGroup.querySelector('[data-rgb="r"]').value) || 0
    const g = parseInt(colorGroup.querySelector('[data-rgb="g"]').value) || 0
    const b = parseInt(colorGroup.querySelector('[data-rgb="b"]').value) || 0
    
    // Convert to hex
    const hex = this.rgbToHex(r, g, b)
    
    // Update color swatch
    const colorSwatch = document.querySelector(`[data-color-type="${colorType}"]`)
    if (colorSwatch) {
      colorSwatch.style.backgroundColor = hex
    }
    
    // Update hex display
    this.updateHexDisplay(colorType, hex)
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  updateHexDisplay(colorType, hex) {
    const hexDisplay = document.querySelector(`[data-settings-target="${colorType}ColorHex"]`)
    if (hexDisplay) {
      hexDisplay.textContent = hex
    }
  }

  updateHex(event) {
    const input = event.target
    const colorType = input.dataset.colorType
    const hex = input.value
    
    if (this.isValidHex(hex)) {
      const rgb = this.hexToRgb(hex)
      if (rgb) {
        // Update RGB inputs
        this.updateRGBFromHex(colorType, hex)
        // Update color swatch
        const colorSwatch = document.querySelector(`[data-color-type="${colorType}"]`)
        if (colorSwatch) {
          colorSwatch.style.backgroundColor = hex
        }
      }
    }
  }

  isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  updateRGBFromHex(colorType, hex) {
    const rgb = this.hexToRgb(hex)
    if (rgb) {
      const colorGroup = document.querySelector(`[data-color-type="${colorType}"]`).closest('.color-group') || document.querySelector(`[data-color-type="${colorType}"]`)
      if (colorGroup) {
        const rInput = colorGroup.querySelector('[data-rgb="r"]')
        const gInput = colorGroup.querySelector('[data-rgb="g"]')
        const bInput = colorGroup.querySelector('[data-rgb="b"]')
        
        if (rInput) rInput.value = rgb.r
        if (gInput) gInput.value = rgb.g
        if (bInput) bInput.value = rgb.b
      }
    }
  }

  // Form submission handling
  beforeSubmit(event) {
    // You can add validation here if needed
    console.log("Submitting brand assets form...")
  }
}
