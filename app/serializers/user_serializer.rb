class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_many :foods, through: :days
end
