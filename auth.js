import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRQ1Wu8dnHbVzJtRx_MfsxRaU5yZAYMnM",
    authDomain: "lovenoteswebsite.firebaseapp.com",
    projectId: "lovenoteswebsite",
    storageBucket: "lovenoteswebsite.appspot.com",
    messagingSenderId: "105997806469",
    appId: "1:105997806469:web:4f466a42c74355db49b2ec",
    measurementId: "G-W252Q65Z4D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUp(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential && userCredential.user) {
            const user = userCredential.user;
            console.log("User signed up and signed in:", user.uid);
            return user;
        } else {
            console.error("Error: User credential or user object is null.");
        }
    } catch (error) {
        console.error("Error signing up:", error);
    }
}

export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in:", user.uid);
        return user;
    } catch (error) {
        console.error("Error signing in:", error);
    }
}

export function checkAuthState(callback) {
    onAuthStateChanged(auth, callback);
}