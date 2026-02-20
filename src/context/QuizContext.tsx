import { createContext, useContext, useState, type ReactNode } from "react";
import type {QuizState} from "../types";

// TODO : Ajouter les fonctions (setOptions, fetchQuestions, answerQuestion...)
interface QuizContextProps extends QuizState {}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error("useQuiz must be used within a QuizProvider");
    return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    // States de base
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState<any>("");

    return (
        <QuizContext.Provider value={{ score, currentQuestionIndex, questions, categoryId, difficulty }}>
            {children}
        </QuizContext.Provider>
    );
};