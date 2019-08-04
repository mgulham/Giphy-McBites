
//Determing what my variables will be that are pushed into buttons
var villains = ["The Joker", "Bane", "Thanos", "Green Goblin", "Magneto", "Voldemort", "Darth Vader", "Palpatine", "Sauron", "Lex Luthor"]

// Function for displaying villain data
function renderButtons() {

  // Deleting the villains prior to adding new villains
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of villains
  for (var i = 0; i < villains.length; i++) {

    // Then dynamicaly generating buttons for each villain in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class of villain-btn to our button
    newButton.addClass("villain-btn");
    newButton.addClass("btn-primary");
    // Adding a data-attribute
    newButton.attr("data-name", villains[i]);
    // Providing the initial button text
    newButton.text(villains[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(newButton);
  }
}

// This function handles events where a villain button is clicked
$("#add-villain").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var villain = $("#villain-input").val().trim();

  // Adding villain from the textbox to our array
  villains.push(villain);

  // Calling renderButtons which handles the processing of our villain array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "villain-btn"
$(document).on("click", ".villain-btn", displayvillainInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();      

      function displayvillainInfo() {
          $("#villains-view").empty(); //empties gifs from div so new ones can be pushed from api request
        
        
          var villain = $(this).attr("data-name");

          //API Key would not link to java on my deploy link for some reason
          var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=3N7NX6spXgkUbr96DuzjgxIHZBEnh2fY&q="${villain}"&limit=10&offset=0&rating=PG-13&lang=en`
          
        // var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${villain}&limit=10&offset=0&rating=PG-13&lang=en`;

        // Creating an AJAX call for the specific villain button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        console.log(response);
          // Storing the rating data
          var gifs = response.data

    for (var i = 0; i < gifs.length; i++){ //looping through response to manipulate data
        
        
        var ratings = $(`<p>${gifs[i].rating}<p>`); //Isolates rating for each gif and puts it into a <p> tag
        var imagesURL = gifs[i].images.original.url; //isolates animated image url
        var imageStillURL = gifs[i].images.original_still.url; //isolates still gif url

        //creates image tag with sources that can be changed later. Each url is pulled from its respective data. Image starts still. 
        var imagesStill = $(`<img class='gif' src=${imageStillURL} data-still=${imageStillURL} data-animate=${imagesURL} data-state='still'>`); 
        
        // imagesStill.attr("src", gifs[i].images.original_still.url) /// alternative to putting src in <img> tag
      
        $("#villains-view").append(ratings) //ratings <p> tag pushed unto html
        $("#villains-view").append(imagesStill); //still images pushed onto html
        
        $(".gif").on("click", function() {
        // The attr jQuery method allows us to change the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        
        // If the clicked image's state is still, src attribute is updated to link from what its data-animate value is.
        // Then, set the image's data-state to animate
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

           // If the clicked image's state is animate, src attribute is updated to link from what its data-still value is.
        // Then, set the image's data-state to still
        
        } else if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

           //////////////////// FOR SOME REASON, ONLY EVERY OTHER GIFS DATA-STATE CAN BE CHANGED  ///////////////////////////////////////

      });}


        });

      }
     
