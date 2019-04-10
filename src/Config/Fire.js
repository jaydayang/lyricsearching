import firebase from "firebase";

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
