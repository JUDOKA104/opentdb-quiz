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

    // Redirection automatique si le jeu est fini
    useEffect(() => {
        if (isGameOver) {
            navigate("/resultats"); // Ou une autre page de fin
        }
    }, [isGameOver, navigate]);

    // Sécurité : si on arrive sur la page sans questions (refresh par ex)
    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center p-10">
                <p>Aucune question chargée...</p>
                <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <main className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            {/* Header : Score et Timer */}
            <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-600">
                    Question {currentQuestionIndex + 1} / {questions.length}
                </span>
                <div className={`text-xl font-mono font-bold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
                    ⏱ {timeLeft}s
                </div>
                <span className="font-bold text-green-600">Score: {score}</span>
            </div>

            {/* Barre de progression visuelle */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
            </div>

            {/* La Question */}
            <h2 className="text-xl font-semibold mb-8 text-center">
                {currentQuestion.question}
            </h2>

            {/* Les Réponses (all_answers vient de ton formateur dans le Context) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.all_answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => answerQuestion(answer)}
                        className="p-4 border-2 border-blue-100 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left font-medium"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </main>
    );
};