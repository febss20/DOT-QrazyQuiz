import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { useStartQuiz } from "@/hooks/useStartQuiz";
import { fetchCategories } from "@/services/triviaApi";
import {
  TIMER_OPTIONS,
  QUESTION_AMOUNTS,
  DIFFICULTY_OPTIONS,
  TYPE_OPTIONS,
} from "@/utils/constants";
import Navbar from "@/components/Navbar";
import ResumeModal from "@/components/ResumeModal";
import CategoryPicker from "@/components/CategoryPicker";
import ToggleGroup from "@/components/ToggleGroup";
import QuestionSlider from "@/components/QuestionSlider";
import ProTip from "@/components/ProTip";

export default function SetupPage() {
  const navigate = useNavigate();
  const { getSavedQuiz, resumeQuiz, clearSavedQuiz, settings } = useQuiz();
  const { loading, error, startQuiz } = useStartQuiz();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    settings.category || "",
  );
  const [selectedType, setSelectedType] = useState(settings.type || "");
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    settings.difficulty || "",
  );
  const [selectedTimer, setSelectedTimer] = useState(
    settings.timerDuration || 600,
  );
  const [questionAmount, setQuestionAmount] = useState(
    settings.amount || QUESTION_AMOUNTS.default,
  );
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedQuiz, setSavedQuiz] = useState(null);

  // Check for saved quiz
  useEffect(() => {
    const saved = getSavedQuiz();
    if (saved) {
      setSavedQuiz(saved);
      setShowResumeModal(true);
    }
  }, [getSavedQuiz]);

  // Fetch categories
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleResume = () => {
    resumeQuiz(savedQuiz);
    setShowResumeModal(false);
    navigate("/quiz");
  };

  const handleStartNew = () => {
    clearSavedQuiz();
    setShowResumeModal(false);
    setSavedQuiz(null);
  };

  const handleStartQuiz = () => {
    startQuiz({
      amount: questionAmount,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      type: selectedType,
      timerDuration: selectedTimer,
    });
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar />

      {showResumeModal && (
        <ResumeModal onResume={handleResume} onStartNew={handleStartNew} />
      )}

      <div className="flex items-center justify-center p-4 py-8">
        {/* Background blobs */}
        <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-3xl bg-surface-dark rounded-xl shadow-2xl overflow-hidden border border-slate-700 animate-slideUp">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold text-white">New Quiz Session</h1>
          </div>

          <div className="px-8 py-8 space-y-8">
            <CategoryPicker
              categories={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            {/* Type + Difficulty */}
            <div className="grid md:grid-cols-2 gap-6">
              <ToggleGroup
                label="Question Type"
                icon="fact_check"
                options={TYPE_OPTIONS}
                value={selectedType}
                onChange={setSelectedType}
              />
              <ToggleGroup
                label="Difficulty Level"
                icon="equalizer"
                options={DIFFICULTY_OPTIONS}
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
              />
            </div>

            {/* Timer + Questions */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <ToggleGroup
                label="Timer Duration"
                icon="timer"
                options={TIMER_OPTIONS}
                value={selectedTimer}
                onChange={setSelectedTimer}
                columns={4}
              />
              <QuestionSlider
                value={questionAmount}
                onChange={setQuestionAmount}
              />
            </div>

            <ProTip />

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-800/50 border-t border-slate-700 flex items-center justify-between">
            <button
              className="text-slate-400 hover:text-slate-200 font-medium text-sm flex items-center gap-1 transition-colors"
              onClick={() => navigate("/")}
            >
              <span className="material-icons text-sm">arrow_back</span>
              Back to Dashboard
            </button>
            <button
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleStartQuiz}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <span>Start Quiz</span>
                  <span className="material-icons text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
