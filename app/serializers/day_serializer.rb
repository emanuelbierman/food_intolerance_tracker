class DaySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :month_day_year
  belongs_to :user
end
