import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="organization-profile"
export default class extends Controller {
  static targets = [
    "country", "currency", "timezone", "phoneCode", "city"
  ]

  async connect() {
    await this.prefillFromIP()
  }

  async prefillFromIP() {
    try {
      const res = await fetch("https://ipapi.co/json/")
      const data = await res.json()
      const countryCode = data.country_code


      if (countryCode) {
        this.countryTarget.value = countryCode
        this.cityTarget.innerHTML = `<option value="${data.city}">${data.city}</option>`
        this.phoneCodeTarget.innerHTML = `<option value="${data.country_calling_code}">${data.country_calling_code}</option>`
        this.currencyTarget.innerHTML = `<option value="${data.currency}">${data.currency}</option>`
        this.timezoneTarget.innerHTML = `<option value="${data.timezone}">${data.timezone}</option>`
        console.log('Data', data)
      }
    } catch (err) {
      console.warn("IP location failed", err)
    }
  }

  async changeCountry() {
    const countryCode = this.countryTarget.value
    if (countryCode) {
      await this.updateFields(countryCode)
    }
  }

  async updateFields(countryCode) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      const data = await res.json()
      const country = data[0]

      console.log('Country', country)

      // Update Currency
      const currencyCode = Object.keys(country.currencies || {})[0]
      const currencyName = country.currencies?.[currencyCode]?.name || ""
      this.currencyTarget.innerHTML = `<option value="${currencyCode}">${currencyCode} (${currencyName})</option>`

      // Update Timezones
      const timezones = country.timezones || []
      this.timezoneTarget.innerHTML = timezones.map(tz =>
        `<option value="${tz}">${tz}</option>`
      ).join("")

      // Update Phone Code
      const code = country.idd?.root + (country.idd?.suffixes?.[0] || "")
      this.phoneCodeTarget.value = code || ""
    } catch (err) {
      console.warn("Country info fetch failed", err)
    }
  }
}
