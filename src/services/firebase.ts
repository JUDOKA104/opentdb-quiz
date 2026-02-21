// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzVdUbw96jofAv5MesmWcO2VSvrjfZhyo",
    authDomain: "opentdb-quiz.firebaseapp.com",
    projectId: "opentdb-quiz",
    storageBucket: "opentdb-quiz.firebasestorage.app",
    messagingSenderId: "518589352129",
    appId: "1:518589352129:web:f0ebe51af8625d533aac40"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Sauvegarder un score
export const saveScore = async (pseudo: string, score: number, difficulty: string) => {
    try {
        await addDoc(collection(db, "leaderboard"), {
            pseudo,
            score,
            difficulty,
            date: new Date().toISOString()
        });
        console.log("Score sauvegardé avec succès !");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du score :", error);
    }
};

// Récupérer le Top 10
export const getTop10Scores = async () => {
    try {
        const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const topScores: any[] = [];

        querySnapshot.forEach((doc) => {
            topScores.push({ id: doc.id, ...doc.data() });
        });

        return topScores;
    } catch (error) {
        console.error("Erreur lors de la récupération du Leaderboard :", error);
        return [];
    }
};