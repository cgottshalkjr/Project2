//start of BG toggle function for the log-in page
function cycleBackgrounds() {
  var index = 0;

  $imageEls = $(".toggle-image"); // Get the images to be cycled.

  setInterval(function () {
    // Get the next index.  If at end, restart to the beginning.
    index = index + 1 < $imageEls.length ? index + 1 : 0;
    // Show the next image.
    $imageEls.eq(index).addClass("show");
    // Hide the previous image.
    $imageEls.eq(index - 1).removeClass("show");
  }, 2000);
}

// Document Ready.
$(function () {
  cycleBackgrounds();
});
//end of BG toggle image functions
//-------------------------------------------------------------------------------------------------
//code to add the ingredients to the user's shelf page

$("#addBtn").on("click", function (event) {
  event.preventDefault();
  
  var newIngredient = {
    ingredients: $("#addNew").val().toLowerCase()
  };
  $("#addNew").val("");
  console.log(newIngredient);
  $.ajax({
    url: "/api/addIngredient",
    method: "POST",
    data: newIngredient
  }).then(function (data) {
    console.log(data);
    if (data !== "Already Added!") {

      let existingIngredients = Array.from(document.querySelectorAll(".shelfBody li")).map(li => li.textContent);
      if (existingIngredients.includes(data.ingredients)) return;
      $(".shelfBody ul").append("<li>" + data.ingredients + "</li>");
    }
  });
});

//-------------------------------------------------------------------------------------------------
// post route to the cabinet route to grab recipes

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/api/myDrinks"
  }).then(function (data) {
    console.log(data);
    $("#recipe-div").empty();
    for (var i = 0; i < data.length; i++) {
      var firstDrink = data[i].strDrink;
      var firstIngredients = data[i].strIngredients;
      var firstPicture = data[i].strDrinkThumb;
      var firstInstructions = data[i].strInstructions || "Mix Together";
      var newImg = $("<img>").attr("src", firstPicture);
      newImg.addClass("img-fluid shelfImg");
      $("#recipe-div").append("<h3>" + firstDrink + "</h3>");
      $("#recipe-div").append("<p>" + firstIngredients + "</p>");
      $("#recipe-div").append("<p>" + firstInstructions + "</p>");
      $("#recipe-div").append(newImg);
      $("#recipe-div").append("<br />");
      var button = $("<button class='add-to-faves'>").attr("data-id", data[i].id).text("Add to Favorite");
      $("#recipe-div").append(button);
      $("#recipe-div").append("<hr>");

    }
  });
});

// //this is the onclick function for the delete button
// $(".deleteBtn").on("click", function (event) {
//   event.preventDefault();
//   var id = $(this).data("id");

//   console.log("delete button was clicked");
//   // Send the DELETE request.
//   $.ajax("/api/addIngredient/" + id, {
//     type: "DELETE"
//   }).then(function () {
//     console.log("delete", id);
//     // Reload the page to get the updated list
//     location.reload();
//   });
// });

$(document).on("click", ".add-to-faves", function (event) {
  event.preventDefault;
  
  var recipeId = $(this).attr("data-id");
  $.ajax("/favorites", {
    type: "POST",
    data: {
      recipeId: recipeId
    }
  }).then(function (res) {
    console.log("added to favorites");
  });
});

$(document).on("click", ".delete-from-shelf", function (event) {
  event.preventDefault();
  var itemId = $(this).data("id");
  $.ajax({
      type: "DELETE",
      url: "/shelf" + itemId
  }).then(function () {
      res.end();
  });
});
