import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
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
const db = getFirestore(app);

export async function saveUser(user, name, email) {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
        name: name,
        email: email,
        userId: user.uid
    });
    console.log("User's name saved successfully.");
}

export async function addNote(note, mood, userId) {
    await addDoc(collection(db, "notes"), {
        content: note,
        mood: mood,
        timestamp: new Date(),
        sender: userId,
        read: false
    });
}

export async function getNotes(userId) {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.sender !== userId && !data.read) {
            notes.push({ id: doc.id, ...data });
        }
    });
    return notes;
}

export async function getSenderName(senderID) {
    const userRef = doc(db, 'users', senderID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.name;
    } else {
        console.log('No such user!');
        return 'Unknown Sender';
    }
}

export async function markAsRead(noteId) {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { read: true });
}

export async function sendHeartbeat(userId) {
    await addDoc(collection(db, "heartbeats"), {
        sender: userId,
        timestamp: new Date(),
    });
}

export function listenForHeartbeats(userId, callback) {
    const heartbeatsRef = collection(db, "heartbeats");
    onSnapshot(heartbeatsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const heartbeat = change.doc.data();
                if (heartbeat.sender !== userId) {
                    callback();
                }
            }
        });
    });
}

export async function cleanupOldHeartbeats() {
    const heartbeatsRef = collection(db, "heartbeats");
    const querySnapshot = await getDocs(heartbeatsRef);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp.toDate();
        const now = new Date();
        const fiveSecondsAgo = new Date(now - 5000);
        if (timestamp < fiveSecondsAgo) {
            deleteDoc(doc.ref);
        }
    });
}

// Use for the Love Meter feature in the UI to get the number of notes sent by a user
export async function getNotesSentCountByUser(userId) {
    const querySnapshot = await getDocs(collection(db, "notes"));
    let count = 0;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.sender === userId) {
            count++;
        }
    });
    return count;
}


// Use for the Love Meter feature in the UI to get the number of notes sent by a user in the last 7 days
export async function getNotesSentCountByUserInLast7Days(userId) {
    const querySnapshot = await getDocs(collection(db, "notes"));
    let count = 0;
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp.toDate();
        if (data.sender === userId && timestamp >= sevenDaysAgo) {
            count++;
        }
    });
    return count;
}