
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyDjet4Me3KgkjftAgkiUJMMrqR0xijtIuY",
    authDomain: "chatvoice-9c135.firebaseapp.com",
    projectId: "chatvoice-9c135",
    storageBucket: "chatvoice-9c135.firebasestorage.app",
    messagingSenderId: "478922956922",
    appId: "1:478922956922:web:8a72aa393d738c794d1bc3",
    measurementId: "G-CKTV83H1GJ"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
