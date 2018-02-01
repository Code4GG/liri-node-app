const config = require("dotenv").config();

const keys = require("./keys.js");

const command = process.argv[2];

const Twitter = require('twitter');

const request = require("request");

const client = new Twitter(keys.twitter);


		// const params = {

		// 	screen_name: 'code_purposes',

		// 	count: 20
		// }

		// function tweets(){ client.get('statuses/user_timeline', params, searchedData,{
		// 		  if (error) {
		// 		    console.log(error);
		// 		  }
		// 	})
		// }; 

		// function searchedData(err, data, response) {

		// 	// console.log(data[0].text);
		// 	// console.log(data[0].created_at);

		// 	let t = data;

		// 	for (let i = 0; i < t.length; i++){
		// 		console.log(t[i].text) ;
		// 		console.log(t[i].created_at);
		// 	}
		// }

		// 	if (command === "my-tweets"){

		// 	console.log(tweets());

		// 	} 


const Spotify = require('spotify');	
const spotify = new Spotify(keys.spotify);	

		spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
    	}
    		console.log(data);
    });


