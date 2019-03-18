
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
        // why is the data stored in days_count here, but in days-count in line 9?
        day.symptoms.push(symptom);
      }
    }

    $(".day-mdy").map(function(i) {
      // return this.innerText = `Date: ${food.days[i].monthDayYear}`
    });
    // increment the button id
    $("button#js-next").data("food", foodId + 1);
    // console.log("foodId: " + foodId);
    // map these:
    $("span#food-name").map(function() {
      return this.innerText = `${food.name}`;
    });
    $("a.symptom-description").map(function(i) {
      // return this.innerText = `${food.days[i].symptoms}`
    });
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
