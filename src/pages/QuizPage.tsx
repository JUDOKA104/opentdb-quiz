import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { QuizCard } from '../components/QuizCard/QuizCard';

export const QuizPage = () => {
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, answerQuestion, timeLeft, isGameOver } = useQuiz();

    // Redirection automatique quand le quiz est fini
    useEffect(() => {
        if (isGameOver) {
            navigate('/score');
        }
    }, [isGameOver, navigate]);

    if (questions.length === 0) return <div style={{textAlign: 'center', marginTop: '50px'}}>Chargement...</div>;

    return (
        <QuizCard
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            total={questions.length}
            timeLeft={timeLeft}
            onAnswer={answerQuestion}
        />
    );
};