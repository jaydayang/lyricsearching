import ObservableModel from "./ObservableModel";
import fire from "../Config/Fire";

const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://api.musixmatch.com/ws/1.1/";
const API_KEY = "bbb26be6329cbeea6e0c3cad3cfdef6e";
const GOOGLE_API_KEY = "AIzaSyASsF4YkpgdBuTQNFw9e7643XjXJfo-rQc";

class LyricModel extends ObservableModel {
  //constructor() {
  // super();
  //}
  ArtistId = ["13774235", "56", "13774236"];
  EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
      if (!this._events[event]) return; // no one is listening to this event
      for (var i = 0; i < this._events[event].length; i++)
        this._events[event][i](data);
    },
    subscribe: function (event, callback) {
      if (!this._events[event]) this._events[event] = []; // new event
      this._events[event].push(callback);
    },
    unSubscribe: function (event) {
      if (this._events && this._events[event]) {
        delete this._events[event];
      }
    }
  }

  getAppearMost(artistarray) {
    if (artistarray.length == 0) return null;
    var modeMap = {};
    var maxEl = artistarray[0],
      maxCount = 1;
    for (var i = 0; i < artistarray.length; i++) {
      var el = artistarray[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  getLyrics() {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd`,
      {
        Origin:
          "http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd"
      }
    );
  }
  getOneLyric(id) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`,
      {
        Origin: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`
      }
    );
  }
  getOneTrack(id) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`,
      {
        Origin: `http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`
      }
    );
  }
  savedOrNot(trackId, savedList) {
    if (savedList.indexOf(trackId) != -1) {
      return true;
    } else {
      return false;
    }
  }

  // getArtistID(artistName) {
  //   const query = `artist.search?q_artist=${artistName}&page_size=5&apikey=`;
  //   const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
  //   return fetch(url, {
  //     Origin: `${BASE_URL}${query}${API_KEY}`
  //   })

  // }

  getRelatedArtists(artistId) {
    const query = `artist.related.get?artist_id=${artistId}&page_size=10&page=1&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    });
  }
  getPopularSuggest(artistId) {
    const query = `track.search?f_artist_id=${artistId}&page_size=1&s_track_rating=desc&page=1&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    });
  }

  getRandomSuggest(country, amount) {
    const query = `chart.tracks.get?chart_name=mxmweekly&page=1&page_size=${amount}&country=${country}&f_has_lyrics=1&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  //SEARCH FOR TRACK WITH LYRIC
  //@param lyricQuery: words within they lyrics to search
  //return tracks whose lyric match the parameter
  searchTrack(lyricQuery) {
    const wordToSearch = lyricQuery;
    const query = `track.search?q_lyrics=${wordToSearch}&page_size=9&page=1&s_track_rating=desc&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  //GET TOP 5 FROM COUNTRY
  //@param lyricQuery: words within they lyrics to search
  //return tracks whose lyric match the parameter
  getTopChart(country, amount) {
    const query = `chart.tracks.get?chart_name=top&page=1&page_size=${amount}&country=${country}&f_has_lyrics=1&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  // translate() {

  //   // Your Google Cloud Platform project ID
  //   const projectId = '87c3c2ac44372e66acd2b14a05ceb60e4324cdc3	';

  //   // Instantiates a client

  //   var Translate = require('@google-cloud/translate');

  //   var translate = new Translate.Translate({ projectId: projectId, });

  //   // The text to translate
  //   const text = 'Hello, world!';
  //   // The target language
  //   const target = 'ru';

  //   // Translates some text into Russian
  //   translate
  //     .translate(text, target)
  //     .then(results => {
  //       const translation = results[0];

  //       console.log(`Text: ${text}`);
  //       console.log(`Translation: ${translation}`);
  //     })
  //     .catch(err => {
  //       console.error('ERROR:', err);
  //     });
  // }

  // translate() { require('google-translate-api'); }
  //SEARCH FOR AN ARTIST
  //@param name : string with the name of the artist to search
  //return artists with same or similar name
  searchArtist(name) {
    const query = `artist.search?q_artist=${name}&page_size=12&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  //get all albums from an artist
  //@artistId : int musix match ID from the artist
  //return object with all albums from artist
  getArtistAlbums(artistId) {
    const query = `artist.albums.get?artist_id=${artistId}&s_release_date=desc&g_album_name=1&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    console.log("getartsitalbums");
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }
  //Get all tracks from a specific album
  //@id :int  of the album in NUM
  // return object with all the tracks from the album
  getAlbumTracks(id) {
    const query = `album.tracks.get?album_id=${id}&page=1&page_size=20&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  //Get the top chart of artists
  //@country : string name of the country to get top chart from
  //@amount : number quantity of top artists to display
  //return the top artist of the country
  getTopChartArtist(country, amount) {
    const query = `chart.artists.get?page=1&page_size=${amount}&country=${country}&apikey=`;
    const url = `${CORS_URL}${BASE_URL}${query}${API_KEY}`;
    return fetch(url, {
      Origin: `${BASE_URL}${query}${API_KEY}`
    }).then(response => response.json());
  }

  addFavoriteLyric({ selectedLyric }) {
    const userUid = fire.auth().currentUser.uid;
    const lyricId = selectedLyric.track_id;

    return fire
      .database()
      .ref(userUid)
      .update({
        [lyricId]: selectedLyric
      });
  }

  removeFavoriteLyric({ selectedLyric }) {
    const userUid = fire.auth().currentUser.uid;
    const lyricId = selectedLyric.track_id;

    return fire
      .database()
      .ref(userUid)
      .child(lyricId)
      .remove();
  }
}

// Export an instance of DinnerModel
const modelInstance = new LyricModel();
export default modelInstance;
