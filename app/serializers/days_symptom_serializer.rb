class DaysSymptomSerializer < ActiveModel::Serializer
  attributes :id, :frequency, :comments, :symptom, :day
end
