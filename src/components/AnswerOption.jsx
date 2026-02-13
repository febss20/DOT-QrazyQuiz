import { STYLES } from "@/styles/AnswerOption.styles";
import { getAnswerState } from "@/utils/helpers";

export default function AnswerOption({
  answer,
  letter,
  isSelected,
  isCorrect,
  showResult,
  onSelect,
  disabled,
}) {
  const state = getAnswerState({ isSelected, isCorrect, showResult, disabled });
  const s = STYLES[state];

  return (
    <button className={s.container} onClick={onSelect} disabled={disabled}>
      <span className={s.letter}>{letter}</span>
      <span className={s.text}>{answer}</span>
      <div className={s.radio}>
        {state === "selected" && (
          <span className="material-icons text-white text-[10px]">check</span>
        )}
      </div>
    </button>
  );
}
