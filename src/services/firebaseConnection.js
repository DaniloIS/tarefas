import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyBjfNMM5g9Xf7IM-xLUsx8GoLTrEDIp7_Y",
  authDomain: "tarefas-e8141.firebaseapp.com",
  projectId: "tarefas-e8141",
  storageBucket: "tarefas-e8141.appspot.com",
  messagingSenderId: "54121646821",
  appId: "1:54121646821:web:1a4a7c94bf417c2c22220c",
  measurementId: "G-N6BNZJ84LX"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;