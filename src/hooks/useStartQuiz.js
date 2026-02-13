import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { QUIZ_ACTIONS } from "@/utils/constants";
import { fetchSessionToken, fetchQuestions } from "@/services/triviaApi";

export function useStartQuiz() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startQuiz = async (quizSettings) => {
    setLoading(true);
    setError("");

    try {
      const token = await fetchSessionToken();

      dispatch({
        type: QUIZ_ACTIONS.SET_SETTINGS,
        payload: quizSettings,
      });

      const questions = await fetchQuestions({
        ...quizSettings,
        token,
      });

      dispatch({
        type: QUIZ_ACTIONS.START_QUIZ,
        payload: { questions, sessionToken: token },
      });

      navigate("/quiz");
    } catch (err) {
      setError(err.message || "Failed to start quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, startQuiz };
}
