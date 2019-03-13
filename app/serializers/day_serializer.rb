class DaySerializer < ActiveModel::Serializer
  attributes :id, :month_day_year
  attribute :days_foods do
    object.days_foods
  end
  belongs_to :user
  # has_many :days_foods
  # has_many :foods, through: :days_foods
  # has_many :days_symptoms
  # has_many :symptoms, through: :days_symptoms
end
