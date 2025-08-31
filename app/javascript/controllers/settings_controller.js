import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["profileSection", "brandAssetsSection", "profileLink", "brandAssetsLink", "primaryColorHex", "secondaryColorHex", "primaryColorHandle", "secondaryColorHandle", "primaryHueHandle", "secondaryHueHandle"]

  connect() {
    // Check if there's a saved section preference
    const savedSection = localStorage.getItem('settingsActiveSection')
    
    if (savedSection && (savedSection === 'profile' || savedSection === 'brand-assets')) {
      this.switchToSection(savedSection)
    } else {
      // Show profile section by default if no preference saved
      this.switchToSection("profile")
    }
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
    
    // Save the current section to localStorage
    localStorage.setItem('settingsActiveSection', sectionName)
  }

  startColorDrag(event) {
    const colorArea = event.currentTarget
    const colorType = colorArea.dataset.colorType
    const handle = this.getColorHandle(colorType)
    
    const handleDrag = (e) => {
      const rect = colorArea.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      
      handle.style.left = `${x * 100}%`
      handle.style.top = `${y * 100}%`
      
      this.updateColorFromPosition(colorType, x, y)
    }
    
    const stopDrag = () => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', stopDrag)
    }
    
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  selectHue(event) {
    const hueSlider = event.currentTarget
    const colorType = hueSlider.dataset.colorType
    const handle = this.getHueHandle(colorType)
    
    const rect = hueSlider.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    
    handle.style.left = `${x * 100}%`
    this.updateHue(colorType, x)
  }

  updateRGB(event) {
    const input = event.target
    const colorType = input.dataset.colorType
    const rgbComponent = input.dataset.rgb
    const value = parseInt(input.value) || 0
    
    this.updateColorFromRGB(colorType, rgbComponent, value)
  }

  updateHex(event) {
    const input = event.target
    const colorType = input.dataset.colorType
    const hexValue = input.value
    
    // Validate hex format
    if (this.isValidHex(hexValue)) {
      this.updateColorDisplay(colorType, hexValue)
      this.updateRGBFromHex(colorType, hexValue)
    }
  }

  isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
  }

  updateRGBFromHex(colorType, hex) {
    const rgb = this.hexToRgb(hex)
    if (rgb) {
      // Update RGB input fields
      const rgbInputs = document.querySelectorAll(`[data-color-type="${colorType}"][data-rgb]`)
      rgbInputs.forEach(input => {
        const component = input.dataset.rgb
        input.value = rgb[component]
      })
    }
  }

  updateHexInput(colorType, hex) {
    // Update hex input field
    const hexInput = document.querySelector(`[data-color-type="${colorType}"][data-action*="updateHex"]`)
    if (hexInput) {
      hexInput.value = hex
    }
  }

  getColorHandle(colorType) {
    if (colorType === 'primary') {
      return this.primaryColorHandleTarget
    } else if (colorType === 'secondary') {
      return this.secondaryColorHandleTarget
    }
  }

  getHueHandle(colorType) {
    if (colorType === 'primary') {
      return this.primaryHueHandleTarget
    } else if (colorType === 'secondary') {
      return this.secondaryHueHandleTarget
    }
  }

  updateColorFromPosition(colorType, x, y) {
    // Convert position to HSL and then to hex
    const hue = this.getCurrentHue(colorType)
    const saturation = x * 100
    const lightness = (1 - y) * 100
    
    const hex = this.hslToHex(hue, saturation, lightness)
    this.updateColorDisplay(colorType, hex)
  }

  updateHue(colorType, huePosition) {
    const hue = huePosition * 360
    const currentColor = this.getCurrentColor(colorType)
    const { saturation, lightness } = this.hexToHsl(currentColor)
    
    const hex = this.hslToHex(hue, saturation, lightness)
    this.updateColorDisplay(colorType, hex)
  }

  updateColorFromRGB(colorType, component, value) {
    const currentColor = this.getCurrentColor(colorType)
    const rgb = this.hexToRgb(currentColor)
    
    rgb[component] = value
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b)
    this.updateColorDisplay(colorType, hex)
    
    // Update hex input field
    this.updateHexInput(colorType, hex)
  }

  getCurrentHue(colorType) {
    const handle = this.getHueHandle(colorType)
    const left = parseFloat(handle.style.left) / 100
    return left * 360
  }

  getCurrentColor(colorType) {
    if (colorType === 'primary') {
      return this.primaryColorHexTarget.textContent
    } else if (colorType === 'secondary') {
      return this.secondaryColorHexTarget.textContent
    }
  }

  updateColorDisplay(colorType, hex) {
    // Update the color swatch
    const colorSwatch = document.querySelector(`[data-color-type="${colorType}"]`)
    colorSwatch.style.backgroundColor = hex
    
    // Update the hex display
    if (colorType === 'primary' && this.hasPrimaryColorHexTarget) {
      this.primaryColorHexTarget.textContent = hex
    } else if (colorType === 'secondary' && this.hasSecondaryColorHexTarget) {
      this.secondaryColorHexTarget.textContent = hex
    }
    
    // Update the data attribute
    colorSwatch.dataset.currentColor = hex
    
    // Save to server
    this.saveColorToServer(colorType, hex)
  }

  // Color conversion utilities
  hslToHex(h, s, l) {
    h /= 360
    s /= 100
    l /= 100
    
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h * 6) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0
    
    if (0 <= h && h < 1) {
      r = c; g = x; b = 0
    } else if (1 <= h && h < 2) {
      r = x; g = c; b = 0
    } else if (2 <= h && h < 3) {
      r = 0; g = c; b = x
    } else if (3 <= h && h < 4) {
      r = 0; g = x; b = c
    } else if (4 <= h && h < 5) {
      r = x; g = 0; b = c
    } else if (5 <= h && h < 6) {
      r = c; g = 0; b = x
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0')
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0')
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0')
    
    return `#${rHex}${gHex}${bHex}`
  }

  hexToHsl(hex) {
    const rgb = this.hexToRgb(hex)
    return this.rgbToHsl(rgb.r, rgb.g, rgb.b)
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  rgbToHsl(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  saveColorToServer(colorType, color) {
    // This method would typically make an AJAX call to save the color
    // For now, we'll just log it to the console
    console.log(`Saving ${colorType} color: ${color}`)
    
    // Example AJAX call (uncomment and modify as needed):
    /*
    fetch('/organization_admin/organizations/update_color', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({
        color_type: colorType,
        color: color
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Color saved successfully:', data)
    })
    .catch(error => {
      console.error('Error saving color:', error)
    })
    */
  }
}
