import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { STORAGE_KEYS, QUIZ_ACTIONS } from "@/utils/constants";
import { quizReducer, initialState } from "./quizReducer";

const QuizContext = createContext(null);

function parseSavedQuiz() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_STATE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.status === "active" && parsed.questions?.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState, () => {
    const saved = parseSavedQuiz();
    return saved ? { ...initialState, ...saved } : initialState;
  });

  // Auto-save state to localStorage when quiz is active (debounced)
  useEffect(() => {
    if (state.status !== "active") return;

    const timer = setTimeout(() => {
      const saveData = {
        questions: state.questions,
        currentIndex: state.currentIndex,
        answers: state.answers,
        timeRemaining: state.timeRemaining,
        settings: state.settings,
        status: state.status,
        sessionToken: state.sessionToken,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATE, JSON.stringify(saveData));
    }, 500);

    return () => clearTimeout(timer);
  }, [state]);

  // Clear saved state when quiz is finished
  useEffect(() => {
    if (state.status === "finished") {
      localStorage.removeItem(STORAGE_KEYS.QUIZ_STATE);
    }
  }, [state.status]);

  const getSavedQuiz = useCallback(() => parseSavedQuiz(), []);

  const resumeQuiz = useCallback((savedState) => {
    dispatch({ type: QUIZ_ACTIONS.RESUME_QUIZ, payload: savedState });
  }, []);

  const clearSavedQuiz = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.QUIZ_STATE);
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
      getSavedQuiz,
      resumeQuiz,
      clearSavedQuiz,
    }),
    [state, getSavedQuiz, resumeQuiz, clearSavedQuiz],
  );

  return (
    <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
