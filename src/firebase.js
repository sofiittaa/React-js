import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';




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

//1) una referencia a la aplicacion/plataforma de firebase (es la constante app)
//2)Una referencia a la base de datos de firebsae (Se hace con la funcion getFirestore de firebase)
//3)La consulta

export default firebaseConfig;