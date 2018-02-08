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


		function spot(){

			for (let i = 3; i < process.argv.length; i++){
				let songName = process.argv[i];
				song.push(songName);
			}	


			spotify.search({ type: 'track', query: song.length === 0 ? 'Ace of Base' : song, limit: 1 }, function(err, data) {
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


			
			let queryUrl = "http://www.omdbapi.com/?t=" + (movieName.length === 0 ? 'Mr Nobody' : movieName) + "&y=&plot=short&apikey=trilogy";
			
			console.log(queryUrl);

			request(queryUrl, function(error, response, body) {
			 
			  if (!error && response.statusCode === 200) {
			  	
			  	const movieData = JSON.parse(body);

			  	
			    console.log("The movie's title is: " + movieData.Title);
			    console.log("This movie came out: " + movieData.Released);
			    console.log("The movie's rating is: " + movieData.imdbRating);
			    console.log("The movie's Rotten Tomatoes rating is: " + JSON.stringify(movieData.Ratings[1]));
			    console.log("The movie was produced in: " + movieData.Country);
			    console.log("The movie's language is: " + movieData.Language);
			    console.log("The movie's plot is: " + movieData.Plot);
			    console.log("The movie's actors are: " + movieData.Actors);

			  } 

			});
		}

    const doWhatItSays = function(){

    fs.readFile("random.txt", "utf8", function(data,err) {
	    
	     if(err) {
	     	console.log(err);
	     } else{

			    const dataArr = data.split(",");

			     if (dataArr.length === 2) {

			     	pick(dataArr[0], dataArr[1]);

			     } 

			     else if (dataArr.length === 1) {

			     	pick(dataArr[0]);

			     }
			    }
	        })
	    }
		
		const pick = function(){

			if (command === 'spotify-this-song'){ console.log(spot()); }

		    if (command === 'movie-this'){ console.log(movies()); }

		    if (command === 'my-tweets'){ console.log(tweets()); } 

		    if (command === 'do-what-it-says') {doWhatItSays(); }
	      
	    }    

	    //write another function that runs pick
	    const runThis = function(argOne,argTwo){
	    	pick(argOne,argTwo);
	    }

	    runThis(process.argv[2],process.argv[3]);
