import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { saveScore } from "../services/firebase";

export const ScorePage = () => {
    const navigate = useNavigate();
    const { score, pseudo, difficulty, categoryId, totalTime, resetQuiz } = useQuiz();
    const hasSaved = useRef(false);

    useEffect(() => {
        const sendScore = async () => {
            if (!hasSaved.current && pseudo) {
                hasSaved.current = true;

                await saveScore(pseudo, score, difficulty, categoryId, totalTime);
            }
        };
        sendScore();
    }, [pseudo, score, difficulty, categoryId, totalTime]);

    const handlePlayAgain = () => {
        resetQuiz();
        navigate("/");
    };

    let performance = "";
    if (score < 5) performance = "Niveau Débutant - Des révisions sont nécessaires.";
    else if (score < 8) performance = "Niveau Intermédiaire - Bonnes bases acquises.";
    else performance = "Niveau Expert - Excellente maîtrise du sujet.";

    return (
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.2rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
                Rapport d'Évaluation
            </h1>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem 2rem', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '2.5rem', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
                <h2 style={{ fontSize: '5rem', margin: '0 0 10px 0', background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>{score}/10</h2>
                <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', fontSize: '1.5rem' }}>Candidat : {pseudo}</h3>
                <p style={{ color: score >= 8 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 600, margin: 0, fontSize: '1.1rem' }}>
                    {performance}
                </p>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem' }}>
                Vos résultats ont été automatiquement synchronisés avec la base de données de l'entreprise.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <button onClick={() => navigate('/leaderboard')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', boxShadow: 'none' }}>
                    📊 Classement Global
                </button>
                <button onClick={handlePlayAgain} className="btn-primary">
                    🔄 Nouvelle Évaluation
                </button>
            </div>
        </div>
    );
};