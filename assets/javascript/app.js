var queryURL = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

    var gifs = response.data
    for (var i =0; i < gifs.length; i++){
     console.log(gifs[i].images.original.url);
     let images = $("<img>");
         images.attr("src", gifs[i].images.original.url );
         $("#gifs").append(images);
    }
    });
