# LIRI
LIRI is a language interpreter that understands a few command line commands.  The user can call the bot from the terminal and get back some information about a movie, song, or concert event.  Every program call is logged to 'log.txt' for later access.

### Functions
- Search movies: *movie-this* or *movie* 
- Search songs: *spotify-this-song* or *song*
- Search for concert events: *concert-this* or *concert*
- Randomize (picks one of the above functions): *do-what-it-says* or *random*

---
## Search Movies
Uses the OMDB API to search for a given title and it displays a few details about that movie.
- Usage: **node liri.js movie-this 'movie-name'**
<!-- - Example: **node liri.js movie-this 'The Martian'** -->
- Returned data: 
    - Title
    - Release year
    - IMDB rating and Rotten Tomatoes rating
    - Origin country
    - Movie language
    - Plot
    - Main actors
- Demo
![Get movie](/assets/images/movie-this.PNG)


## Search Songs
Uses the Spotify API to search for results based on a given song name.  The default number is 1 song unless another argument is given after the song name
- Usage: **node liri.js spotify-this-song 'song-name' [, limit]**
<!-- - Example: **node liri.js spotify-this-song 'Just Hold On'**    // returns first result -->
<!-- - Example: **node liri.js spotify-this-song 'Just Hold On' 3**  // returns first 3 results -->
-  Returned data:
    - Artist(s)
    - Song name
    - Preview link on Spotify
    - Album name
- Demo (get first result)
![Search for a song](/assets/images/spotify-1.PNG)
- Demo (get first 3 results)
![Search for a song](/assets/images/spotify-2.PNG)


## Search Concerts
Uses the BandsInTown API to search for events based on the given artist.  The default is 1 event unless another argument is given
- Usage: **node liri.js concert-this 'artist-name' [, limit]**
<!-- - Example: **node liri.js concert-this 'Maroon 5'**             // returns first result -->
<!-- - Example: **node liri.js concert-this 'Maroon 5' 2**             // returns first 2 results -->
- Returned data: 
    - Venue name
    - Venue location
    - Date of the event
- Demo (get the next event)
![Search for an event](/assets/images/concert-this-1.PNG)
- Demo (get the next 3 events)
![Search for an event](/assets/images/concert-this-2.PNG)


## Video demonstration
[Follow this link to download a demo](/assets/videos/demo.webm)



---
## Setup
1. Clone this repo to your host machine and run **npm install** to install required packages
2. Create a *.env* file in the root directory to store API keys.  The format should look like this:
```
# Spotify API keys

SPOTIFY_ID=YOUR_SPOTIFY_KEY_HERE
SPOTIFY_SECRET=YOUR_SPOTIFY_SECRET_HERE

# BandsInTown API keys
BANDSINTOWN_KEY=YOUR_KEY_HERE

# OMDB API key
OMDB_KEY=YOUR_KEY_HERE

```
3. You're good to go.  Try running it!