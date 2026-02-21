# ⚡ TriviaPro - Plateforme d'Évaluation des Compétences

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![OpenTDB](https://img.shields.io/badge/OpenTDB-FF9900?style=for-the-badge&logo=micro-dot-blog&logoColor=white)

TriviaPro est une application web de quiz haute performance développée en **React / TypeScript**. Elle transforme l'API **Open Trivia Database** en un véritable outil d'évaluation technique avec un suivi des scores en temps réel via **Firebase Firestore**.

L'application mise sur une interface moderne "Glassmorphism" et une logique compétitive stricte où la précision et la rapidité sont les clés du succès.

🎮 **[👉 TESTER L'ÉVALUATION ICI (Live Demo) 👈](https://judoka104.github.io/opentdb-quiz/)**

---

## ✨ Fonctionnalités Globales

* **Personnalisation Complète** : Choix dynamique parmi 24 domaines d'expertise et 3 niveaux de difficulté (Easy, Medium, Hard) pour des sessions sur mesure.
* **Moteur de Quiz Interactif** : Gestion de 10 questions à choix multiples avec un chronomètre individuel de 10 secondes par question.
* **Algorithme de Classement Avancé (Tie-breaker)** : Le classement ne se base pas uniquement sur le score. En cas d'égalité, le système calcule le **temps total de complétion** pour départager les meilleurs candidats.
* **Leaderboard en Temps Réel** : Visualisation instantanée du Top 10 mondial, filtrable par thématique et par difficulté pour une comparaison pertinente des performances.
* **Rapport d'Analyse** : Feedback immédiat après l'évaluation avec un score sur 10 et une interprétation du niveau de compétence (Débutant à Expert).

---

## 🏗️ Organisation du Projet

Le projet suit une architecture modulaire et scalable, séparant strictement la logique métier des composants d'interface.

### 📁 `/src/context`
C'est le cœur de l'application. Le `QuizProvider` centralise l'état global : gestion du score, avancement des questions, chronométrage (individuel et global) et gestion des erreurs de chargement.

### 📁 `/src/services`
Contient l'intégration avec **Firebase Firestore**. On y retrouve les fonctions de sauvegarde asynchrone des scores et les requêtes complexes de récupération des classements avec tris multi-critères.

### 📁 `/src/pages`
Regroupe les vues principales de l'application :
* **HomePage** : Interface de configuration de la session.
* **QuizPage** : Interface de passage des tests.
* **ScorePage** : Synthèse des résultats et déclenchement de la sauvegarde.
* **LeaderboardPage** : Affichage des records avec logique de filtrage.

### 📁 `/src/components`
Composants atomiques et structurels réutilisables, incluant les fichiers de styles CSS dédiés :
* **QuizCard** : Composant complexe gérant l'affichage de la question et la barre de progression temporelle.
* **Podium** : Composant visuel pour la mise en avant des trois meilleurs scores.

### 📁 `/src/types` & `/src/constants`
Centralisation des interfaces TypeScript pour un typage strict des questions et des utilisateurs, ainsi que la configuration des domaines d'expertise issus de l'API.

---

## 🛠️ Stack Technique & Performances

* **Vite** : Pour un environnement de développement ultra-rapide et un build optimisé.
* **HashRouter** : Utilisation de la navigation par ancres pour garantir la persistance des routes sur n'importe quel hébergeur statique.
* **CSS Variables** : Utilisation d'un système de variables globales pour maintenir une cohérence graphique (Violet néon / Dark mode).
* **Protection Anti-Doublon** : Utilisation de `useRef` pour bloquer les doubles écritures en base de données lors des rendus React concomitants.

---

## 🚀 Installation Locale

Pour lancer ce projet sur votre machine, suivez ces étapes :

1. **Cloner le dépôt** :
```bash
git clone [https://github.com/JUDOKA104/opentdb-quiz.git](https://github.com/JUDOKA104/opentdb-quiz.git)
cd opentdb-quiz
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Lancer le serveur de développement** :
```bash
npm run dev
```

---
*Développé avec rigueur et passion pour l'apprentissage interactif.* 📝💻