"use client";

import { Users } from "lucide-react";


const CATALOGUE = [
  { barberKey: "Denius barbeiro", displayName: "Denius", specialty: "Barbeiro" },
  { barberKey: "Nyel barbeiro", displayName: "Nyel", specialty: "Barbeiro" },
  { barberKey: "Marcos barbeiro", displayName: "Marcos", specialty: "Barbeiro" },
  { barberKey: "Dindo barbeiro", displayName: "Dindo", specialty: "Barbeiro" },
] as const;

function barColor(pct: number): string {
  if (pct >= 80) return "bg-red-500";
  if (pct >= 50) return "bg-amber-400";
  return "bg-amber-500";
}

interface CardProps {
  name: string;
  specialty: string;
  booked: number;
  pct: number;
}

function ProfessionalCard({ name, specialty, booked, pct }: CardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4 border transition-colors duration-200 bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900/50 dark:border-zinc-800/60 dark:hover:border-zinc-700/60">
      <div className="flex items-center gap-3">
        
       
        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-zinc-200 dark:border-zinc-700 bg-purple-600/20 flex items-center justify-center">
          <span className="text-purple-400 font-bold uppercase text-sm">
            {name[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight truncate text-zinc-900 dark:text-white">
            {name}
          </p>
          <p className="text-xs leading-tight truncate text-zinc-500">
            {specialty}
          </p>
        </div>

        <span className="text-sm font-bold flex-shrink-0 text-emerald-600 dark:text-emerald-400">
          {booked}
        </span>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-zinc-500">
          {booked} agendamento{booked !== 1 ? "s" : ""} para hoje
        </p>
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor(pct)}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProfessionalStatus({ bookings = {} }: { bookings?: Record<string, number> }) {
  return (
    <section className="w-full px-4 py-8 md:px-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 dark:bg-amber-500/15 dark:border-amber-500/25">
          <Users size={18} className="text-amber-500 dark:text-amber-400" />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          Status dos Profissionais
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {CATALOGUE.map((entry) => {
          const booked = bookings[entry.barberKey] ?? 0;
          const pct = Math.min(Math.round((booked / 20) * 100), 100);
          return (
            <ProfessionalCard
              key={entry.barberKey}
              name={entry.displayName} 
              specialty={entry.specialty}
              booked={booked}
              pct={pct}
            />
          );
        })}
      </div>
    </section>
  );
}