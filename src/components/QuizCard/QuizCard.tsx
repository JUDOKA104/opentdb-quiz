import type {Question} from '../../types';
import './QuizCard.css';

interface QuizCardProps {
    question: Question;
    currentIndex: number;
    total: number;
    timeLeft: number;
    onAnswer: (answer: string) => void;
}

export const QuizCard = ({ question, currentIndex, total, timeLeft, onAnswer }: QuizCardProps) => {
    return (
        <div className="quiz-card">
            {/* Barre de progression du temps */}
            <div
                className="quiz-progress-bar"
                style={{ width: `${(timeLeft / 10) * 100}%` }}
            />

            <div className="quiz-header">
                <span>Question {currentIndex + 1} / {total}</span>
                <span className={`quiz-timer ${timeLeft <= 3 ? 'warning' : ''}`}>
                    ⏱ {timeLeft}s
                </span>
            </div>

            <h2 className="quiz-question">
                {question.question}
            </h2>

            <div className="quiz-answers-grid">
                {question.all_answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(answer)}
                        className="quiz-answer-btn"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};