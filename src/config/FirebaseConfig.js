import firebase from 'react-native-firebase'

const androidConfig = {
    clientId: '359210477373-0go7n76jr78a3c8ltomn054b8co000oo.apps.googleusercontent.com',
    appId: '1:359210477373:android:7e3cc04d489a49ef',
    apiKey: 'AIzaSyD9g6MmoJtr4RQtN5tAbB-cs_T9kkcSUNI',
    databaseURL: 'https://location-notifier-8994c.firebaseio.com',
    storageBucket: 'location-notifier-8994c.appspot.com',
    messagingSenderId: '359210477373',
    projectId: 'location-notifier-8994c',

    // enable persistence by adding the below flag
    persistence: true,
};

const stationApp = firebase.initializeApp(
    // use platform specific firebase config
    androidConfig,
    // name of this app
    'stations',
);
export const rootRef = stationApp.database().ref();
export const verRef = rootRef.child('version');
export const atmRef = rootRef.child("ATM");
export const gasRef = rootRef.child("GAS");