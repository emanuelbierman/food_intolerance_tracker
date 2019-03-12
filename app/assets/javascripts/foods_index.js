$(document).ready(function () {
  $.get('/foods', function(response) {
    // examine response in browser
    // construct Food objects
    // append them to the DOM
  })
}

function Food(name, days) {
  this.name = name;
  this.days = days;
};

// refactor using arrow syntax
Food.prototype.days_count = function () {
  if (this.days.length > 0) {
    return days.length;
  }
}
