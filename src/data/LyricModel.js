import ObservableModel from "./ObservableModel";

const BASE_URL = "https://api.musixmatch.com/ws/1.1/";
const httpsOptions = {
  headers: { "apikey": "bbb26be6329cbeea6e0c3cad3cfdef6e" },

};

class LyricModel extends ObservableModel {
  constructor() {
    super();

  }



getLyrics() {
    return fetch(
      'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd',
      { 'Origin': 'http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&apikey=75a3689308a4c098e37def64c71c62dd' }

    ).then(response => console.log(response.json()))

  }
//
// getLyrics() {
//   const request = `${BASE_URL}chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=bbb26be6329cbeea6e0c3cad3cfdef6e`;
//
//   return fetch(
//     'https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=bbb26be6329cbeea6e0c3cad3cfdef6e',
//     {
//       mode:'no-cors',
//       dataType: "jsonp",
//       headers: {
//         'Access-Control-Allow-Credentials' : true,
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Methods':'GET',
//         'Access-Control-Allow-Headers':'application/jsonp',
//       },
//     }
//   ).then(response => console.log(response));
// }


}

// Export an instance of DinnerModel
const modelInstance = new LyricModel();
export default modelInstance;
