import { QUESTION_AMOUNTS } from "@/utils/constants";

export default function QuestionSlider({ value, onChange }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="material-icons text-primary">
            format_list_numbered
          </span>
          Total Questions
        </h2>
        <span className="px-3 py-1 bg-primary text-white rounded font-bold text-sm shadow-sm shadow-primary/30">
          {value}
        </span>
      </div>
      <div className="pt-2 pb-1">
        <input
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0"
          max={QUESTION_AMOUNTS.max}
          min={QUESTION_AMOUNTS.min}
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <span>{QUESTION_AMOUNTS.min} Qs</span>
          <span>{QUESTION_AMOUNTS.max} Qs</span>
        </div>
      </div>
    </section>
  );
}
