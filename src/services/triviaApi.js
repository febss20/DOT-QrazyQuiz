const BASE_URL = "https://opentdb.com";
const REQUEST_TIMEOUT_MS = 10000;

// Fetch wrapper with timeout and response validation.
async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please check your connection.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchSessionToken() {
  const url = new URL("/api_token.php", BASE_URL);
  url.searchParams.set("command", "request");

  const data = await fetchWithTimeout(url);

  if (data.response_code === 0) {
    return data.token;
  }
  throw new Error("Failed to get session token");
}

export async function resetSessionToken(token) {
  const url = new URL("/api_token.php", BASE_URL);
  url.searchParams.set("command", "reset");
  url.searchParams.set("token", token);

  const data = await fetchWithTimeout(url);

  if (data.response_code === 0) {
    return data.token;
  }
  throw new Error("Failed to reset session token");
}

export async function fetchCategories() {
  try {
    const data = await fetchWithTimeout(new URL("/api_category.php", BASE_URL));
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
  const url = new URL("/api.php", BASE_URL);
  url.searchParams.set("amount", amount);
  url.searchParams.set("encode", "url3986");

  if (category) url.searchParams.set("category", category);
  if (difficulty) url.searchParams.set("difficulty", difficulty);
  if (type) url.searchParams.set("type", type);
  if (token) url.searchParams.set("token", token);

  const data = await fetchWithTimeout(url);

  if (data.response_code === 0) {
    return data.results.map((q) => ({
      ...q,
      question: decodeURIComponent(q.question),
      correct_answer: decodeURIComponent(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((a) => decodeURIComponent(a)),
      category: decodeURIComponent(q.category),
      type: decodeURIComponent(q.type),
      difficulty: decodeURIComponent(q.difficulty),
    }));
  }

  if (data.response_code === 1) {
    throw new Error(
      "Not enough questions available for this configuration. Try fewer questions or a different category.",
    );
  }
  if (data.response_code === 3 || data.response_code === 4) {
    throw new Error("Session token expired. Please try again.");
  }
  if (data.response_code === 5) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }

  throw new Error("Failed to fetch questions. Please try again.");
}
