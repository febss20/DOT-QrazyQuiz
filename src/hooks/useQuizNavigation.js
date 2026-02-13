import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { QUIZ_ACTIONS } from "@/utils/constants";

export function useQuizNavigation() {
  const navigate = useNavigate();
  const { questions, status, dispatch } = useQuiz();

  // Redirect if no active quiz
  useEffect(() => {
    if (status !== "active" || !questions.length) {
      if (status === "finished") {
        navigate("/result", { replace: true });
      } else if (status !== "loading") {
        navigate("/setup", { replace: true });
      }
    }
  }, [status, questions, navigate]);

  const finishAndNavigate = useCallback(() => {
    dispatch({ type: QUIZ_ACTIONS.FINISH_QUIZ });
    navigate("/result", { replace: true });
  }, [dispatch, navigate]);

  return { finishAndNavigate };
}
