# LIRI
LIRI bot is a language interpreter just as SIRI is a speech interpreter

##Functions
- Search movies: Uses the OMDB API to search for a given title and it displays a few details about that movie.
    - Usage: **node liri.js movie-this 'movie-name'**
- Search songs: Uses the Spotify API to search for results based on a given song name.  The default number is 1 song unless another argument is given after the song name
    - Usage: **node liri.js spotify-this-song 'song-name' [, limit]**
- Search for concert events: Uses the BandsInTown API to search for events based on the given artist.  The default is 1 event unless another argument is given
    - Usage: **node liri.js concert-this 'artist-name' [, limit]**

##Shortcuts
Instead of typing out the full function name, the user can use 'movie', 'song', or 'concert' in place of the above functions, respectively.