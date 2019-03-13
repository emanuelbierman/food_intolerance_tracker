class DaySerializer < ActiveModel::Serializer
  attributes :id, :month_day_year
  belongs_to :user
  # has_many :days_foods
  # has_many :foods, through: :days_foods
end
