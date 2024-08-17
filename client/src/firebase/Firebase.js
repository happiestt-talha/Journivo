// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "journivo-156fc.firebaseapp.com",
    projectId: "journivo-156fc",
    storageBucket: "journivo-156fc.appspot.com",
    messagingSenderId: "860441147986",
    appId: "1:860441147986:web:442db0062e80932b343d8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);