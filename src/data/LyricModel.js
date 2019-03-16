import ObservableModel from "./ObservableModel";

const BASE_URL = "http://api.musixmatch.com/ws/1.1";
const httpOptions = {
  headers: { "apikey": "75a3689308a4c098e37def64c71c62dd" },

};

class LyricModel extends ObservableModel {
  constructor() {
    super();

  }





  getLyrics() {
    return fetch(
      `${BASE_URL}/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc`,
      {
        headers: {
          "apikey": "75a3689308a4c098e37def64c71c62dd"
        },

      }
    ).then(response => console.log(response));


  }


}

// Export an instance of DinnerModel
const modelInstance = new LyricModel();
export default modelInstance;
