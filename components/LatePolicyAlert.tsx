import { AlertTriangle } from "lucide-react";

export function LatePolicyAlert() {
  return (
    <div className="
      rounded-xl p-4 flex gap-3 items-start border
      bg-red-50 border-red-200
      dark:bg-red-950/20 dark:border-red-900/30
      transition-colors duration-300
    ">
      <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold mb-0.5 text-red-600 dark:text-red-400">
          Atenção aos horários
        </p>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Ao agendar, você concorda que o atraso superior a 10 minutos resultará na perda da vaga.
        </p>
      </div>
    </div>
  );
}
