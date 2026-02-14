import axios from "axios";

const api = axios.create({
  baseURL: "https://opentdb.com",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return Promise.reject(
        new Error("Request timed out. Please check your connection."),
      );
    }

    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection."),
      );
    }

    const status = error.response.status;
    const messages = {
      429: "Too many requests. Please wait a moment and try again.",
      500: "Server error. Please try again later.",
      503: "Service unavailable. Please try again later.",
    };

    return Promise.reject(
      new Error(messages[status] || `Request failed (HTTP ${status}).`),
    );
  },
);

export { api };
