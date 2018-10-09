# LIRI
LIRI bot is a language interpreter just as SIRI is a speech interpreter

## Functions
- Search movies
- Search songs
- Search for concert events
- Randomize: is one of the three functions above

## Shortcuts
Instead of typing out the full function name, the user can use 'movie', 'song', or 'concert' in place of the above functions, respectively.


### Search Songs
Uses the OMDB API to search for a given title and it displays a few details about that movie.
- Usage: **node liri.js movie-this 'movie-name'**
- Example: **node liri.js movie-this 'The Martian'**


### Search Movies
Uses the Spotify API to search for results based on a given song name.  The default number is 1 song unless another argument is given after the song name
- Usage: **node liri.js spotify-this-song 'song-name' [, limit]**
- Example: **node liri.js spotify-this-song 'Just Hold On'**    // returns first result
- Example: **node liri.js spotify-this-song 'Just Hold On' 3**  // returns first 3 results

### Search Concerts
Uses the BandsInTown API to search for events based on the given artist.  The default is 1 event unless another argument is given
- Usage: **node liri.js concert-this 'artist-name' [, limit]**
- Example: **node liri.js concert-this 'Maroon 5'**             // returns first result
- Example: **node liri.js concert-this 'Maroon 5' 2**             // returns first 2 results