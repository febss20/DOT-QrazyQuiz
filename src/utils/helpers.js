// Fisher-Yates shuffle algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format seconds to MM:SS
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Get letter label for answer index (A, B, C, D)
export function getLetterLabel(index) {
  return String.fromCharCode(65 + index);
}

// Get answer state
export function getAnswerState({
  isSelected,
  isCorrect,
  showResult,
  disabled,
}) {
  if (showResult && isSelected && isCorrect) return "correct";
  if (showResult && isSelected && !isCorrect) return "incorrect";
  if (showResult && !isSelected && isCorrect) return "correct";
  if (isSelected && !showResult) return "selected";
  if (disabled && !isSelected) return "disabled";
  return "default";
}

// Calculate quiz result statistics
export function calculateQuizStats(questions, answers) {
  const totalQuestions = questions.length;
  const totalAnswered = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = totalAnswered - correctCount;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    totalAnswered,
    correctCount,
    incorrectCount,
    percentage,
  };
}
