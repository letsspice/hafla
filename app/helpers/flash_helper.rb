module FlashHelper
  NOTIFICATION_CLASSES = {
    'alert' => 'border-red-500 bg-red-50 text-red-500',
    'notice' => 'border-blue-500 bg-blue-50 text-blue-500',
    'success' => 'border-green-500 bg-green-50 text-green-500',
    'error' => 'border-red-500 bg-red-50 text-red-500',
    'warning' => 'border-yellow-500 bg-yellow-50 text-yellow-500',
    'info' => 'border-blue-500 bg-blue-50 text-blue-500'
  }.freeze

  NOTIFICATION_ICONS = {
    'alert' => 'fa-solid fa-circle-exclamation',
    'notice' => 'fa-solid fa-info-circle',
    'success' => 'fa-solid fa-check-circle',
    'error' => 'fa-solid fa-exclamation-triangle',
    'warning' => 'fa-solid fa-circle-exclamation',
    'info' => 'fa-solid fa-circle-info'
  }.freeze

  PROGRESS_BAR_BACKGROUNDS = {
    'alert' => 'bg-red-500',
    'notice' => 'bg-blue-500',
    'success' => 'bg-green-500',
    'error' => 'bg-red-500',
    'warning' => 'bg-yellow-500',
    'info' => 'bg-blue-500'
  }.freeze

  def notification_class(type)
    NOTIFICATION_CLASSES[type] || 'border-gray-500 bg-gray-50 text-gray-500'
  end

  def notification_icon(type)
    NOTIFICATION_ICONS[type] || 'fa-solid fa-circle-info'
  end

  def progress_bar_background(type)
    PROGRESS_BAR_BACKGROUNDS[type] || 'bg-gray-500'
  end
end
