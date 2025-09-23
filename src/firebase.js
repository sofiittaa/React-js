import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyD4USXJ6-Ltrbmjt9O85PHALlV-rdab6Zo",
  authDomain: "react-js-4d43d.firebaseapp.com",
  projectId: "react-js-4d43d",
  storageBucket: "react-js-4d43d.firebasestorage.app",
  messagingSenderId: "535661606627",
  appId: "1:535661606627:web:704774526c4e97961af7d6"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export default firebaseConfig;

