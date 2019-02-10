require("dotenv").config();



var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  

});
 var request = require('request');

var fs = require("fs");
 



var userinput = process.argv;


if(userinput[2] == "spotify-this"){
    var song = userinput.slice(3, userinput.length).join(' ');
       
    if (song.length === 0){
        song = "zephyr song red hot chili peppers";
    }
    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        
       
      console.log("Song Name : " + data.tracks.items[0].name); 
      console.log( "Artist Name:" + data.tracks.items[0].artists[0].name);
      console.log("Preview URL : " + data.tracks.items[0].preview_url); 
      console.log("Album name : " + data.tracks.items[0].album.name); 
    //   console.log("Artist name : " + data.tracks.items[0].artists[5]);

      });
    } 
      
   
else if (userinput[2] == "movie-this"){
    var movie = userinput.slice(3, userinput.length).join(' ');
        if(movie.length === 0){
            movie = "Incredibles 2";
            console.log("If you haven't watched Incredibles 2, then you should: http://www.imdb.com/title/tt0485947/");

            console.log("It's on Netflix!");
        }else{
                apikey =  process.env.Omdb_Api_key;
        request("http://www.omdbapi.com/?apikey=" +  apikey   + "&t=" + movie + "&y=&plot=short", function(error, response, body){
      
            var tomatoRatings = JSON.parse(body).Ratings[1].Value;
            console.log("Movie Title:"  +  JSON.parse(body).Title);
            console.log( "Year movie was released: " +  JSON.parse(body).Year);
            console.log("IMDB movie rating : "  +  JSON.parse(body).imdbRating  +  "(out of 10)" );
            console.log("Rotten Tomatoes rating: "  + tomatoRatings);
            console.log( "Filmed in :"  +  JSON.parse(body).Country);
            console.log("Language:"  +  JSON.parse(body).Language);
            console.log( "Movie plot:"   +  JSON.parse(body).Plot);
            console.log('Actors:'  +  JSON.parse(body).Actors);
            
            
            });
        }
} else if (userinput[2] === "concert-this") {
    var artistName =  userinput.slice(3, userinput.length).join(' ');
        appId = process.env.Bandisintown_APP_ID;
   request("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id="+ appId , function(error, response, body){
    console.log( "Name of the venue: "  +  JSON.parse(body)[1].venue.name);
 
   console.log(  "Venue location: " + JSON.parse(body)[1].venue.country);
    
  
   
    var date = JSON.parse(body)[1].datetime; 
    realDate = date.split(("T"), 1);
    console.log( "Date of the event:" +  realDate[0]);
   });
} else if (userinput[2] === "do-what-it-say"){

    fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
            var randomArray = data.split(",");
            // console.log(randomArray);
            userinput[2] = randomArray[0];
            // userinput[3] = randomArray[1];
            spotify.search({ type: 'track', query: randomArray[1], limit: 1 }, function(err, data) {
        
       
                console.log("Song Name : " + data.tracks.items[0].name); 
                console.log( "Artist Name:" + data.tracks.items[0].artists[0].name);
                console.log("Preview URL : " + data.tracks.items[0].preview_url); 
                console.log("Album name : " + data.tracks.items[0].album.name); 
              //   console.log("Artist name : " + data.tracks.items[0].artists[5]);
          
                });

        }
        });

        
    

}
