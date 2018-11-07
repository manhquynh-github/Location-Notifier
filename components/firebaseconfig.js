import *as firebase from 'firebase';
  var config = {
    apiKey: "AIzaSyDT9GYNw2tetqrZlDTxbHbVH4KnuDC-Ajk",
    authDomain: "locationmap-rn.firebaseapp.com",
    databaseURL: "https://locationmap-rn.firebaseio.com",
    projectId: "locationmap-rn",
    storageBucket: "locationmap-rn.appspot.com",
    messagingSenderId: "522725050288"
  };
export const firebaseApp=  firebase.initializeApp(config);