class DaySerializer < ActiveModel::Serializer
  attributes :id, :month_day_year, :symptoms
  # attribute :days_foods do
  #   object.days_foods
  # end
  # attribute :days_symptoms do
  #   object.days_symptoms
  # end
  belongs_to :user
  # has_many :days_foods
  # has_many :foods, through: :days_foods
  # has_many :days_symptoms
  # has_many :symptoms
end
