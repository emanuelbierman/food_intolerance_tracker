$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

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

    const posting = $.post(url, data);
    posting.done( data => {
      // distinguish between two forms on the page
      const userId = data.data.attributes.day.user_id;
      const comments = data.data.attributes.comments;
      if (data.data.type === "days-foods") {
        const foodId = data.data.attributes.food.id;
        const foodName = data.data.attributes.food.name;
        const serving = data.data.attributes.serving;
        const newDaysFoodHTML = `
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
        const symptomId = data.data.attributes.symptom.id;
        const symptomDescription = data.data.attributes.symptom.description;
        const frequency = data.data.attributes.frequency;
        const newDaysSymptomHTML = `
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
