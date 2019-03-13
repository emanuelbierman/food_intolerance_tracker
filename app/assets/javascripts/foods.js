$(function() {
  $.ajax({
    url: `/users/1/foods`,
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    // examine response in browser
    // construct Food objects
    // append them to the DOM
    foods = response.data.map(function(element) {
      return new Food(element.name, element.days_count)
    });
    $("span.food-count").append(function(index) {
      return foods[index].days_count;
    });
  });
});

function Food(name, days_count) {
  this.name = name;
  this.days_count = days_count;
};

// refactor using arrow syntax
// Food.prototype.days_count = function () {
//   if (this.days.length > 0) {
//     return days.length;
//   }
// }
