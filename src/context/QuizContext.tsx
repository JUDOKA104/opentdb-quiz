import { createContext, useContext, useState, type ReactNode, useEffect, useCallback, useRef } from "react";
import type { QuizState, Question, Difficulty } from "../types";
import { decodeHtmlEntities } from "../utils/decode";

interface QuizContextProps extends QuizState {
    setOptions: (categoryId: string, difficulty: Difficulty, pseudo: string) => void;
    fetchQuestions: (catId: string, diff: Difficulty) => Promise<boolean>;
    answerQuestion: (answer: string) => void;
    resetQuiz: () => void;
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
    const [pseudo, setPseudo] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [error, setError] = useState<string | null>(null);
    const [totalTime, setTotalTime] = useState(0);
    const startTimeRef = useRef<number>(0);

    // 1. CORRECTION ICI : On ajoute bien "p: string" pour recevoir le pseudo
    const setOptions = (catId: string, diff: Difficulty, p: string) => {
        setCategoryId(catId);
        setDifficulty(diff);
        setPseudo(p); // On sauvegarde le paramètre reçu
    };

    const fetchQuestions = async (catId: string, diff: Difficulty) => {
        setIsLoading(true);
        setError(null); // On réinitialise l'erreur au début
        try {
            const url = `https://opentdb.com/api.php?amount=10&category=${catId}&difficulty=${diff}&type=multiple`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length === 0) throw new Error("Aucune question trouvée avec ces filtres.");

            const formattedQuestions = data.results.map((q: any) => {
                const decodedCorrect = decodeHtmlEntities(q.correct_answer);
                const decodedIncorrect = q.incorrect_answers.map(decodeHtmlEntities);
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
            setTimeLeft(10);
            setIsLoading(false);
            startTimeRef.current = Date.now();
            setTotalTime(0);
            return true;
        } catch (err: any) {
            console.error(err);
            setIsLoading(false);
            setError(err.message); // On met à jour l'état d'erreur en cas de problème
            return false;
        }
    };

    const answerQuestion = useCallback((answer: string) => {
        const currentQ = questions[currentQuestionIndex];

        if (answer === currentQ?.correct_answer) {
            setScore((prev) => prev + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(10);
        } else {
            const timeElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setTotalTime(timeElapsed);
            setIsGameOver(true);
        }
    }, [questions, currentQuestionIndex]);

    useEffect(() => {
        if (questions.length === 0 || isGameOver) return;

        if (timeLeft === 0) {
            answerQuestion("TIME_OUT");
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, questions.length, isGameOver, answerQuestion]);

    const resetQuiz = () => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);
        setCategoryId("");
        setDifficulty("");
        setTimeLeft(10);
        setPseudo("");
        setError(null);
    };

    return (
        <QuizContext.Provider
            value={{
                score, currentQuestionIndex, questions, categoryId, difficulty,
                isLoading, isGameOver, timeLeft, error, pseudo, totalTime,
                setOptions, fetchQuestions, answerQuestion, resetQuiz
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};