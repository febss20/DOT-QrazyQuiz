import { useState, useCallback, useRef, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { QUIZ_ACTIONS, FEEDBACK_DELAY_MS } from "@/utils/constants";

export function useAnswerHandler({ onQuizEnd, onNextQuestion }) {
  const { currentIndex, questions, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleAnswer = useCallback(
    (answer) => {
      if (selectedAnswer) return;

      const currentQuestion = questions[currentIndex];
      const isCorrect = answer === currentQuestion.correct_answer;

      setSelectedAnswer(answer);
      setShowResult(true);

      dispatch({
        type: QUIZ_ACTIONS.ANSWER_QUESTION,
        payload: { answer, isCorrect },
      });

      // Auto-advance after feedback delay
      timeoutRef.current = setTimeout(() => {
        if (currentIndex >= questions.length - 1) {
          onQuizEnd();
        } else {
          dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
          setSelectedAnswer(null);
          setShowResult(false);
          onNextQuestion?.();
        }
      }, FEEDBACK_DELAY_MS);
    },
    [
      selectedAnswer,
      questions,
      currentIndex,
      dispatch,
      onQuizEnd,
      onNextQuestion,
    ],
  );

  return { selectedAnswer, showResult, handleAnswer };
}
