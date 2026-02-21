import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { categories, difficulties } from "../constants/data";
import type { Difficulty } from "../types";

export const HomePage = () => {
    const navigate = useNavigate();

    // On extrait tout ce dont on a besoin depuis le contexte
    const {
        categoryId,
        difficulty,
        setOptions,
        fetchQuestions,
        isLoading
    } = useQuiz();

    const handleStart = async () => {
        // Validation simple avant de lancer l'API
        if (!categoryId || !difficulty) {
            alert("Veuillez choisir une catégorie et une difficulté");
            return;
        }

        const success = await fetchQuestions();

        if (success) {
            // Navigation vers la page de jeu si les questions sont chargées
            navigate("/quiz");
        } else {
            alert("Erreur réseau : Impossible de récupérer les questions.");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Quiz Master</h1>
            <p>Configurez votre partie :</p>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="category">Catégorie : </label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setOptions(e.target.value, difficulty)}
                >
                    <option value="">-- Sélectionner --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="difficulty">Difficulté : </label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setOptions(categoryId, e.target.value as Difficulty)}
                >
                    <option value="">-- Sélectionner --</option>
                    {difficulties.map((diff) => (
                        <option key={diff.value} value={diff.value}>
                            {diff.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleStart}
                disabled={!categoryId || !difficulty || isLoading}
                style={{ padding: "10px 20px", cursor: "pointer" }}
            >
                {isLoading ? "Chargement..." : "Démarrer le Quiz"}
            </button>
        </div>
    );
};