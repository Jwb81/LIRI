// console.log('this is loaded');

exports.keys = {
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
  },
  // bandsInTown: 'codingbootcamp',
  // omdb: 'trilogy'
  bandsInTown: process.env.BANDSINTOWN_KEY,
  omdb: process.env.OMDB_KEY
  
};

