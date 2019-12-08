//------------------------------------------------------------------------------------------------------

//start of BG toggle function for the log-in page
function cycleBackgrounds() {
	var index = 0;

	$imageEls = $('.toggle-image'); // Get the images to be cycled.

	setInterval(function() {
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < $imageEls.length ? index + 1 : 0;
		// Show the next image.
		$imageEls.eq(index).addClass('show');
		// Hide the previous image.
		$imageEls.eq(index - 1).removeClass('show');
	}, 2000);
}

// Document Ready.
$(function() {
	cycleBackgrounds();
});
//end of BG toggle image functions
//-------------------------------------------------------------------------------------------------
//code to add the ingredients to the user's shelf page

$('#addBtn').on('click', function(event) {
	event.preventDefault();
	var newIngredient = {
		ingredients: $('#addNew').val(),
		userId: 1
	};
	console.log(newIngredient);
	$.ajax({
		url: '/api/addIngredient',
		method: 'POST',
		data: newIngredient
	}).then(function(data) {
		console.log(data);
	});
});

//-------------------------------------------------------------------------------------------------
// post route to the cabinet route to grab recipes

$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/api/myDrinks"
  }).then(function(data) {
    console.log(data);
  });
});
//--------------------------------------------------------------------------------------------------------
//this is the onclick function for the delete button
$(".deleteBtn").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");

  console.log("delete button was clicked");
  // Send the DELETE request.
  $.ajax("/api/addIngredient/" + id, {
    type: "DELETE"
  }).then(function() {
    console.log("delete", id);
    // Reload the page to get the updated list
    location.reload();
  });
});

$(document).ready(function() {
	$.get('/api/addIngredient', function(data) {
		console.log(data);

		for (var i = 0; i < data.length; i++) {
			var addIngredient = data[i].ingredients;

			var newListItem = $('<li>');
      newListItem.text(addIngredient);
      newListItem.attr("data-id", data[i].id);

			$('#itemlist').append(newListItem);
		}
	});
});