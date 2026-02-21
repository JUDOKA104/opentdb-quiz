import './Podium.css';

interface Player {
    id?: string;
    pseudo: string;
    score: number;
}

interface PodiumProps {
    top3: Player[];
}

export const Podium = ({ top3 }: PodiumProps) => {
    if (top3.length === 0) return null;

    return (
        <div className="podium-container">
            {/* 2ème Place */}
            {top3[1] && (
                <div className="podium-step podium-2">
                    <span className="podium-pseudo">{top3[1].pseudo}</span>
                    <span className="podium-score">{top3[1].score} pts</span>
                    <div className="podium-block">2</div>
                </div>
            )}

            {/* 1ère Place */}
            {top3[0] && (
                <div className="podium-step podium-1">
                    <span className="podium-pseudo" style={{ color: 'var(--gold)' }}>{top3[0].pseudo}</span>
                    <span className="podium-score">{top3[0].score} pts</span>
                    <div className="podium-block">1</div>
                </div>
            )}

            {/* 3ème Place */}
            {top3[2] && (
                <div className="podium-step podium-3">
                    <span className="podium-pseudo">{top3[2].pseudo}</span>
                    <span className="podium-score">{top3[2].score} pts</span>
                    <div className="podium-block">3</div>
                </div>
            )}
        </div>
    );
};