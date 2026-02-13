function StatusBadge({ isCorrect }) {
  const styles = isCorrect
    ? "bg-primary/20 text-primary"
    : isCorrect === false
      ? "bg-error/20 text-error"
      : "bg-slate-700 text-slate-400";

  const label = isCorrect
    ? "Correct"
    : isCorrect === false
      ? "Incorrect"
      : "Skipped";

  return (
    <span
      className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded uppercase ${styles}`}
    >
      {label}
    </span>
  );
}

function AnswerBox({ label, value, variant }) {
  const colors =
    variant === "error"
      ? "bg-error/5 border-error/20 text-error"
      : "bg-primary/5 border-primary/20 text-primary";

  const textColor = variant === "error" ? "text-error/90" : "text-primary/90";
  const labelColor = variant === "error" ? "text-error" : "text-primary";

  return (
    <div className={`border rounded-lg p-3 ${colors}`}>
      <p
        className={`text-xs font-semibold uppercase mb-1 tracking-wider ${labelColor}`}
      >
        {label}
      </p>
      <p className={`text-sm ${textColor}`}>{value}</p>
    </div>
  );
}

export default function ReviewAnswerItem({ question }) {
  const { isCorrect, question: text, userAnswer, correct_answer } = question;

  return (
    <div
      className={`rounded-xl p-5 relative overflow-hidden transition-all hover:shadow-md group ${
        isCorrect
          ? "border border-surface-border bg-surface-dark hover:border-primary/30"
          : "border border-error/30 bg-surface-dark"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Left accent bar for incorrect */}
        {isCorrect === false && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error" />
        )}

        {/* Status icon */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
            isCorrect
              ? "bg-primary/20 text-primary border-primary/20"
              : isCorrect === false
                ? "bg-error/20 text-error border-error/20"
                : "bg-slate-700 text-slate-400 border-transparent"
          }`}
        >
          <span className="material-icons text-sm">
            {isCorrect ? "check" : isCorrect === false ? "close" : "remove"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Question + badge */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-white leading-snug pr-4">
              {text}
            </p>
            <StatusBadge isCorrect={isCorrect} />
          </div>

          {/* Answer details */}
          {isCorrect === false ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AnswerBox
                label="Your Answer"
                value={userAnswer || "No answer"}
                variant="error"
              />
              <AnswerBox
                label="Correct Answer"
                value={correct_answer}
                variant="primary"
              />
            </div>
          ) : (
            <div className="bg-background-dark rounded-lg p-3 mt-2">
              <p className="text-xs text-text-muted mb-1 font-medium">
                Your Answer
              </p>
              <p className="text-sm text-primary">{userAnswer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
