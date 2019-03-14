# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(username: "sample user", password: "password")
today = Time.now.strftime("%d")
day = Day.create(date: today, user_id: user.id)

food = Food.create(name: "pizza")
days_food = DaysFood.create(day_id: day.id, food_id: food.id, serving: 1, comments: "peer-pressured into eating at birthday party")

food2 = Food.create(name: "ice cream")
days_food2 = DaysFood.create(day_id: day.id, food_id: food2.id, serving: 2, comments: "two big scoops")

food3 = Food.create(name: "coffee")
days_food3 = DaysFood.create(day_id: day.id, food_id: food3.id, serving: 1, comments: "one cup")

food4 = Food.create(name: "chocolate fondu")
days_food4 = DaysFood.create(day_id: day.id, food_id: food4.id, serving: 1)

food5 = Food.create(name: "strawberries")
days_food5 = DaysFood.create(day_id: day.id, food_id: food5.id, serving: 5, comments: "for the chocolate fondu")

symptom = Symptom.create(description: "mucus")
days_symptom = DaysSymptom.create(day_id: day.id, symptom_id: symptom.id, frequency: 1, comments: "mucus after lunch")

symptom2 = Symptom.create(description: "runny nose")
days_symptom2 = DaysSymptom.create(day_id: day.id, symptom_id: symptom2.id, frequency: 2)

symptom3 = Symptom.create(description: "diarrhea")
days_symptom3 = DaysSymptom.create(day_id: day.id, symptom_id: symptom3.id, frequency: 1, comments: "what did I eat yesterday?")

symptom4 = Symptom.create(description: "mucus")
days_symptom4 = DaysSymptom.create(day_id: day.id, symptom_id: symptom4.id, frequency: 1, comments: "more mucus in the evening")

symptom5 = Symptom.create(description: "headache")
days_symptom5 = DaysSymptom.create(day_id: day.id, symptom_id: symptom5.id, frequency: 1, comments: "only one cup of coffee today")

food.save
food2.save
food3.save
food4.save
food5.save
days_food.save
days_food2.save
days_food3.save
days_food4.save
days_food5.save
symptom.save
symptom2.save
symptom3.save
symptom4.save
symptom5.save
days_symptom.save
days_symptom2.save
days_symptom3.save
days_symptom4.save
days_symptom5.save

# food1 = Food.create(name: "pretzels", serving: 2)
# food2 = Food.create(name: "chicken sausage", serving: 2)
# food3 = Food.create(name: "egg-fried rice", serving: 1)
# food4 = Food.create(name: "chickpea veggie burger", serving: 1)
# these last two objects are to confirm that I can create new objects with the same attributes, enabling me to group by name or description
# food5 = Food.create(name: "pretzels", serving: 1)
# food6 = Food.create(name: "pretzels", serving: 3)

# symptom1 = Symptom.create(description: "acid reflux: throat burning", frequency: 1)
# symptom2 = Symptom.create(description: "acid reflux: constricted breathing", frequency: 3)
# these last two objects are to confirm that I can create new objects with the same attributes, enabling me to group by name or description
# symptom5 = Symptom.create(description: "diarrhea: mealy", frequency: 1)
# symptom6 = Symptom.create(description: "diarrhea: mealy", frequency: 2)

# day.foods << [food1, food2]
# day.symptoms << [symptom1, symptom2]
# day.save

# day.previous_day.foods << [food3, food5]
# day.previous_day.symptoms << [symptom3, symptom5]
# day.previous_day.save

# day.next_day.foods << [food4, food6]
# day.next_day.symptoms << [symptom4, symptom6]
# day.next_day.save
