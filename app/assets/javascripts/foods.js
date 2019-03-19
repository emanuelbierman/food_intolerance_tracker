
function getFoodDays(userId, foodId) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${userId}/foods/${foodId}`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    // construct objects from data
    const food = new Food(response.data.id, response.data.attributes.name, response.data.attributes["days-count"]);

    const included = response.included;
    for (var i = 0; i < included.length; i++) {
      let day = new Day(included[i].id, included[i].attributes["month-day-year"]);
      food.days.push(day);
      for (var ii = 0; ii < included[i].attributes.symptoms.length; ii++) {
        let symptom = new Symptom(included[i].attributes.symptoms[ii].id, included[i].attributes.symptoms[ii].description, included[i].attributes.symptoms[ii]["days_count"]);
        // why is the data stored in days_count here, but in days-count in line 9?
        day.symptoms.push(symptom);
      }
    }

    // increment the button id
    foodId = foodId + 1;
    $("button#js-next").attr("food", foodId);

    // capitalize food name for title
    $("span#food-title").map(function(i) {
      return this.innerText = `${food.name[0].toUpperCase()}` + `${food.name.slice(1).toLowerCase()}`;
    });

    // clear the way for entering new days and symptoms
    $(".days").empty();

    food.days.map(day => {
      $(".days").append(`
        <div class="row">
        <div class="card" style="width: 18rem;">
        <h5 class="card-title">
        When you ate ${food.name}, these were your symptoms:
        </h5>
        <div class="card-body">
        <h6 class="day-mdy card-subtitle mb-2 text-muted">
        Date: ${day.monthDayYear}
        </h6>
        <p class="card-text">
        <ul class="day-${day.id} list-group list-group-flush">
        </ul>
        </p>
      `);
      day.symptoms.map(symptom => {
        $(`ul.day-${day.id}`).append(`
          <li class="list-group-item">
          <a href="/users/1/symptoms/${symptom.id}">${symptom.description}</a>
          </li>
        `);
      });
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
    let foods = response.data.map(function(element) {
      return new Food(element.attributes.id, element.attributes.name, element.attributes["days-count"]);
    });

    let foodsString = foods.map(function(food) {
      return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <a href="/users/1/foods/${food.id}">${food.name}</a>
        <span class="food-count badge badge-primary badge-pill">${food.daysCount}</span>
        </li>
      `;
    }).join('');
    $("ul.foods").append(foodsString)
    // $("a.food-name").map(function(index) {
    //   return this.innerHTML = foods[index].name
    // })
    // $("span.food-count").append(function(index) {
    //   return foods[index].daysCount;
    // });
  });
}

function Food(id, name, daysCount) {
  this.id = id;
  this.name = name;
  this.daysCount = daysCount;
  this.days = [];
};

function Day(id, monthDayYear) {
  this.id = id;
  this.monthDayYear = monthDayYear;
  this.symptoms = [];
};

function Symptom(id, description, daysCount) {
  this.id = id;
  this.description = description;
  this.daysCount = daysCount;
}
