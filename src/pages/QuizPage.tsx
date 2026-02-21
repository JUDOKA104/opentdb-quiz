import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export const QuizPage = () => {
    const navigate = useNavigate();
    const {
        questions,
        currentQuestionIndex,
        answerQuestion,
        score,
        timeLeft,
        isGameOver
    } = useQuiz();

    // --- LOGIQUE DE REDIRECTION ---
    useEffect(() => {
        if (isGameOver) {
            // On attend que l'état isGameOver soit vrai pour changer de page
            navigate("/score");
        }
    }, [isGameOver, navigate]);

    // Sécurité si on actualise la page (données perdues)
    if (questions.length === 0 && !isGameOver) {
        return (
            <div className="flex flex-col items-center mt-20">
                <p className="mb-4 text-gray-600">Aucune question trouvée...</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    // On récupère la question actuelle via l'index du contexte
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <main className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            {/* Header : Infos de progression */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestionIndex + 1} sur {questions.length}
                </span>
                <div className={`text-xl font-mono font-bold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
                    ⏱ {timeLeft}s
                </div>
                <span className="font-bold text-green-600">Score: {score}</span>
            </div>

            {/* Barre de temps visuelle */}
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
            </div>

            {/* Enoncé de la question */}
            <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
                {currentQuestion?.question}
            </h2>

            {/* Grille des réponses */}
            <div className="grid grid-cols-1 gap-4">
                {currentQuestion?.all_answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => answerQuestion(answer)}
                        className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left font-medium text-gray-700"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </main>
    );
};