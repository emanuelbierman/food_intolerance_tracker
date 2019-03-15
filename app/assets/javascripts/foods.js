
function getFoodDays(userId, foodId) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${userId}/foods/${foodId}`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    const food = new Food(response.data.attributes.name, response.data.attributes["days-count"]);
    const included = response.included;
    for (var i = 0; i < included.length; i++) {
      let day = new Day(included[i].attributes["month-day-year"]);
      food.days.push(day);
      for (var ii = 0; ii < included[i].attributes.symptoms.length; ii++) {
        let symptom = new Symptom(included[i].attributes.symptoms[ii].description, included[i].attributes.symptoms[ii]["days_count"]);
        // why is it days_count here, but days-count in line 9?
        day.symptoms.push(symptom);
      }
    }
    console.log(food);
    // $.each(food.days, function (i,v) {
    //   v.attributes.symptoms.map(function(i, el) {
    //     new Symptom(el.description, element["days-count"]);
    //
    //   })
    // })
    // grab the symptoms for that day in an array

    // push them into a nested array for all symptoms
    // food.days.map((d, i) => d.symptoms.push(symptoms[i]));

    // $(".day-mdy").map(function(index) {
    //   return this.innerText = `Date: ${food.days[index].monthDayYear}`
    // });
    // $("button#js-next").data("food", foodId);
    // console.log("foodId: " + foodId);
  });
};

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

function Food(name, daysCount) {
  this.name = name;
  this.daysCount = daysCount;
  this.days = [];
};

function Day(monthDayYear) {
  this.monthDayYear = monthDayYear;
  this.symptoms = [];
};

function Symptom(description, daysCount) {
  this.description = description;
  this.daysCount = daysCount;
}
