

var villains = ["The Joker", "Bane", "Thanos", "Green Goblin", "Magneto", "Voldemort", "Darth Vader", "Palpatine", "Sauron", "Lex Luthor"]

      
      function displayvillainInfo() {
          $("#villains-view").empty();
        
        var villain = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${villain}&limit=10&offset=0&rating=PG-13&lang=en`;

        // Creating an AJAX call for the specific villain button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        console.log(response);
          // Storing the rating data
          var gifs = response.data

    for (var i =0; i < gifs.length; i++){
        
        console.log(gifs[i].images.original.url);
        let ratings = $(`<p>${gifs[i].rating}<p>`);
        let images = $("<img>");
        images.attr("src", gifs[i].images.original.url );
        $("#villains-view").append(ratings)
        $("#villains-view").append(images);
         }


        });

      }

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