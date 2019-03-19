class DaySerializer < ActiveModel::Serializer
  attributes :id, :month_day_year, :symptoms, :foods, :user
  # attribute :days_foods do
  #   object.days_foods
  # end
  # attribute :days_symptoms do
  #   object.days_symptoms
  # end
end
