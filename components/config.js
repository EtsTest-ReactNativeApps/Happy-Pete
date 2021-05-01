import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyD4ugtvgGs8924VRtJ3azi910d7vCa9Pus',
    authDomain: 'happy-pete-311622.firebaseapp.com',
    databaseURL: 'https://happy-pete-311622-default-rtdb.firebaseio.com',
    projectId: 'happy-pete-311622',
    storageBucket: 'happy-pete-311622.appspot.com',
    messagingSenderId: '986482081677',
    appId: '1:986482081677:android:bd611654eba575943247c4'
};

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
