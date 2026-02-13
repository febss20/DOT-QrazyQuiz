export default function ResumeModal({ onResume, onStartNew }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-surface-dark rounded-xl border border-slate-700 shadow-2xl max-w-md w-full p-8 animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-primary text-3xl">
              history
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Quiz in Progress
          </h2>
          <p className="text-text-muted text-sm">
            You have an unfinished quiz. Would you like to continue where you
            left off?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onResume}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">play_arrow</span>
            Continue Quiz
          </button>
          <button
            onClick={onStartNew}
            className="w-full py-3 px-4 border border-slate-700 text-text-muted hover:text-white hover:bg-slate-800 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">refresh</span>
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
