# 🧠 QrazyQuiz

Aplikasi kuis interaktif berbasis React yang mengambil soal dari [Open Trivia Database](https://opentdb.com/). Dibuat sebagai solusi Case Study DOT Indonesia.

## ✨ Fitur

- **Login** — Autentikasi username dengan route protection
- **Konfigurasi Kuis** — Pilih kategori, tipe soal, difficulty, timer, dan jumlah soal
- **Gameplay** — Satu soal per halaman dengan auto-advance & feedback visual
- **Timer** — Countdown 1-15 menit, kuis otomatis selesai saat habis
- **Hasil & Review** — Statistik skor, review jawaban dengan filter
- **Resume Kuis** — Progress tersimpan di localStorage, bisa dilanjutkan setelah browser ditutup

## 🛠️ Tech Stack

| Teknologi    | Versi |
| ------------ | ----- |
| React        | 19.x  |
| Vite         | 7.x   |
| Tailwind CSS | 4.x   |
| React Router | 7.x   |

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/febss20/DOT-QrazyQuiz.git
cd DOT-QrazyQuiz

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

## 📁 Struktur Proyek

```
src/
├── components/     # UI components (Timer, QuestionCard, ScoreCard, dll.)
├── contexts/       # React Context (Auth, Quiz) + Reducer
├── hooks/          # Custom hooks (useTimer, useAnswerHandler, dll.)
├── pages/          # Halaman (Login, Setup, Quiz, Result)
├── services/       # API layer (OpenTDB integration)
├── styles/         # Global CSS + theme
└── utils/          # Constants & helper functions
```

## 📝 Scripts

| Command           | Keterangan                  |
| ----------------- | --------------------------- |
| `npm run dev`     | Jalankan development server |
| `npm run build`   | Build untuk production      |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Jalankan ESLint             |
