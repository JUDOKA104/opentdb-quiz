import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
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

// Empêche d'accéder au score si la partie n'est pas finie
const ProtectedScoreRoute = ({ children }: { children: JSX.Element }) => {
    const { isGameOver, pseudo } = useQuiz();
    if (!isGameOver || !pseudo) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />

                {/* On protège l'accès à /score ! */}
                <Route path="/score" element={
                    <ProtectedScoreRoute>
                        <ScorePage />
                    </ProtectedScoreRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;