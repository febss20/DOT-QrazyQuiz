import AnswerOption from "./AnswerOption";
import { shuffleArray, getLetterLabel } from "@/utils/helpers";
import { useMemo } from "react";

export default function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  showResult,
}) {
  const answers = useMemo(() => {
    const all = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray(all);
  }, [question]);

  return (
    <div className="w-full text-center animate-fadeIn">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider rounded-full border border-secondary/20">
          {question.category}
        </span>
        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider rounded-full border border-secondary/20">
          {question.difficulty}
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6 drop-shadow-sm">
        {question.question}
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {answers.map((answer, index) => (
          <AnswerOption
            key={answer}
            answer={answer}
            letter={getLetterLabel(index)}
            isSelected={selectedAnswer === answer}
            isCorrect={answer === question.correct_answer}
            showResult={showResult}
            onSelect={() => onAnswer(answer)}
            disabled={!!selectedAnswer}
          />
        ))}
      </div>
    </div>
  );
}
