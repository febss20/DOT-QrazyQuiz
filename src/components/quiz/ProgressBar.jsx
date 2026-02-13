export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex-1 max-w-xl mx-4 sm:mx-12 flex flex-col items-center">
      <div className="w-full flex justify-between text-xs font-semibold text-text-muted mb-2 uppercase tracking-wide">
        <span>Question {current}</span>
        <span>{total} Total</span>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            boxShadow: "0 0 10px rgba(40,173,0,0.5)",
          }}
        />
      </div>
    </div>
  );
}
