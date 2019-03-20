$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();

    // distinguish between two forms on the page
    let user_id = '';
    let url = '';
    if ($(this).attr("class") === "new_days_food") {
      user_id = $("input#days_food_user_id", this)[0].value;
      url = `/users/${user_id}/days_foods`;
    } else if ($(this).attr("class") === "new_days_symptom") {
      user_id = $("input#days_symptom_user_id", this)[0].value;
      url = `/users/${user_id}/days_symptoms`;
    }

    let posting = $.ajax({
      url: url,
      method: 'POST',
      data: data
    });

    posting.done( data => {
      // distinguish between two forms on the page
      let userId = data.data.attributes.day.user_id;
      let comments = data.data.attributes.comments;
      if (data.data.type === "days-foods") {
        let foodId = data.data.attributes.food.id;
        let foodName = data.data.attributes.food.name;
        let serving = data.data.attributes.serving;
        let newDaysFoodHTML = `
          <tr><th scope="row">
          <a href="/users/${userId}/foods/${foodId}">${foodName}</a>
          </th><td>
          ${serving} / delete link
          </td><th scope="row">
          ${comments}
          </th></tr>
        `;
        $("tbody.days_foods").append(newDaysFoodHTML);
      } else if (data.data.type === "days-symptoms") {
        let symptomId = data.data.attributes.symptom.id;
        let symptomDescription = data.data.attributes.symptom.description;
        let frequency = data.data.attributes.frequency;
        let newDaysSymptomHTML = `
          <tr><th scope="row">
          <a href="/users/${userId}/symptoms/${symptomId}">${symptomDescription}</a>
          </th><td>
          ${frequency} / delete link
          </td><th scope="row">
          ${comments}
          </th></tr>
        `;
        $("tbody.days_symptoms").append(newDaysSymptomHTML);
      }

    });
  });
});
