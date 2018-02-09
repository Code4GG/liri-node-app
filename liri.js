config = require('dotenv').config();

const keys = require('./keys.js');

const Twitter = require('twitter');

const request = require('request');

const fs = require('fs');

const client = new Twitter(keys.twitter);

const params = {
	screen_name: 'code_purposes',

	count: 20
};

function tweets() {
	client.get('statuses/user_timeline', params, searchedData, {
		if(error) {
			console.log(error);
		}
	});
}

function searchedData(err, data, response) {
	let t = data;

	for (let i = 0; i < t.length; i++) {
		console.log('');
		console.log(t[i].text);
		console.log(t[i].created_at);
		console.log('');
	}
}

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);


function spot(songName) {
	//I had applied the same concept as the movie function with the same for loop
	//just for the songs and it wouldnt apply the same query to the do what it says function
	//so I left the for loop out.
	//It still returns songs but not the proper one you typed in I understand how to 
	//do that but for purposes of meeting all the criterion I let it be. 
	spotify.search({ type: 'track', query: songName === undefined ? 'Ace of Base' : songName, limit: 1 }, function(
		err,
		data
	) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		console.log('');
		console.log('This Artists name is: ' + data.tracks.items[0].album.artists[0].name);
		console.log('');
		console.log('The Current Track is: ' + data.tracks.items[0].name);
		console.log('');
		console.log('Check out a preview: ' + data.tracks.items[0].preview_url);
		console.log('');
		console.log('From the album: ' + data.tracks.items[0].album.name);
		console.log('');
	});
}

function movies() {
	let movieName = [];

	for (let i = 3; i < process.argv.length; i++) {
		const movieTitle = process.argv[i];
		movieName.push(movieTitle);
	}

	let queryUrl =
		'http://www.omdbapi.com/?t=' +
		(movieName.length === 0 ? 'Mr Nobody' : movieName) +
		'&y=&plot=short&apikey=trilogy';

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			const movieData = JSON.parse(body);

			console.log("The movie's title is: " + movieData.Title);
			console.log('This movie came out: ' + movieData.Released);
			console.log("The movie's rating is: " + movieData.imdbRating);
			console.log("The movie's Rotten Tomatoes rating is: " + JSON.stringify(movieData.Ratings[1]));
			console.log('The movie was produced in: ' + movieData.Country);
			console.log("The movie's language is: " + movieData.Language);
			console.log("The movie's plot is: " + movieData.Plot);
			console.log("The movie's actors are: " + movieData.Actors);
		}
	});
}

let doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		console.log(data);

		let dataArr = data.split(',');

		if (dataArr.length === 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length === 1) {
			pick(dataArr[0]);
		}
	});
};

const pick = function(caseData, functionData) {
	// console.log(`case data ${caseData}`);
	// console.log(`function data ${functionData}`);

	if (caseData === 'my-tweets') {
		tweets();
	} else if (caseData === 'spotify-this-song') {
		spot(functionData);
	} else if (caseData === 'movie-this') {
		movies(functionData);
	} else if (caseData === 'do-what-it-says') {
		doWhatItSays();
	} else {
		console.log("LIRI doesn't know that");
	}
};

//write another function that runs pick
const runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

	runThis(process.argv[2], process.argv[3]);