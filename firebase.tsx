import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: 'AIzaSyDMoogIftCEREjhQP1grwgQbTUuSI0xKXg',
    authDomain: 'test-c9850.firebaseapp.com',
    projectId: 'test-c9850',
    storageBucket: 'test-c9850.appspot.com',
    messagingSenderId: '413973808796',
    appId: '1:413973808796:web:999ea2f8d3e4cf1614cf59',
    measurementId: 'G-PMZT4N5V7C'
  };

const firebases = firebase.initializeApp(firebaseConfig);
export default firebase;