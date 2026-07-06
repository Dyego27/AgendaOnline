import { CheckCircle2 } from "lucide-react";
import type { BookingSnapshot } from "../hooks/useBookingForm";

interface BookingSuccessProps {
  snapshot: BookingSnapshot;
  onReset: () => void;
}

export function BookingSuccess({ snapshot, onReset }: BookingSuccessProps) {
  return (
    <main className="
      w-full rounded-2xl p-8 border md:max-w-xl mx-auto
      flex flex-col items-center gap-4 text-center mt-10
      bg-white border-zinc-200
      dark:bg-zinc-950 dark:border-zinc-800/60
      transition-colors duration-300
    ">
      <CheckCircle2 size={48} className="text-orange-500" fill="rgba(249,115,22,0.15)" />

      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
        Agendamento confirmado!
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Serviço: <span className="text-orange-400 font-semibold">{snapshot.serviceName}</span>
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {snapshot.name} — {snapshot.phone}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {snapshot.date} às {snapshot.time}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Profissional: <span className="text-amber-400 font-semibold">{snapshot.barberName}</span>
      </p>

      <button
        onClick={onReset}
        className="mt-2 px-5 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
      >
        Fazer novo agendamento
      </button>
    </main>
  );
}