export const TIMER_OPTIONS = [
  { label: "1m", value: 60 },
  { label: "5m", value: 300 },
  { label: "10m", value: 600 },
  { label: "15m", value: 900 },
];

export const QUESTION_AMOUNTS = { min: 5, max: 50, default: 20 };

export const DIFFICULTY_OPTIONS = [
  { label: "Any", value: "" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const TYPE_OPTIONS = [
  { label: "Any", value: "" },
  { label: "Multiple", value: "multiple" },
  { label: "True/False", value: "boolean" },
];

export const STORAGE_KEYS = {
  AUTH: "quiz_auth",
  QUIZ_STATE: "quiz_state",
  QUIZ_SETTINGS: "quiz_settings",
};

export const CATEGORY_ICONS = {
  "General Knowledge": "school",
  "Entertainment: Books": "menu_book",
  "Entertainment: Film": "movie",
  "Entertainment: Music": "music_note",
  "Entertainment: Musicals & Theatres": "theater_comedy",
  "Entertainment: Television": "tv",
  "Entertainment: Video Games": "sports_esports",
  "Entertainment: Board Games": "casino",
  "Science & Nature": "science",
  "Science: Computers": "code",
  "Science: Mathematics": "functions",
  "Science: Gadgets": "devices",
  Mythology: "auto_stories",
  Sports: "sports_soccer",
  Geography: "public",
  History: "history_edu",
  Politics: "gavel",
  Art: "palette",
  Celebrities: "stars",
  Animals: "pets",
  Vehicles: "directions_car",
  "Entertainment: Comics": "auto_stories",
  "Entertainment: Japanese Anime & Manga": "animation",
  "Entertainment: Cartoon & Animations": "animation",
};

export const DEFAULT_CATEGORY_ICON = "category";

export const FEEDBACK_DELAY_MS = 1200;

export const QUIZ_ACTIONS = {
  SET_SETTINGS: "SET_SETTINGS",
  SET_LOADING: "SET_LOADING",
  START_QUIZ: "START_QUIZ",
  ANSWER_QUESTION: "ANSWER_QUESTION",
  NEXT_QUESTION: "NEXT_QUESTION",
  SET_TIME: "SET_TIME",
  FINISH_QUIZ: "FINISH_QUIZ",
  RESET_QUIZ: "RESET_QUIZ",
  RESUME_QUIZ: "RESUME_QUIZ",
};

export const RESPONSE_CODE = {
  SUCCESS: 0,
  NO_RESULTS: 1,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
  RATE_LIMIT: 5,
};

