import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from "react";
import type {QuizState, Question, Difficulty} from "../types";
import { decodeHtmlEntities } from "../utils/decode";

interface QuizContextProps extends QuizState {
    setOptions: (categoryId: string, difficulty: Difficulty) => void;
    fetchQuestions: () => Promise<boolean>;
    answerQuestion: (answer: string) => void;
    resetQuiz: () => void;
    timeLeft: number; // Chronomètre
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error("useQuiz doit être utilisé dans un QuizProvider");
    return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>("");

    // Nouveaux états pour la gestion de la partie
    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // Timer de 10 secondes
    const [error, setError] = useState<string | null>(null);

    // Enregistrer les choix depuis la page d'accueil
    const setOptions = (catId: string, diff: Difficulty) => {
        setCategoryId(catId);
        setDifficulty(diff);
    };

    // Récupérer et formater les questions d'OpenTDB
    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length === 0) throw new Error("Aucune question trouvée");

            // Formatage des questions (décodage HTML et mélange des réponses)
            const formattedQuestions = data.results.map((q: any) => {
                const decodedCorrect = decodeHtmlEntities(q.correct_answer);
                const decodedIncorrect = q.incorrect_answers.map(decodeHtmlEntities);

                // Mélange aléatoire des réponses pour l'affichage (QCM)
                const allAnswers = [decodedCorrect, ...decodedIncorrect].sort(() => Math.random() - 0.5);

                return {
                    ...q,
                    category: decodeHtmlEntities(q.category),
                    question: decodeHtmlEntities(q.question),
                    correct_answer: decodedCorrect,
                    incorrect_answers: decodedIncorrect,
                    all_answers: allAnswers,
                };
            });

            setQuestions(formattedQuestions);
            setCurrentQuestionIndex(0);
            setScore(0);
            setIsGameOver(false);
            setTimeLeft(10); // Reset du timer
            setIsLoading(false);
            setError(null);
            return true;
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            return false;
        }
    };

    // Traiter une réponse (ou un timeout)
    const answerQuestion = useCallback((answer: string) => {
        const currentQ = questions[currentQuestionIndex];

        // Si la réponse est correcte
        if (answer === currentQ?.correct_answer) {
            setScore((prev) => prev + 1);
        }

        // Passage à la question suivante ou fin de partie
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(10); // On réinitialise le temps pour la prochaine question
        } else {
            setIsGameOver(true);
        }
    }, [questions, currentQuestionIndex]);

    // --- GESTION DU TIMER ---
    useEffect(() => {
        // Le timer ne tourne que si on a des questions et que le jeu n'est pas fini
        if (questions.length === 0 || isGameOver) return;

        if (timeLeft === 0) {
            answerQuestion("TIME_OUT"); // Le temps est écoulé = mauvaise réponse
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // Nettoyage du chrono
    }, [timeLeft, questions.length, isGameOver, answerQuestion]);

    // Réinitialiser le contexte pour rejouer
    const resetQuiz = () => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);
        setCategoryId("");
        setDifficulty("");
        setTimeLeft(10);
    };

    return (
        <QuizContext.Provider
            value={{
                score, currentQuestionIndex, questions, categoryId, difficulty,
                isLoading, isGameOver, timeLeft, error,
                setOptions, fetchQuestions, answerQuestion, resetQuiz
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};