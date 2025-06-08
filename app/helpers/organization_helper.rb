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
end
