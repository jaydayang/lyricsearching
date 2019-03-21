import ObservableModel from "./ObservableModel";

const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://api.musixmatch.com/ws/1.1/";
const API_KEY = "bbb26be6329cbeea6e0c3cad3cfdef6e";

class LyricModel extends ObservableModel {
  constructor() {
    super();
  }





  getLyrics() {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd`,
      { 'Origin': 'http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd' }

    )

  }
  getOneLyric(id) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`,
      { 'Origin': `http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd` }

    )
  }
  getOneTrack(id) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`,
      {
        'Origin': `http://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`
      }

    )
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
}

// Export an instance of DinnerModel
const modelInstance = new LyricModel();
export default modelInstance;
