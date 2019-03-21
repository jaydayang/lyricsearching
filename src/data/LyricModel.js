import ObservableModel from "./ObservableModel";



const BASE_URL = "http://api.musixmatch.com/ws/1.1";
const httpOptions = {
  headers: {

  },



};
const apikey = "75a3689308a4c098e37def64c71c62dd";

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
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd`,
      { 'Origin': `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=75a3689308a4c098e37def64c71c62dd` }

    )
  }







}

// Export an instance of DinnerModel
const modelInstance = new LyricModel();
export default modelInstance;
