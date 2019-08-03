var villians = ["The Joker", "Bane", "Thanos", "Green Goblin", "Magneto", "Voldemort", "Darth Vader", "Palpatine", "Sauron", "Lex Luthor"]
var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${villians}&limit=10&offset=0&rating=PG-13&lang=en`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(queryURL)

    var gifs = response.data
    for (var i =0; i < gifs.length; i++){
     console.log(gifs[i].images.original.url);
     let images = $("<img>");
         images.attr("src", gifs[i].images.original.url );
         $("#gifs").append(images);
    }
    });
