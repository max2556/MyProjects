//Скрипт для инициализации базы данных


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxit_wHPl4AGKfCgE3Cgiil_Jyu5n2fDA",
    authDomain: "tetris-b9875.firebaseapp.com",
    projectId: "tetris-b9875",
    storageBucket: "tetris-b9875.appspot.com",
    messagingSenderId: "782836609935",
    databaseURL: "https://tetris-b9875-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:782836609935:web:78b252a934ca501d8291fa",
    measurementId: "G-8YPBX20L9Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);