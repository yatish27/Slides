module ApplicationHelper
  def current_user_author?
    params["author"].present?
  end
end
