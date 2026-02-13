import { useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { QUIZ_ACTIONS } from "@/utils/constants";
import { useTimer } from "@/hooks/useTimer";
import { useQuizNavigation } from "@/hooks/useQuizNavigation";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import Timer from "@/components/quiz/Timer";
import ProgressBar from "@/components/quiz/ProgressBar";
import QuestionCard from "@/components/quiz/QuestionCard";

export default function QuizPage() {
  const {
    questions,
    currentIndex,
    settings,
    status,
    timeRemaining: savedTime,
    dispatch,
  } = useQuiz();
  const { finishAndNavigate } = useQuizNavigation();
  const { selectedAnswer, showResult, handleAnswer } = useAnswerHandler({
    onQuizEnd: finishAndNavigate,
  });

  const { timeRemaining, start } = useTimer(
    savedTime || settings.timerDuration,
    finishAndNavigate,
  );

  // Start timer on mount
  useEffect(() => {
    if (status === "active") {
      start();
    }
  }, [status, start]);

  // Sync time to context for localStorage save
  useEffect(() => {
    if (status === "active") {
      dispatch({ type: QUIZ_ACTIONS.SET_TIME, payload: timeRemaining });
    }
  }, [timeRemaining, status, dispatch]);

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-dark/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            className="text-text-muted hover:text-red-400 transition-colors text-sm font-medium flex items-center gap-1"
            onClick={finishAndNavigate}
          >
            <span className="material-icons text-base">logout</span>
            <span className="hidden sm:inline">Quit Game</span>
          </button>

          <ProgressBar current={currentIndex + 1} total={questions.length} />

          <Timer
            timeRemaining={timeRemaining}
            totalTime={settings.timerDuration}
          />
        </div>
      </header>

      {/* Question Body */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-4xl w-full">
          <QuestionCard
            key={currentIndex}
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 z-40 bg-surface-dark/80 backdrop-blur-md border-t border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-text-muted">
            © 2026 QrazyQuiz App. All rights reserved.
          </span>
          <div className="text-xs text-text-muted">
            {currentIndex + 1} of {questions.length} questions
          </div>
        </div>
      </footer>
    </div>
  );
}
