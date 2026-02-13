import { QUIZ_ACTIONS } from "@/utils/constants";

export const initialState = {
  settings: {
    amount: 20,
    category: "",
    difficulty: "",
    type: "",
    timerDuration: 600,
  },
  questions: [],
  currentIndex: 0,
  answers: [],
  timeRemaining: 0,
  status: "idle", // idle | loading | active | finished
  sessionToken: null,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case QUIZ_ACTIONS.SET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case QUIZ_ACTIONS.SET_LOADING:
      return { ...state, status: "loading" };

    case QUIZ_ACTIONS.START_QUIZ:
      return {
        ...state,
        questions: action.payload.questions,
        sessionToken: action.payload.sessionToken,
        currentIndex: 0,
        answers: [],
        timeRemaining: state.settings.timerDuration,
        status: "active",
      };

    case QUIZ_ACTIONS.ANSWER_QUESTION:
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            questionIndex: state.currentIndex,
            selectedAnswer: action.payload.answer,
            isCorrect: action.payload.isCorrect,
          },
        ],
      };

    case QUIZ_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };

    case QUIZ_ACTIONS.SET_TIME:
      return { ...state, timeRemaining: action.payload };

    case QUIZ_ACTIONS.FINISH_QUIZ:
      return { ...state, status: "finished" };

    case QUIZ_ACTIONS.RESET_QUIZ:
      return {
        ...initialState,
        sessionToken: state.sessionToken,
        settings: state.settings,
      };

    case QUIZ_ACTIONS.RESUME_QUIZ:
      return { ...state, ...action.payload, status: "active" };

    default:
      return state;
  }
}
