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
    
    // Initialize color pickers
    this.initializeColorPickers()
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

  selectPresetColor(event) {
    const colorElement = event.currentTarget
    const color = colorElement.dataset.color
    const colorType = colorElement.dataset.colorType
    
    console.log(`Preset color selected - Color: ${color}, Type: ${colorType}`)
    
    // Update the color display
    this.updateColorDisplay(colorType, color)
    
    // Update the hex input field
    this.updateHexInput(colorType, color)
    
    // Update RGB inputs
    this.updateRGBFromHex(colorType, color)
    
    // Add visual feedback
    colorElement.classList.add('ring-2', 'ring-blue-500')
    setTimeout(() => {
      colorElement.classList.remove('ring-2', 'ring-blue-500')
    }, 300)
  }

  initializeColorPickers() {
    
    // Initialize primary color picker
    const primaryColor = this.getCurrentColor('primary')
    if (primaryColor) {
      this.updateRGBFromHex('primary', primaryColor)
      // Ensure the hex input is properly set
      this.updateHexInput('primary', primaryColor)
    }
    
    // Initialize secondary color picker
    const secondaryColor = this.getCurrentColor('secondary')
    if (secondaryColor) {
      this.updateRGBFromHex('secondary', secondaryColor)
      // Ensure the hex input is properly set
      this.updateHexInput('secondary', secondaryColor)
    }
    
    // Force update form fields after a short delay to ensure they're properly set
    setTimeout(() => {
      this.updateHexInput('primary', this.getCurrentColor('primary'))
      this.updateHexInput('secondary', this.getCurrentColor('secondary'))
    }, 100)
  }

  updateFormFields(event) {
    console.log('Updating form fields before save...')
    
    // Update primary color form field
    const primaryColor = this.getCurrentColor('primary')
    this.updateHexInput('primary', primaryColor)
    
    // Update secondary color form field
    const secondaryColor = this.getCurrentColor('secondary')
    this.updateHexInput('secondary', secondaryColor)
    
    // Clean and validate all color form fields before submission
    this.cleanColorFormFields()
    
    console.log('Form fields updated and cleaned, proceeding with save...')
  }

  cleanColorFormFields() {
    // Clean primary color field
    const primaryField = document.querySelector('input[name*="primary_color"]')
    if (primaryField) {
      const cleanedValue = primaryField.value.trim()
      if (this.isValidHex(cleanedValue)) {
        primaryField.value = cleanedValue
        console.log(`Cleaned primary color: "${cleanedValue}"`)
      } else {
        primaryField.value = '#3B82F6'
        console.log('Invalid primary color, reset to default')
      }
    }
    
    // Clean secondary color field
    const secondaryField = document.querySelector('input[name*="secondary_color"]')
    if (secondaryField) {
      const cleanedValue = secondaryField.value.trim()
      if (this.isValidHex(cleanedValue)) {
        secondaryField.value = cleanedValue
        console.log(`Cleaned secondary color: "${cleanedValue}"`)
      } else {
        secondaryField.value = '#8B5CF6'
        console.log('Invalid secondary color, reset to default')
      }
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
    
    // Update hex input fields specifically marked as hex inputs
    const hexInputs = document.querySelectorAll(`[data-color-type="${colorType}"][data-input-type="hex"]`)
    hexInputs.forEach(input => {
      input.value = hex
    })
    
    // Also update any hex inputs with the action attribute as fallback
    const actionHexInputs = document.querySelectorAll(`[data-color-type="${colorType}"][data-action*="updateHex"]`)
    actionHexInputs.forEach(input => {
      if (!input.dataset.inputType || input.dataset.inputType === 'hex') {
        input.value = hex
      }
    })
    
    // Also try to find the form field by name attribute as a fallback
    const formField = document.querySelector(`input[name*="[${colorType}_color]"]`)
    if (formField) {
      formField.value = hex
    } else {
      console.log(`No form field found by name for ${colorType}_color`)
    }
    
    // Try to find the form field by the exact name pattern
    const exactFormField = document.querySelector(`input[name*="organization_brand_asset_attributes"][name*="${colorType}_color"]`)
    if (exactFormField) {
      exactFormField.value = hex
    } else {
      console.log(`No exact form field found for ${colorType}_color`)
    }
    
    // Log all form fields to debug
    const allFormFields = document.querySelectorAll('input[type="text"], input[type="hidden"]')
    allFormFields.forEach(field => {
      if (field.name && field.name.includes('color')) {
        console.log(`Form field: ${field.name} = ${field.value}`) //eslint-disable-line
      }
    })
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
    
    // Ensure values are within valid ranges
    const clampedSaturation = Math.max(0, Math.min(100, saturation))
    const clampedLightness = Math.max(0, Math.min(100, lightness))
    
    const hex = this.hslToHex(hue, clampedSaturation, clampedLightness)
    this.updateColorDisplay(colorType, hex)
  }

  updateHue(colorType, huePosition) {
    const hue = huePosition * 360
    const currentColor = this.getCurrentColor(colorType)
    const hsl = this.hexToHsl(currentColor)
  
    
    if (hsl && hsl.s !== undefined && hsl.l !== undefined) {
      const hex = this.hslToHex(hue, hsl.s, hsl.l)
      this.updateColorDisplay(colorType, hex)
    } else {
      // Fallback to default values if HSL conversion fails
      const hex = this.hslToHex(hue, 50, 50)
      this.updateColorDisplay(colorType, hex)
    }
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
    if (!handle || !handle.style.left) {
      return 0
    }
    
    const left = parseFloat(handle.style.left) / 100
    const hue = left * 360
    
    console.log(`Getting current hue - ColorType: ${colorType}, Left: ${handle.style.left}, Parsed: ${left}, Hue: ${hue}`)
    
    return hue
  }

  getCurrentColor(colorType) {
    if (colorType === 'primary') {
      if (this.hasPrimaryColorHexTarget) {
        const color = this.primaryColorHexTarget.textContent
        return color && color !== '' ? color : '#3B82F6'
      }
      return '#3B82F6'
    } else if (colorType === 'secondary') {
      if (this.hasSecondaryColorHexTarget) {
        const color = this.secondaryColorHexTarget.textContent
        return color && color !== '' ? color : '#8B5CF6'
      }
      return '#8B5CF6'
    }
  }

  updateColorDisplay(colorType, hex) {
    console.log(`Updating color display - ColorType: ${colorType}, Hex: ${hex}`)
    
    // Update the main color swatch (the large 12x12 preview)
    const mainColorSwatch = document.querySelector(`[data-color-type="${colorType}"][data-color-role="main-swatch"]`)
    if (mainColorSwatch) {
      mainColorSwatch.style.backgroundColor = hex
      mainColorSwatch.dataset.currentColor = hex
      console.log(`Updated main color swatch for ${colorType}:`, mainColorSwatch)
    } else {
      console.log(`No main color swatch found for ${colorType}`)
    }
    
    // Also update any other color swatches with the same color type (fallback)
    const allColorSwatches = document.querySelectorAll(`[data-color-type="${colorType}"]`)
    allColorSwatches.forEach(swatch => {
      if (swatch !== mainColorSwatch) {
        swatch.style.backgroundColor = hex
        swatch.dataset.currentColor = hex
      }
    })
    
    // Update the hex display
    if (colorType === 'primary' && this.hasPrimaryColorHexTarget) {
      this.primaryColorHexTarget.textContent = hex
    } else if (colorType === 'secondary' && this.hasSecondaryColorHexTarget) {
      this.secondaryColorHexTarget.textContent = hex
    }
    
    // Update hex input fields
    this.updateHexInput(colorType, hex)
    
    // Save to server
    this.saveColorToServer(colorType, hex)
  }

  // Color conversion utilities
  hslToHex(h, s, l) {
    // Ensure values are within valid ranges
    h = Math.max(0, Math.min(360, h))
    s = Math.max(0, Math.min(100, s))
    l = Math.max(0, Math.min(100, l))
    
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
    
    // Ensure RGB values are within valid ranges and convert to hex
    const rVal = Math.max(0, Math.min(255, Math.round((r + m) * 255)))
    const gVal = Math.max(0, Math.min(255, Math.round((g + m) * 255)))
    const bVal = Math.max(0, Math.min(255, Math.round((b + m) * 255)))
    
    const rHex = rVal.toString(16).padStart(2, '0')
    const gHex = gVal.toString(16).padStart(2, '0')
    const bHex = bVal.toString(16).padStart(2, '0')
    
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
