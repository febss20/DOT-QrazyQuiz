import { RESPONSE_CODE } from "../utils/constants";
import { api } from "./api";

// Safely decodes a URI component string.
function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

export async function fetchSessionToken() {
  const { data } = await api.get("/api_token.php", {
    params: { command: "request" },
  });

  if (data.response_code === RESPONSE_CODE.SUCCESS) {
    return data.token;
  }
  throw new Error("Failed to get session token");
}

export async function fetchCategories() {
  try {
    const { data } = await api.get("/api_category.php");
    return data.trivia_categories || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function fetchQuestions({
  amount,
  category,
  difficulty,
  type,
  token,
}) {
  return _fetchQuestionsWithRetry(
    { amount, category, difficulty, type, token },
    false,
  );
}

// Internal implementation with auto-retry on token expiration.
async function _fetchQuestionsWithRetry(
  { amount, category, difficulty, type, token },
  retried,
) {
  const params = { amount, encode: "url3986" };

  if (category) params.category = category;
  if (difficulty) params.difficulty = difficulty;
  if (type) params.type = type;
  if (token) params.token = token;

  const { data } = await api.get("/api.php", { params });

  if (data.response_code === RESPONSE_CODE.SUCCESS) {
    if (!Array.isArray(data.results)) {
      throw new Error("Invalid response data from server.");
    }

    return data.results.map((q) => ({
      ...q,
      question: safeDecode(q.question),
      correct_answer: safeDecode(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((a) => safeDecode(a)),
      category: safeDecode(q.category),
      type: safeDecode(q.type),
      difficulty: safeDecode(q.difficulty),
    }));
  }

  if (data.response_code === RESPONSE_CODE.NO_RESULTS) {
    throw new Error(
      "Not enough questions available for this configuration. Try fewer questions or a different category.",
    );
  }

  // Token expired or not found — auto-retry with a fresh token (once)
  if (
    (data.response_code === RESPONSE_CODE.TOKEN_NOT_FOUND ||
      data.response_code === RESPONSE_CODE.TOKEN_EMPTY) &&
    !retried
  ) {
    const newToken = await fetchSessionToken();
    return _fetchQuestionsWithRetry(
      { amount, category, difficulty, type, token: newToken },
      true,
    );
  }

  if (data.response_code === RESPONSE_CODE.RATE_LIMIT) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }

  throw new Error("Failed to fetch questions. Please try again.");
}
