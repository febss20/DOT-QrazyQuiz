const BASE = {
  container:
    "relative group p-6 border-2 rounded-xl text-left transition-all duration-200 flex items-center",
  letter:
    "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg font-bold mr-4",
  text: "text-lg",
};

export const STYLES = {
  default: {
    container: `${BASE.container} bg-surface-dark border-slate-700 shadow-lg cursor-pointer hover:border-primary/50 hover:bg-surface-dark/80 hover:shadow-xl`,
    letter: `${BASE.letter} bg-slate-800 text-text-muted transition-colors group-hover:bg-primary group-hover:text-white`,
    text: `${BASE.text} font-medium text-text-main transition-colors group-hover:text-primary`,
    radio:
      "absolute right-4 w-4 h-4 rounded-full border-2 border-slate-600 transition-colors group-hover:border-primary",
  },
  selected: {
    container: `${BASE.container} bg-primary/10 border-primary shadow-[0_0_20px_rgba(40,173,0,0.15)]`,
    letter: `${BASE.letter} bg-primary text-white shadow-sm`,
    text: `${BASE.text} font-bold text-primary drop-shadow-sm`,
    radio:
      "absolute right-4 w-4 h-4 rounded-full bg-primary border-2 border-primary flex items-center justify-center shadow-sm",
  },
  correct: {
    container: `${BASE.container} bg-primary/10 border-primary shadow-[0_0_20px_rgba(40,173,0,0.15)]`,
    letter: `${BASE.letter} bg-primary text-white shadow-sm`,
    text: `${BASE.text} font-bold text-primary drop-shadow-sm`,
    radio: "hidden",
  },
  incorrect: {
    container: `${BASE.container} bg-error/10 border-error shadow-[0_0_20px_rgba(239,68,68,0.15)]`,
    letter: `${BASE.letter} bg-error text-white shadow-sm`,
    text: `${BASE.text} font-bold text-error drop-shadow-sm`,
    radio: "hidden",
  },
  disabled: {
    container: `${BASE.container} bg-surface-dark border-slate-700 shadow-lg opacity-60 cursor-not-allowed`,
    letter: `${BASE.letter} bg-slate-800 text-text-muted`,
    text: `${BASE.text} font-medium text-text-main`,
    radio: "absolute right-4 w-4 h-4 rounded-full border-2 border-slate-600",
  },
};
