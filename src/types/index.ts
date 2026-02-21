export type Difficulty = "easy" | "medium" | "hard" | "";

export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[]; // Réponses mélangées
}

export interface QuizState {
    score: number;
    currentQuestionIndex: number;
    questions: Question[];
    categoryId: string;
    difficulty: Difficulty;
    isLoading: boolean;
    isGameOver: boolean;
    timeLeft: number;
    error: string | null;
}