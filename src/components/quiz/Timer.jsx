const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ timeRemaining, totalTime }) {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isWarning = timeRemaining <= 10;
  const displayTime = `${timeRemaining}s`;

  const strokeOffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  const strokeColor = isWarning ? "#EF4444" : "#FACC15";
  const glowColor = isWarning
    ? "0 0 15px rgba(239,68,68,0.3)"
    : "0 0 15px rgba(250,204,21,0.2)";

  return (
    <div
      className="relative w-14 h-14 flex items-center justify-center"
      style={{ filter: `drop-shadow(${glowColor})` }}
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 56 56"
      >
        {/* Background track */}
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          stroke="#334155"
          strokeWidth="4"
        />
        {/* Progress ring */}
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-sm font-bold ${isWarning ? "text-error animate-pulse" : "text-secondary"}`}
        >
          {displayTime}
        </span>
      </div>
    </div>
  );
}
