import firebase from 'firebase'

 var firebaseConfig = {
    apiKey: "AIzaSyAnqF9qth6jDspS-IjVccCV5RyW4lJdObM",
    authDomain: "baatein-3c758.firebaseapp.com",
    databaseURL: "https://baatein-3c758.firebaseio.com",
    projectId: "baatein-3c758",
    storageBucket: "",
    messagingSenderId: "116398959391",
    appId: "1:116398959391:web:a74f05abb462c830"
  };
  // Initialize Firebase
  var fire= firebase.initializeApp(firebaseConfig);

  export default fire