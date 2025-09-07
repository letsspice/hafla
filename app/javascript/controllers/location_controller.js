import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="organization-profile"
export default class extends Controller {
  static targets = [
    "country", "currency", "timezone", "phoneCode", "city"
  ]

  async connect() {
    await this.prefillFromIP()
  }

  async countryChanged() {
    const countryName = this.countryTarget.options[this.countryTarget.selectedIndex].text.toLowerCase()
    await this.fetchCities(countryName)
    await this.fetchCurrencies(countryName)
    await this.fetchTimezones(countryName)
    await this.fetchPhoneCode(countryName)
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
        this.currencyTarget.innerHTML = `${data.currency}`
        this.timezoneTarget.innerHTML = `<option value="${data.timezone}">${data.timezone}</option>`
      }
    } catch (err) {
      console.warn("IP location failed", err)
    }
  }

  async fetchCities(countryName) {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ country: countryName })
      });
  
      const data = await res.json();
      const cities = (data.data || []).sort((a, b) => a.localeCompare(b));
      this.cityTarget.innerHTML = cities.map(city =>
        `<option value="${city}">${city}</option>`
      ).join("");
    } catch (err) {
      console.warn("Fetching cities failed", err);
    }
  }
  

  async fetchCurrencies(countryName) {
    try {
      const res = await fetch(`https://countriesnow.space/api/v0.1/countries/currency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryName })
      })

      const data = await res.json()
      this.currencyTarget.value = data.data.currency
    }
    catch (err) {
      console.warn("Fetching currencies failed", err)
    }
  }

  async fetchTimezones(countryName) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)

      const data = await res.json()
      const country = data[0]
      const timezones = country.timezones || []
      this.timezoneTarget.innerHTML = timezones.map(tz =>
        `<option value="${tz}">${tz}</option>`
      ).join("")
    }
    catch (err) {
      console.warn("Fetching timezones failed", err)
    }
  }

  async fetchPhoneCode(countryName) {
    try {
      const res = await fetch(`https://countriesnow.space/api/v0.1/countries/codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryName })
      })

      const data = await res.json()
      this.phoneCodeTarget.value = data.data.dial_code
    }
    catch (err) {
        console.error("Fetching phone code failed", err)
    }
  }
}
