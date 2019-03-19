class DaysFoodSerializer < ActiveModel::Serializer
  attributes :id, :serving, :comments, :food, :day
  # attribute :day_id do
  #   object.day_id
  # end
  # belongs_to :day
  # belongs_to :user, through: :day
  # belongs_to :food
end
