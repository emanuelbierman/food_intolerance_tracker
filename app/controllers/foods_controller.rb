class FoodsController < ApplicationController
  before_action :set_food, only: [:show]

  def index
    @user_foods_grouped = Food.foods_by_days_count(current_user.id)
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: @user_foods_grouped, status: 200 }
    end
  end

  def show
    if @food
      @food_days = @food.days
      render 'show'
    else
      redirect_to user_foods_path(current_user), alert: "Your food was not found."
    end
  end

  private
    def set_food
      @food = Food.find_by(id: params[:id])
    end
end
