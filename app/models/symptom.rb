class Symptom < ActiveRecord::Base
  has_many :days_symptoms
  has_many :days, through: :days_symptoms, source: :day
  has_many :foods, through: :day
  validates_presence_of :description
  validates_uniqueness_of :description

  after_commit :update_days_count, on: [:create, :update]
  after_find :update_days_count

  def update_days_count
    self.days_count = self.days.uniq.count ? self.days.uniq.count : "This symptom has no days yet."

  def self.symptoms_by_days_count(user_id)
    symptoms = self.joins(:days).where(days: { user_id: user_id})
    symptoms.group(:description).order(:id, days_count: :desc)
  end

  def frequency(day_id)
    self.days_symptoms.find(day_id).frequency
  end

  def comments(day_id)
    self.days_symptoms.find(day_id).comments
  end
end
