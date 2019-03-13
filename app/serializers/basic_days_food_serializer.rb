class BasicDaysFoodSerializer < ActiveModel::Serializer
  attributes :id, :day, :food
  belongs_to :day
  belongs_to :food
end
