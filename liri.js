	config = require("dotenv").config();

	const keys = require("./keys.js");

	const command = process.argv[2];

	const Twitter = require('twitter');

	const request = require("request");

	const fs = require("fs");

	const client = new Twitter(keys.twitter);


		const params = {

			screen_name: 'code_purposes',

			count: 20
		}

		function tweets(){ 
			client.get('statuses/user_timeline', params, searchedData,{
				  if (error) {
				    console.log(error);
				  }
			   })
		}; 

		function searchedData(err, data, response) {

			let t = data;

			for (let i = 0; i < t.length; i++){
				console.log("");
				console.log(t[i].text);
				console.log(t[i].created_at);
				console.log("");
			}
		}



	const Spotify = require('node-spotify-api');	
	const spotify = new Spotify(keys.spotify);
	const song = [];

	if (command === "do-what-it-says"){
		fs.readFile("random.txt", "utf8", function(error, data){
			console.log(data);
		})
	}

		function spot(){

			for (let i = 3; i < process.argv.length; i++){
				const songName = process.argv[i];
				song.push(songName);
			}	


			spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
	    	}
	    		// console.log(JSON.stringify(data, null, 4));
	    		console.log("")
	    		console.log("This Artists name is: " + data.tracks.items[0].album.artists[0].name);
	    		console.log("");
	    		console.log("The Current Track is: " + data.tracks.items[0].name);
	    		console.log("");
	    		console.log("Check out a preview: " + data.tracks.items[0].preview_url);
	    		console.log("");
	    		console.log("From the album: " + data.tracks.items[0].album.name);
	    		console.log("");

	    	})
		};



		function movies (){

			let movieName = [];

			for (let i = 3; i < process.argv.length; i++){
				const movieTitle = process.argv[i];
				movieName.push(movieTitle);
			}	


			let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

			console.log(queryUrl);

			request(queryUrl, function(error, response, body) {
			 
			  if (!error && response.statusCode === 200) {

			  	console.log(JSON.parse(body).JSON.parse(Ratings[1]));
			    // console.log("The movie's title is: " + JSON.parse(body).Title);
			    // console.log("This movie came out: " + JSON.parse(body).Released);
			    // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			    // console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body)['Ratings'][1]['value']);
			    // console.log("The movie was produced in: " + JSON.parse(body).Country);
			    // console.log("The movie's language is: " + JSON.parse(body).Language);
			    // console.log("The movie's plot is: " + JSON.parse(body).Plot);
			    // console.log("The movie's actors are: " + JSON.parse(body).Actors);

			  } 

			});
		}


	if (command === 'spotify-this-song'){ console.log(spot()); }

    if (command === 'movie-this'){ console.log(movies()); }

    if (command === "my-tweets"){ console.log(tweets()); } 
