module OrganizationProfilesHelper
	def all_countries
		ISO3166::Country.all.map { |c| [c.translations[I18n.locale.to_s] || c.name, c.alpha2] }.sort
	end
end
