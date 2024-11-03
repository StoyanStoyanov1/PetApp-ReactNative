import { initializeApp } from 'firebase/app';
import {addDoc, collection, Firestore, getFirestore, getDocs, doc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRrtosyIb-PVaiRof8LlKlGUen93vwH8w",
    authDomain: "test-7f364.firebaseapp.com",
    projectId: "test-7f364",
    storageBucket: "test-7f364.firebasestorage.app",
    messagingSenderId: "435104847400",
    appId: "1:435104847400:web:b6973fe2e35b4fb2c0c71d",
    measurementId: "G-W12CS6TPWZ"
} 

export default class Firebase {
    static db;
    
    static init() {
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app);
    }

    static async getQuotes() {
        console.log("Fetching quotes...");
        let quotes = [];
        const querySnapshot = await getDocs(collection(Firebase.db, 'quotes'));
        querySnapshot.forEach((quote) => {
            quotes.push({
                id: quote.id,
                text: quote.data().text,
                author: quote.data().author,
            });
        });
        console.log("Quotes fetched:", quotes);
        return quotes;
    }
    
    

    static async saveQuote(text, author) {
        const docRef = await addDoc(collection(Firebase.db, 'quotes'), {
            text, 
            author
        });

        return docRef.id;
    }

    static removeQuote(id) {
        deleteDoc(doc(Firebase.db, 'quotes', id));
    }
}