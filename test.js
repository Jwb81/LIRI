require('dotenv').config()
var Spotify = require('node-spotify-api')
var keys = require('./keys.js')
var request = require('request')
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
})

// var input = process.argv
// //console.log(input)
// for (var i = 2; i < input.length; i++) {
//     console.log(input[i])
// }

// var input = process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
var input = process.argv[2]
// var infoEntered = process.argv
// var input = process.argv[2]
// var title = ''
// if (process.argv[3] !== undefined) {
//   for (i = 3; i < infoEntered.length; i++) {
//     title += infoEntered[i] + ''
//   };
// };      
// Functions
function spotifyThis (song) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err)
    }
    var songs = data.tracks.items[0]
    console.log('\nArtist: ' + songs.artists[0].name + '\nSong Title: ' + songs.name + ' \nAlbum name: '  + songs.album.name + '\nPreview: ' + songs.preview_url)
  })
}
function movieThis (movie) {
    var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';
        console.log(queryURL)
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
        console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
}

function concertThis (artist) {
  request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(JSON.parse(body))
    }
  })
}

// Movie
// npm i request
// request('www.movie.com'+ searchterm)

// Logic
switch (input) {
  case 'spotify-this-song':
    spotifyThis(process.argv[3])

    
  case 'movie-this':
    movieThis(process.argv[3])

    
  case 'concert-this':
    concertThis(process.argv[3])

    break
  default:
    console.log('No input was found')
    break
} 
