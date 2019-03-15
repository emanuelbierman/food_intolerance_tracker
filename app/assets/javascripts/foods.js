
function getFoodDays(userId, foodId) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${userId}/foods/${foodId}`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    const food = new Food(response.data.attributes.name, response.data.attributes["days-count"]);
    food.days = response.included.map(function(el) {
      let day = new Day(el.attributes["month-day-year"]);
      // grab the symptoms for that day in an array
      let symptoms = el.attributes.symptoms.map(function(element) {
        new Symptom(element.description, element["days-count"]);
      })
      // push them into a nested array for all symptoms
      day.symptoms.push(symptoms);
    });

    $(".day-mdy").map(function(index) {
      return this.innerText = `Date: ${foodDays[index].monthDayYear}`
    });
    $("button#js-next").data("food", foodId);
    console.log("foodId: " + foodId);
  });
}

function getFoods(userId) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${userId}/foods`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    foods = response.data.map(function(element) {
      return new Food(element.attributes.name, element.attributes["days-count"]);
    });
    $("a.food-name").map(function(index) {
      return this.innerHTML = foods[index].name
    })
    $("span.food-count").append(function(index) {
      return foods[index].daysCount;
    });
  });
}

function Food(name, daysCount, days) {
  this.name = name;
  this.daysCount = daysCount;
  this.days = days;
};

function Day(monthDayYear, symptoms) {
  this.monthDayYear = monthDayYear;
  this.symptoms = symptoms;
};

function Symptom(description, daysCount) {
  this.description = description;
  this.daysCount = daysCount;
}
