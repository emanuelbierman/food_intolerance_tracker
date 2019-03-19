class DaysSymptomsController < ApplicationController

  def create
    @days_symptom = DaysSymptom.new(days_symptom_params)
    if @days_symptom.save
      # redirect_to user_path(current_user), notice: "You added #{@symptom.description}."
      render json: @days_symptom, status: 201
    else
      flash[:alert] = []
      redirect_to user_path(current_user), alert: @days_symptom.errors.full_messages
    end
  end

  def destroy
    @days_symptom = DaysSymptom.find_by(id: params[:id])
    @symptom = @days_symptom.symptom
    @days_symptom.destroy
    redirect_to user_path(current_user), notice: "You removed #{@symptom.description}."
  end

private
  def days_symptom_params
    params.require(:days_symptom).permit(
      :day_id,
      :frequency,
      :comments,
      :symptom_id,
      symptom_attributes: [:id, :description]
    )
  end
end
