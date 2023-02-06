import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBEgD-w2pK68BdYK3AK2NDZxYnLXLQnLcM",
    authDomain: "runchit-auth.firebaseapp.com",
    projectId: "runchit-auth",
    storageBucket: "runchit-auth.appspot.com",
    messagingSenderId: "479480313617",
    appId: "1:479480313617:web:8a1b0baa7e91c115c57eb0",
    measurementId: "G-NJTKR1E6FN"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }