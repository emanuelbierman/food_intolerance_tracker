class SymptomSerializer < ActiveModel::Serializer
  attributes :id, :description, :days_count
  # has_many :days, through: :days_symptoms, source: :day
end
