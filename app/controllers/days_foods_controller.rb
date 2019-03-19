class DaysFoodsController < ApplicationController

  def create
    @days_food = DaysFood.new(days_food_params)
    if @days_food.save
      # redirect_to user_path(current_user), notice: "You added #{@food.name}."
      render json: @days_food, status: 201
    else
      flash[:alert] = []
      redirect_to user_path(current_user), alert: @days_food.errors.full_messages
    end
  end

  def destroy
    @days_food = DaysFood.find_by(id: params[:id])
    @food = @days_food.food
    @days_food.destroy
    redirect_to user_path(current_user), notice: "You removed #{@food.name}."
  end

private
  def days_food_params
    params.require(:days_food).permit(
      :day_id,
      :serving,
      :comments,
      :food_id,
      food_attributes: [:id, :name]
    )
  end
end
