module OrganizationHelper
  def main_navigation_links
    [
      {
        label: 'Home',
        icon: 'fas fa-home',
        path: root_path
      },
      {
        label: 'Events',
        icon: 'fas fa-calendar-alt',
        path: root_path
      },
      {
        label: 'Analytics',
        icon: 'fas fa-chart-line',
        path: '#'
      },
      {
        label: 'Marketing',
        icon: 'fas fa-bullhorn',
        path: '#'
      }
    ]
  end

  def channels_navigation_links
    [
      {
        label: 'Website',
        icon: 'fas fa-globe',
        path: '#'
      }
    ]
  end

  def org_primary_color
    @organization.organization_brand_asset.primary_color || '#3B82F6'
  end

  def org_secondary_color
    @organization.organization_profile.secondary_color || '#60A5FA'
  end
end
