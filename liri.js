require('dotenv').config();
let Spotify = require('node-spotify-api');
let request = require('request');
let moment = require('moment');
let fs = require('fs');
let keys = require('./keys');

let args = process.argv.slice(2);
if (args.length < 1)
    return console.log('usage: <action> <name-of-media>');

let spotify = new Spotify(keys.spotify);
let omdbUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=';
let bandsUrlBase = 'https://rest.bandsintown.com/artists/';
let bandsUrlEnd = '/events?app_id=codingbootcamp';

let functions = {
    'spotify-this-song': (song, limit = 1) => {
        searchSpotify(song, limit);
    },

    'concert-this': (artist) => {
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

let searchSpotify = (song, limit) => {
    spotify.search({
        type: 'track',
        query: song,
        limit: limit
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(
            `*************************************************` +
            `\n\nArtist: ${data.tracks.items[0].album.artists[0].name}` +
            `\nName: ${data.tracks.items[0].name}` +
            `\nPreview: ${data.tracks.items[0].external_urls.spotify}` +
            `\nAlbum: ${data.tracks.items[0].album.name}` +
            `\n\n*************************************************`
        )

        fs.writeFile('log.json', JSON.stringify(data, null, 2), err => {
            if (err)
                console.log(err);
        });
    });
}

let searchBands = (artist) => {
    let query = bandsUrlBase + artist + bandsUrlEnd;
    request(query, (err, res, body) => {
        body = JSON.parse(body);
        fs.writeFile('log.json', JSON.stringify(body[0], null, 2), (err) => {
            if (err)
                return console.log(err);
        })
    })
}

let searchMovies = (movie) => {
    let query = omdbUrl + movie;
    request(query, (err, res, body) => {
        body = JSON.parse(body);

        console.log(
            `*************************************************` +
            `\n\nTitle: ${body.Title}` +
            `\nYear: ${body.Year}` +
            `\nIMDB Rating: ${body.imdbRating}` +
            `\nRT Rating: ${body.Ratings[1].Source === 'Rotten Tomatoes' ? body.Ratings[1].Value : '-'}` +
            `\nCountry: ${body.Country}` +
            `\nLanguage: ${body.Language}` +
            `\nPlot: ${body.Plot}` +
            `\nActors: ${body.Actors}` +
            `\n\n*************************************************`
        )
        fs.writeFile('log.json', JSON.stringify(body, null, 2), (err) => {
            if (err)
                return console.log(err);
        })
    })
}

let action = args[0];
switch (action) {
    case 'song':
        action = 'spotify-this-song';
        break;
    case 'movie':
        action = 'movie-this';
        break;
    case 'band':
        action = 'band-this';
        break;
    default:
        // do nothing
}
functions[action](args[1]);