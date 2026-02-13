import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { useAuth } from "@/contexts/AuthContext";
import { calculateQuizStats } from "@/utils/helpers";
import { QUIZ_ACTIONS } from "@/utils/constants";
import Navbar from "@/components/common/Navbar";
import StickyFooter from "@/components/common/StickyFooter";
import ScoreCard from "@/components/result/ScoreCard";
import ReviewAnswerItem from "@/components/result/ReviewAnswerItem";

export default function ResultPage() {
  const navigate = useNavigate();
  const { questions, answers, settings, status, dispatch } = useQuiz();
  const { logout } = useAuth();
  const [filter, setFilter] = useState("all");

  // Redirect if no results
  useEffect(() => {
    if (status !== "finished" || !questions.length) {
      navigate("/setup", { replace: true });
    }
  }, [status, questions, navigate]);

  const stats = useMemo(
    () => calculateQuizStats(questions, answers),
    [questions, answers],
  );

  const reviewQuestions = useMemo(() => {
    return questions
      .map((q, i) => {
        const answer = answers.find((a) => a.questionIndex === i);
        return {
          ...q,
          userAnswer: answer?.selectedAnswer,
          isCorrect: answer?.isCorrect,
          index: i,
        };
      })
      .filter((q) => {
        if (filter === "correct") return q.isCorrect === true;
        if (filter === "incorrect") return q.isCorrect === false;
        return true;
      });
  }, [questions, answers, filter]);

  const handlePlayAgain = () => {
    dispatch({ type: QUIZ_ACTIONS.RESET_QUIZ });
    navigate("/setup", { replace: true });
  };

  const handleBackHome = () => {
    dispatch({ type: QUIZ_ACTIONS.RESET_QUIZ });
    logout();
    navigate("/", { replace: true });
  };

  // Guard: don't render if no results
  if (status !== "finished" || !questions.length) return null;

  return (
    <div className="min-h-screen bg-background-dark pb-24">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <ScoreCard stats={stats} timerDuration={settings.timerDuration} />

        {/* Review Answers */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-icons text-primary">grading</span>
              Review Answers
            </h2>
            <select
              className="bg-surface-dark border border-surface-border text-sm text-text-muted rounded-lg px-3 py-2 focus:ring-primary focus:border-primary cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Questions</option>
              <option value="correct">Correct Only</option>
              <option value="incorrect">Incorrect Only</option>
            </select>
          </div>

          <div className="space-y-4">
            {reviewQuestions.map((q) => (
              <ReviewAnswerItem key={q.index} question={q} />
            ))}
          </div>
        </section>
      </div>

      <StickyFooter>
        <button
          className="border border-surface-border text-text-muted hover:text-white hover:bg-surface-dark px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
          onClick={handleBackHome}
        >
          <span className="material-icons text-sm">arrow_back</span>
          Back to Home
        </button>
        <button
          className="bg-secondary hover:bg-secondary-dark text-surface-dark px-8 py-3 rounded-lg font-bold shadow-lg shadow-secondary/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          onClick={handlePlayAgain}
        >
          <span className="material-icons text-sm">replay</span>
          Play Again
        </button>
      </StickyFooter>
    </div>
  );
}
