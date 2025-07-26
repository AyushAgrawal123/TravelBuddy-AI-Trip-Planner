// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { firebase/}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKE82cdhPyVzQ22jhHEFvzrTeeagOOo4o",
    authDomain: "travelbuddy-37583.firebaseapp.com",
    projectId: "travelbuddy-37583",
    storageBucket: "travelbuddy-37583.firebasestorage.app",
    messagingSenderId: "280697795982",
    appId: "1:280697795982:web:b8c090a35f708b87f360df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//npm install -g firebase-tools 