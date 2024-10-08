import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxObSfACQ95buYXmyZ9IyTKZvDxmNYhVM",
  authDomain: "restaurant-app-d615a.firebaseapp.com",
  projectId: "restaurant-app-d615a",
  storageBucket: "restaurant-app-d615a.appspot.com",
  messagingSenderId: "73154683636",
  appId: "1:73154683636:web:5e4f93b906d535b31174a1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
