
function getFoods(user_id) {
  $.ajax({
    // need to grab this user id param
    url: `/users/${user_id}/foods`,
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
      return foods[index].days_count;
    });
  });
}

function Food(name, days_count) {
  this.name = name;
  this.days_count = days_count;
};
