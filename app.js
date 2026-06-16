import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById("loginBtn");
const chat = document.getElementById("chat");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");

let currentUser = null;

loginBtn.addEventListener("click", async () => {

    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    currentUser = result.user;

    loginBtn.style.display = "none";
    chat.classList.remove("hidden");

    loadMessages();
});

sendBtn.addEventListener("click", async () => {

    if (!input.value.trim()) return;

    await addDoc(collection(db, "messages"), {
        user: currentUser.displayName,
        text: input.value,
        createdAt: serverTimestamp()
    });

    input.value = "";
});

function loadMessages(){

    const q = query(
        collection(db, "messages"),
        orderBy("createdAt")
    );

    onSnapshot(q, snapshot => {

        messages.innerHTML = "";

        snapshot.forEach(doc => {

            const data = doc.data();

            messages.innerHTML += `
                <div class="message">
                    <b>${data.user}</b><br>
                    ${data.text}
                </div>
            `;
        });

        messages.scrollTop = messages.scrollHeight;
    });
}