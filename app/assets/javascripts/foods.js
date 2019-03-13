
function getFoodDays(userId, foodId) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${userId}/foods/${foodId}`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    foodDays = response.data.map(function(element) {
      return new Day(element.attributes["month-day-year"]);
    });
    $(".day-mdy").map(function(index) {
      return this.innerText += ` ${foodDays[index].monthDayYear}`
    });
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

function Food(name, daysCount) {
  this.name = name;
  this.daysCount = daysCount;
};

function Day(monthDayYear) {
  this.monthDayYear = monthDayYear;
};
