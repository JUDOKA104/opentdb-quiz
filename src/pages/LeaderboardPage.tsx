import { useEffect, useState } from "react";
import { getTop10Scores } from "../services/firebase";
import { Podium } from "../components/Podium/Podium";
import { categories, difficulties } from "../constants/data";

export const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [filterCategory, setFilterCategory] = useState<string>("9");
    const [filterDifficulty, setFilterDifficulty] = useState<string>("easy");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsFetching(true);
            const scores = await getTop10Scores(filterCategory, filterDifficulty);
            setLeaderboard(scores);
            setIsFetching(false);
        };
        fetchLeaderboard();
    }, [filterCategory, filterDifficulty]);

    const top3 = leaderboard.slice(0, 3);
    const others = leaderboard.slice(3, 10);

    return (
        <div className="glass-panel" style={{ animation: 'slideUp 0.5s ease-out' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.8rem' }}>
                Classement Global des Évaluations
            </h1>

            {/* LES MENUS DÉROULANTS POUR FILTRER */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <select className="select-box" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ flex: 1, minWidth: '200px' }}>
                    {categories.map((cat) => <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>)}
                </select>

                <select className="select-box" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} style={{ flex: 1, minWidth: '200px' }}>
                    {difficulties.map((diff) => <option key={diff.value} value={diff.value}>{diff.name}</option>)}
                </select>
            </div>

            {/* 1. L'ÉTAT DE CHARGEMENT PRO */}
            {isFetching ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <span>Synchronisation avec le serveur sécurisé...</span>
                </div>
            ) : leaderboard.length === 0 ? (

                /* 2. L'ÉTAT VIDE PRO (EMPTY STATE) */
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>Base de données vierge</h3>
                    <p style={{ margin: 0 }}>Aucune évaluation n'a encore été complétée. Soyez le premier à inscrire votre nom.</p>
                </div>

            ) : (
                <>
                    {/* Le Podium ( inchangé ) */}
                    <Podium top3={top3} />

                    {/* 3. LA LISTE AVEC EFFETS AU SURVOL */}
                    {others.length > 0 && (
                        <div className="leaderboard-table">
                            {others.map((s, index) => (
                                <div key={s.id} className="leaderboard-row">
                                    <span style={{ width: '60px', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        #{index + 4}
                                    </span>
                                    <span style={{ flex: 1, fontWeight: 500 }}>
                                        {s.pseudo}
                                    </span>
                                    <span className="badge-score">
                                        {s.score} pts
                                    </span>
                                    <span className="badge-score">
                                         {s.score} pts <span style={{fontSize: '0.8em', opacity: 0.8}}>({s.totalTime}s)</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};