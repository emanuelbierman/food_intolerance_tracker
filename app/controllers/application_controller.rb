class ApplicationController < ActionController::Base
  before_action :require_login
  before_action :require_user

private
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def current_day(user_id)
    date = Time.now.strftime("%d")
    Day.find_or_create_by(date: date, user_id: user_id)
  end

  def require_login
    unless logged_in?
      redirect_to root_path, alert: "You must be signed in to access this page."
    end
  end

  def require_user
    @user = User.find_by(id: params[:user_id])
    # the @id instance variable is for AJAX requests that need a user id to access nested resources
    @id = params[:id]
    if @user
      if @user != current_user
        redirect_to user_path(current_user), alert: "You do not have permission to access this page."
      else
        @user
      end
    end
  end

  # def facebook_user?
  #   !!@user.name
  # end
end
