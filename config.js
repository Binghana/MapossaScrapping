
import firebase from '@react-native-firebase/app';

const credentials = {
    clientId: '',
    appId: '1:462737693135:android:f55631725012010ba45aba',
    apiKey: 'AIzaSyArjo7NVj5kM2zEo9vIg6DzkU1ToZ9WQBM',
    databaseURL: 'mapossadatatech.firebaseapp.com',
    storageBucket: 'mapossadatatech.appspot.com',
    messagingSenderId: '462737693135',
    projectId: 'mapossadatatech',
    gaTrackingId: 'G-Q2B6WQWR48'
};

console.log("Initialisation")
if (firebase.apps.length === 0) {
    console.log("initialisation effective ")
    firebase.initializeApp(credentials);
}
