import firebase from "firebase";

// const config = {
//   apiKey: "AIzaSyDvPAPkBkMNwv1tsLFxdsQBFfeWVVTSQr4",
//   authDomain: "whats-the-lyric.firebaseapp.com",
//   databaseURL: "https://whats-the-lyric.firebaseio.com",
//   projectId: "whats-the-lyric",
//   storageBucket: "whats-the-lyric.appspot.com",
//   messagingSenderId: "24922569831"
// };

var config = {
  apiKey: "AIzaSyCMfWQJ22mYosQd0FFUexU1sDZJvtgHy14",
  authDomain: "lyrics-searching.firebaseapp.com",
  databaseURL: "https://lyrics-searching.firebaseio.com",
  projectId: "lyrics-searching",
  storageBucket: "lyrics-searching.appspot.com",
  messagingSenderId: "179074087016"
};
const fire = firebase.initializeApp(config);
export default fire;
