import { formatTime } from "@/utils/helpers";

const SVG_PATH =
  "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831";
const CIRCUMFERENCE = 2 * Math.PI * 15.9155;

function StatPill({ icon, iconColor, value, valueColor, label }) {
  return (
    <div className="bg-background-dark rounded-lg border border-surface-border p-4">
      <span className={`material-icons ${iconColor} mb-2 block`}>{icon}</span>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-xs text-text-muted mt-0.5">{label}</p>
    </div>
  );
}

export default function ScoreCard({ stats, timerDuration }) {
  const strokeDasharray = `${(stats.percentage / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  return (
    <div className="bg-surface-dark rounded-xl border border-surface-border shadow-2xl relative overflow-hidden mb-8">
      {/* Confetti background */}
      <div className="absolute inset-0 confetti-bg pointer-events-none" />

      <div className="relative z-10 p-8 md:p-10 text-center">
        <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold tracking-wider mb-4">
          QUIZ COMPLETED
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Fantastic Job!
        </h1>
        <p className="text-text-muted text-sm mb-8">
          You&#39;ve completed the quiz! Here are your results.
        </p>

        {/* Stat Pills */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatPill
            icon="quiz"
            iconColor="text-text-muted"
            value={stats.totalQuestions}
            valueColor="text-white"
            label="Total"
          />
          <StatPill
            icon="check_circle"
            iconColor="text-primary"
            value={`${stats.correctCount}/${stats.totalQuestions}`}
            valueColor="text-primary"
            label="Correct"
          />
          <StatPill
            icon="timer"
            iconColor="text-secondary"
            value={formatTime(timerDuration)}
            valueColor="text-secondary"
            label="Time"
          />
        </div>

        {/* SVG Circular Chart */}
        <div
          className="relative mx-auto mb-8"
          style={{ width: 200, height: 200 }}
        >
          <svg className="circular-chart" viewBox="0 0 36 36">
            <path className="circle-bg" d={SVG_PATH} />
            <path
              className="circle"
              stroke="#28AD00"
              strokeDasharray={strokeDasharray}
              d={SVG_PATH}
            />
            <text
              x="18"
              y="18"
              className="percentage"
              dominantBaseline="central"
            >
              {stats.percentage}%
            </text>
          </svg>
        </div>

        {/* Footer Bar */}
        <div className="px-8 py-4 bg-background-dark/30 border-t border-surface-border flex flex-col sm:flex-row gap-4 justify-between items-center -mx-8 -mb-8 md:-mx-10 md:-mb-10 sm:rounded-b-xl pb-6 sm:pb-4 mt-8">
          <span className="text-sm text-text-muted font-medium flex items-center gap-2">
            <span className="material-icons text-secondary text-base">
              emoji_events
            </span>
            Top {100 - stats.percentage}% of your class performance
          </span>
        </div>
      </div>
    </div>
  );
}
