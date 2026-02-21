import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { categories, difficulties } from '../constants/data';
import type {Difficulty} from '../types';

export const HomePage = () => {
    const navigate = useNavigate();
    const { setOptions, fetchQuestions, isLoading, error } = useQuiz();

    const [pseudo, setPseudo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');

    const handleStartQuiz = async () => {
        if (!selectedCategory || !selectedDifficulty || !pseudo.trim()) return;
        setOptions(selectedCategory, selectedDifficulty as Difficulty, pseudo.trim());
        const success = await fetchQuestions(selectedCategory, selectedDifficulty as Difficulty);
        if (success) navigate('/quiz');
    };

    const isButtonDisabled = !selectedCategory || !selectedDifficulty || !pseudo.trim() || isLoading;

    return (
        <div className="glass-panel" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: 800, color: 'white' }}>Évaluation des Compétences</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Configurez les paramètres de votre session d'évaluation.</p>
            </div>

            {error && <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ff7675', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: 600 }}>{error}</div>}

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>👤 Identifiant du candidat</label>
                <input type="text" className="input-text" placeholder="Ex: Jean Dupont" value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={20} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>📚 Domaine d'expertise</label>
                <select className="select-box" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="" disabled>-- Sélectionner un domaine --</option>
                    {categories.map((cat) => <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>)}
                </select>
            </div>

            <div style={{ marginBottom: '3rem' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>⚙️ Niveau de difficulté</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '10px' }}>
                    {difficulties.map((diff) => (
                        <label key={diff.value} style={{ flex: 1, padding: '14px', background: selectedDifficulty === diff.value ? 'rgba(139, 92, 246, 0.3)' : 'rgba(0,0,0,0.2)', border: `1px solid ${selectedDifficulty === diff.value ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s', boxShadow: selectedDifficulty === diff.value ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none' }}>
                            <input type="radio" name="difficulty" value={diff.value} checked={selectedDifficulty === diff.value} onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)} style={{ display: 'none' }} />
                            <span style={{ fontWeight: '800', color: selectedDifficulty === diff.value ? 'white' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{diff.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button onClick={handleStartQuiz} disabled={isButtonDisabled} className="btn-primary">
                {isLoading ? "⏳ PRÉPARATION DU MODULE..." : "📝 DÉMARRER L'ÉVALUATION"}
            </button>
        </div>
    );
};