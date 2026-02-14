export default function ProTip() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 flex items-start gap-4">
      <div className="p-2 bg-slate-800 rounded-full shadow-sm text-primary">
        <span className="material-icons">tips_and_updates</span>
      </div>
      <div>
        <p className="font-semibold text-slate-200 text-sm">
          Pro Tip: Focus Mode
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Configuring fewer questions (5-10) with &apos;Hard&apos; difficulty is
          proven to improve retention rates by 25%.
        </p>
      </div>
    </div>
  );
}
