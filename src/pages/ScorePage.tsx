import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

interface HighScore {
    score: number;
    date: string;
}

export const ScorePage = () => {
    const navigate = useNavigate();
    const { score, resetQuiz } = useQuiz();
    const [history, setHistory] = useState<HighScore[]>([]);

    useEffect(() => {
        // 1. Récupérer l'historique existant
        const savedHistory = JSON.parse(localStorage.getItem("quiz_history") || "[]");

        // 2. Ajouter le nouveau score
        const newScore: HighScore = {
            score: score,
            date: new Date().toLocaleDateString(),
        };

        const updatedHistory = [...savedHistory, newScore]
            .sort((a, b) => b.score - a.score) // Trier du plus grand au plus petit
            .slice(0, 5); // Garder seulement le top 5

        setHistory(updatedHistory);
        localStorage.setItem("quiz_history", JSON.stringify(updatedHistory));
    }, [score]);

    const handlePlayAgain = () => {
        resetQuiz();
        navigate("/");
    };

    return (
        <main className="max-w-md mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Fin de partie !</h1>
            <p className="text-xl mb-8">Ton score : <span className="text-blue-600 font-bold">{score} / 10</span></p>

            <h2 className="text-2xl font-semibold mb-6">🏆 Podium Top 3</h2>

            <div className="flex justify-center items-end gap-2 mb-10 h-48">
                {/* 2ème PLACE */}
                {history[1] && (
                    <div className="flex flex-col items-center">
                        <span className="font-bold">{history[1].score} pts</span>
                        <div className="bg-gray-300 w-16 h-24 rounded-t-lg flex items-center justify-center text-2xl font-bold text-gray-600">
                            2
                        </div>
                    </div>
                )}

                {/* 1ère PLACE */}
                {history[0] && (
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-yellow-600">{history[0].score} pts</span>
                        <div className="bg-yellow-400 w-16 h-32 rounded-t-lg shadow-lg flex items-center justify-center text-3xl font-bold text-yellow-800">
                            1
                        </div>
                    </div>
                )}

                {/* 3ème PLACE */}
                {history[2] && (
                    <div className="flex flex-col items-center">
                        <span className="font-bold">{history[2].score} pts</span>
                        <div className="bg-orange-300 w-16 h-16 rounded-t-lg flex items-center justify-center text-xl font-bold text-orange-800">
                            3
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={handlePlayAgain}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
                Rejouer
            </button>
        </main>
    );
};