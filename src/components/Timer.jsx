export default function Timer({ timeRemaining, totalTime }) {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isWarning = timeRemaining <= 10;
  const displayTime = `${timeRemaining}s`;

  const gradientColor = isWarning ? "#EF4444" : "#FACC15";
  const bgGradient = `conic-gradient(${gradientColor} ${percentage}%, #334155 0)`;
  const glowColor = isWarning
    ? "0 0 15px rgba(239,68,68,0.3)"
    : "0 0 15px rgba(250,204,21,0.2)";

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div
        className="absolute inset-0 timer-circle rounded-full transition-all"
        style={{
          background: bgGradient,
          boxShadow: glowColor,
        }}
      />
      <div className="absolute inset-1 bg-background-dark rounded-full flex items-center justify-center">
        <span
          className={`text-sm font-bold ${isWarning ? "text-error animate-pulse" : "text-secondary"}`}
        >
          {displayTime}
        </span>
      </div>
    </div>
  );
}
