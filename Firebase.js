import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyDAPTUKk8ThJkO6o3LGJwsrrFm-x-IQqc8",
  authDomain: "travel-diaryy.firebaseapp.com",
  projectId: "travel-diaryy",
  storageBucket: "travel-diaryy.appspot.com",
  messagingSenderId: "994289962426",
  appId: "1:994289962426:web:4a6a864dd526bf17c96183",
  measurementId: "G-3T9C2MS2CP",
};

firebase.initializeApp(config);

export default firebase;
