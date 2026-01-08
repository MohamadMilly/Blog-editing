import { ChevronLeft, ChevronRight } from "lucide-react";

export function WizardNavigation({ goBack, goNext, step, maxStep }) {
  const isPreviousHome = step === 1;
  const isMaxStep = step === maxStep;
  return (
    <div className="mb-8 px-4 flex items-center justify-between max-w-120 mx-auto">
      <button
        className="flex items-center gap-x-2 text-sm text-gray-300 font-medium cursor-pointer group"
        onClick={goBack}
      >
        <ChevronLeft
          size={15}
          className="group-hover:-translate-x-2 group-focus:-translate-x-2 transition-all duration-300"
        />
        {isPreviousHome ? "Home" : "Previous"}
      </button>
      <button
        disabled={isMaxStep}
        className="flex items-center gap-x-2 text-sm text-pink-600 font-medium cursor-pointer group disabled:text-pink-600/40 "
        onClick={goNext}
      >
        Next
        <ChevronRight
          className="group-hover:translate-x-2 group-focus:translate-x-2 transition-all duration-300"
          size={15}
        />
      </button>
    </div>
  );
}
