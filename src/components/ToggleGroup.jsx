const GRID_COLS = {
  2: "grid grid-cols-2 gap-2",
  3: "grid grid-cols-3 gap-2",
  4: "grid grid-cols-4 gap-2",
  5: "grid grid-cols-5 gap-2",
};

export default function ToggleGroup({
  label,
  icon,
  options,
  value,
  onChange,
  columns,
}) {
  const gridClass = columns ? GRID_COLS[columns] : "flex";

  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <span className="material-icons text-primary">{icon}</span>
        {label}
      </h2>
      <div className={`${gridClass} bg-slate-700/50 p-1 rounded-lg`}>
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const isSelected = value === optValue;

          return (
            <button
              key={optValue}
              className={`flex-1 py-2 px-3 rounded font-medium text-sm transition-all text-center capitalize ${
                isSelected
                  ? "shadow-sm bg-secondary text-slate-900 font-bold border border-yellow-500"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
              }`}
              onClick={() => onChange(optValue)}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </section>
  );
}
