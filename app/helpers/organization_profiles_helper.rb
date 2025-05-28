module OrganizationProfilesHelper
  def all_countries
    ISO3166::Country.all.map { |c| [c.translations[I18n.locale.to_s] || c.name, c.alpha2] }.sort
  end

  def all_timezones
    ActiveSupport::TimeZone.all.map { |tz| [tz.name, tz.name] }.sort
  end

  def all_phone_codes
    ISO3166::Country.all.map { |c| [c.country_code, c.country_code] }.sort
  end
end
