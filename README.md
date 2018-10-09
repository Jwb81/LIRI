# LIRI
LIRI is a language interpreter that understands a few command line commands.  The user can call the bot from the terminal and get back some information about a movie, song, or concert event.  Every program call is logged to 'log.txt' for later access.

## Functions
- Search movies: *movie-this* or *movie* 
- Search songs: *spotify-this-song* or *song*
- Search for concert events: *concert-this* or *concert*
- Randomize (picks one of the above functions): *do-what-it-says* or *random*




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