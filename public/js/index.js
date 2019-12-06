// Get references to page elements
var $exampleText = $('#example-text');
var $exampleDescription = $('#example-description');
var $submitBtn = $('#submit');
var $exampleList = $('#deleteBtn');

// The API object contains methods for each kind of request we'll make
var API = {
	saveExample: function(example) {
		return $.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'POST',
			url: 'api/examples',
			data: JSON.stringify(example)
		});
	},
	getExamples: function() {
		return $.ajax({
			url: 'api/examples',
			type: 'GET'
		});
	},
	deleteExample: function(id) {
		return $.ajax({
			url: 'api/examples/' + id,
			type: 'DELETE'
		});
	}
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
	API.getExamples().then(function(data) {
		var $examples = data.map(function(example) {
			var $a = $('<a>').text(example.text).attr('href', '/example/' + example.id);

			var $li = $('<li>')
				.attr({
					class: 'list-group-item',
					'data-id': example.id
				})
				.append($a);

			var $button = $('<button>').addClass('btn btn-danger float-right delete').text('ｘ');

			$li.append($button);

			return $li;
		});

		$exampleList.empty();
		$exampleList.append($examples);
	});
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
	event.preventDefault();

	var example = {
		text: $exampleText.val().trim(),
		description: $exampleDescription.val().trim()
	};

	if (!(example.text && example.description)) {
		alert('You must enter an example text and description!');
		return;
	}

	API.saveExample(example).then(function() {
		refreshExamples();
	});

	$exampleText.val('');
	$exampleDescription.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
	var idToDelete = $(this).parent().attr('data-id');

	API.deleteExample(idToDelete).then(function() {
		refreshExamples();
	});
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$exampleList.on('click', '.delete', handleDeleteBtnClick);

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
      newListItem.attr("data-id", data[i].id)

			$('#itemlist').append(newListItem);
		}
	});
});