import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ScorePage } from "./pages/ScorePage";

function App() {
    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Home</Link><br/>
                <Link to="quiz">Quiz</Link><br/>
                <Link to="/score">Score</Link><br/>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/score" element={<ScorePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;