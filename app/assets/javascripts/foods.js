$(function() {
  getFoods();
});

function getFoods() {
  $.ajax({
    url: `/users/1/foods`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    foods = response.data.map(function(element) {
      return new Food(element.attributes.name, element.attributes["days-count"]);
    });
    $("span.food-count").append(function(index) {
      return foods[index].days_count;
    });
  });
}

function Food(name, days_count) {
  this.name = name;
  this.days_count = days_count;
};
