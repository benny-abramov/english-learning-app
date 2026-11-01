# English Tutor - Interactive English Learning Platform for Hebrew Speakers

A modern, gamified web application specifically designed to help native Hebrew speakers master English grammar, phonics, vocabulary, and sentence structure.

## 🌟 Key Features

* **Phonics Arena & Pronunciation Training:**
  * Specially tailored for Hebrew speakers tackling difficult English distinctions (such as the Hebrew Pe/Fe / P vs F sounds, W vs V, TH voiced/unvoiced).
  * Interactive native speech synthesis using the Web Speech API with target sound repetition.

* **Sentence Architect & Word Order:**
  * Visual sentence builder addressing SVO (Subject-Verb-Object) vs Hebrew syntax patterns.

* **Verb Vault & Irregular Verbs:**
  * Interactive flashcards and drills targeting regular and irregular past/participle verb forms.

* **Gamified Motivation & Retention:**
  * **Interactive Audio Feedback:** Gentle victory tones and XP alerts using the Web Audio API.
  * **Achievements & Milestones:** Badges for streaks, accuracy, and module completion.
  * **Daily Goal Tracker:** Customizable daily targets (exercises & study minutes).
  * **Weekly Consistency Chart:** 7-day progress visualization using Recharts.
  * **Classroom Leaderboard:** Friendly mock peer rankings to encourage daily practice.

* **Parent & Teacher Portal:**
  * Detailed diagnostic insights, mastery rates, error analysis, and customizable curriculum pacing.

## 🚀 Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide React Icons, Framer Motion
* **Visualizations:** Recharts
* **Browser APIs:** Web Speech API (Pronunciation), Web Audio API (Synthesized SFX)

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   cd <YOUR-REPO-NAME>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be built into the `dist/` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or Firebase Hosting.

## 📄 License
MIT
