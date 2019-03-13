class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :days_count
  # has_many :days, through: :days_foods, source: :day
end
