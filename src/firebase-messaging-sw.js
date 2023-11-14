importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyA8ZWTbb3M4uWImzkd6ToE4Vj5P-aNQ3To",
  authDomain: "lets-bunk-again-com.firebaseapp.com",
  projectId: "lets-bunk-again-com",
  storageBucket: "lets-bunk-again-com.appspot.com",
  messagingSenderId: "347467439723",
  appId: "1:347467439723:web:3d9fbf8a128b56b55d1b2e",
  measurementId: "G-WCQ5LJLX8S"
});

const messaging = firebase.messaging();
