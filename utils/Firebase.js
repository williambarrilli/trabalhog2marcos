import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDqoGfhV4phwxG6V5WXKY5EVGhZMp9fcuM",
  authDomain: "pedelegal.firebaseapp.com",
  databaseURL: "https://pedelegal.firebaseio.com",
  projectId: "pedelegal",
  storageBucket: "",
  messagingSenderId: "326162605236",
  appId: "1:326162605236:web:e9db0a459341d659"
};

export const fb = firebase.initializeApp(config);
export const db = firebase.database();