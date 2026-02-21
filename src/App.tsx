import { HashRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom"; //
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ScorePage } from "./pages/ScorePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { useQuiz } from "./context/QuizContext";
import type {JSX} from "react";

const NavBar = () => (
    <nav className="glass-nav">
        <div className="nav-logo">⚡ TriviaPro</div>
        <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Accueil</NavLink>
            <NavLink to="/leaderboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>🏆 Leaderboard</NavLink>
        </div>
    </nav>
);

const ProtectedScoreRoute = ({ children }: { children: JSX.Element }) => {
    const { isGameOver, pseudo } = useQuiz();
    if (!isGameOver || !pseudo) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/score" element={
                    <ProtectedScoreRoute>
                        <ScorePage />
                    </ProtectedScoreRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;