require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys")
var Spotify = require('node-spotify-api');
var Omdb = require('omdb');

var spotify = new Spotify(keys.spotify);

var keys = require("./keys.js")
var action = process.argv[2];
var search = process.argv.slice(3).join(" ");
var movie = process.argv[2];

switch (action) {
    case "concert-this":
        concertThis(search)
        break;
    case "spotify-this-song":
        spotifyThis(search)
        break;
    case "movie-this":
        movieThis(search);
        break;
    default:
        break;
}

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (results) {
        console.log("Venue: ", results.data[0].venue.name);
        console.log("Location: ", results.data[0].venue.city);
        console.log("Date: ", moment(results.data[0].datetime).format("MM/DD/YYYY"));
    })
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artists Name: ", data.tracks.items[0].album.artists[0].name);
        console.log("Songs Name: ", data.tracks.items[0].name);
        console.log("Preview link: ", data.tracks.items[0].preview_url);
        console.log("Albums Name: ", data.tracks.items[0].album.name);
    });

}


function movieThis(movie) {

    var queryUrl = `http://www.omdbapi.com/?t=${movie}&apikey=aa0539ef`;

    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log("The movie title is: ", response.data.Title);
            console.log("The movie premiered in: ", response.data.Year);
            console.log("The IMDB rating is: ", response.data.imdbRating);
            console.log("The movie was filmed in: ", response.data.Country);
            console.log("The primary language(s): ", response.data.Language);
            console.log("The plot for is as follows: ", response.data.Plot);
        
        }
    )
}






