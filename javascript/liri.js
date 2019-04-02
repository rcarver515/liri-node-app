require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys")
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var keys = require("./keys.js")
var action = process.argv[2];
var search = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        concertThis(search)
        break;
    case "spotify-this-song":
        spotifyThis(search)
        break;
    case "movie-this":

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
    function movieThis(movie) {
        axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("The movie's rating is: " + response.data.imdbRating);
            }
        )
    }
}





