
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAngahe7SKn5RwCoPO6eGTpKDP3oyLm3dI",
  authDomain: "andromeda-85fd3.firebaseapp.com",
  databaseURL: "https://andromeda-85fd3-default-rtdb.firebaseio.com",
  projectId: "andromeda-85fd3",
  storageBucket: "andromeda-85fd3.appspot.com",
  messagingSenderId: "827019129718",
  appId: "1:827019129718:web:a8a9e97f24fe8f25438057",
  measurementId: "G-RQ4NFQJDH1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export default app;
