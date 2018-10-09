require('dotenv').config();
let Spotify = require('node-spotify-api');
let request = require('request');
let moment = require('moment');
let fs = require('fs');
var keys = require('./keys');

// get the arguments from the user
let args = process.argv.slice(2);

// make sure the user inputs at least 2 arguments
if (args.length < 1)
    return console.log('usage: <action> <name-of-media>');

// create a new spotify object with the constructor
let spotify = new Spotify(keys.keys.spotify);

// set the base url for OMDB API
let omdbUrl = 'http://www.omdbapi.com/?apikey=' + keys.keys.omdb + '&t=';

// set the url for Bands in Town API
let bandsUrlBase = 'https://rest.bandsintown.com/artists/';
let bandsUrlEnd = '/events?app_id=' + keys.keys.bandsInTown;

// put functions in an object that will be called by the user on the command line
let functions = {
    'spotify-this-song': (song, limit = 1) => {
        searchSpotify(song, limit);
    },

    'concert-this': (artist) => {
        if (artist == '') 
            console.log('Nothing');
        searchBands(artist);
    },

    'movie-this': (movie) => {
        searchMovies(movie);
    },

    'do-what-it-says': () => {
        fs.readFile('./random.txt', 'utf8', (err, data) => {
            if (err)
                return console.log(err);

            let params = data.split(',');
            functions[params[0]](params[1]);
        })
    }
}

// search Spotify for a specific track name
let searchSpotify = (song, limit) => {
    spotify.search({
        type: 'track',
        query: song,
        limit: limit
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let items = data.tracks.items;

        if (items.length === 0) {
            console.log('Sorry, but that song did not return any results...');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            console.log(
                `*************************************************` +
                `\n\nArtist: ${items[i].album.artists[0].name}` +
                `\nName: ${items[i].name}` +
                `\nPreview: ${items[i].external_urls.spotify}` +
                `\nAlbum: ${items[i].album.name}` +
                `\n\n*************************************************`
            )
        }

        fs.writeFile('log.json', JSON.stringify(data, null, 2), err => {
            if (err)
                console.log(err);
        });
    });
}

// search BandsInTown API for events when given an artist name
let searchBands = (artist) => {
    let query = bandsUrlBase + artist + bandsUrlEnd;
    request(query, (err, res, body) => {
        body = JSON.parse(body);

        if (!body[0])
            return console.log('That artist returned no results...');
        else
            console.log(body);

        // fs.writeFile('log.json', JSON.stringify(body[0], null, 2), (err) => {
        //     if (err)
        //         return console.log(err);
        // })
    })
}

// search OMDB for a movie and log details about it
let searchMovies = (movie) => {
    let query = omdbUrl + movie;
    request(query, (err, res, body) => {
        // parse the returned data
        body = JSON.parse(body);

        // check if there is a result
        if (body.Response === 'False') {
            console.log('Sorry, that movie did not return any results...');
            return;
        }

        // check to see if there is a rating available for Rotten Tomatoes
        let rtRating;
        if (body.Ratings.length)
            body.Ratings.forEach(x => {
                if (x.Source === 'Rotten Tomatoes') {
                    rtRating = x.Value;
                }
            })

        // display the data in the console
        console.log(
            `*************************************************` +
            `\n\nTitle: ${body.Title}` +
            `\nYear: ${body.Year}` +
            `\nIMDB Rating: ${body.imdbRating}` +
            `\nRT Rating: ${rtRating || '-'}` +
            `\nCountry: ${body.Country}` +
            `\nLanguage: ${body.Language}` +
            `\nPlot: ${body.Plot}` +
            `\nActors: ${body.Actors}` +
            `\n\n*************************************************`
        )

        // log some data out to the log.json file
        fs.writeFile('log.json', JSON.stringify(body, null, 2), (err) => {
            if (err)
                return console.log(err);
        })
    })
}

let action = args[0]; // get the action from the user on the command line when this program is called
let ops = args.slice(1); // hold all arguments beyond the function call
let defaultSong = 'The Sign';

// added some shortcuts for each function call
switch (action) {
    case 'song':
        action = 'spotify-this-song';
        break;
    case 'movie':
        action = 'movie-this';
        break;
    case 'concert':
        action = 'concert-this';
        break;
    default:
        // do nothing
        break;
}

// make sure the user entered a valid command
if (!functions[action])
    return console.log('That is not a valid command...');

// call the function specified by the user
if (ops.length)
    functions[action](...ops);
else if (action == 'song' || action == 'spotify-this-song')
    functions[action](defaultSong);
else {
    // there is no default for the other functions, so tell the user to enter a value
    console.log('Please enter a search term with that search...')
}