import { Check } from "lucide-react";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-label="Aceitar termos de agendamento"
        className={[
          "w-5 h-5 rounded flex items-center justify-center shrink-0",
          "border-2 transition-all duration-200",
          checked
            ? "border-amber-500 bg-amber-500"
            : "border-zinc-400 bg-white hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-900/50 dark:hover:border-zinc-500",
        ].join(" ")}
      >
        {checked && <Check size={12} className="text-zinc-950" strokeWidth={3} />}
      </button>
      <span className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">
        Estou ciente e aceito os termos de agendamento
      </span>
    </div>
  );
}