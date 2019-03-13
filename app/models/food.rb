class Food < ActiveRecord::Base
  has_many :days_foods
  has_many :days, through: :days_foods, source: :day
  has_many :symptoms, through: :day
  validates_presence_of :name
  validates_uniqueness_of :name

  after_commit :update_days_count, on: [:create, :update]
  after_find :update_days_count

  def update_days_count
    self.days_count = self.days.uniq.count ? self.days.uniq.count : "This food has no days yet."
    # self.days_count = self.days.uniq.count unless self.days_count.nil?
  end

  def self.foods_by_days_count(user_id)
    foods = self.joins(:days).where(days: { user_id: user_id})
    foods.group(:name).order(:id, days_count: :desc)
  end

  def serving(day_id)
    self.days_foods.find(day_id).serving
  end

  def comments(day_id)
    self.days_foods.find(day_id).comments
  end

  # def name=(name)
  #   name.downcase
  # end
end
