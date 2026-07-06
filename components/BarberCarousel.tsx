"use client";

import { CheckCircle2, UserCheck } from "lucide-react";
import { BARBERS, type Barber } from "../constants/Booking";
import { useDragScroll } from "@/hooks/useDragScroll";

interface BarberCarouselProps {
  value: string | null;
  onChange: (id: string) => void;
  error?: string;
}

export function BarberCarousel({
  value,
  onChange,
  error,
}: BarberCarouselProps) {
  const { ref, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <UserCheck size={20} color="orange" />
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Profissional
        </p>
      </div>

      <div
        ref={ref}
        {...handlers}
        className="flex w-full overflow-x-auto gap-3 pb-3 snap-x snap-mandatory scrollbar-none select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {BARBERS.map((barber: Barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            isSelected={value === barber.id}
            hasError={!!error}
            onSelect={() => onChange(barber.id)}
          />
        ))}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface BarberCardProps {
  barber: Barber;
  isSelected: boolean;
  hasError: boolean;
  onSelect: () => void;
}

function BarberCard({
  barber,
  isSelected,
  hasError,
  onSelect,
}: BarberCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-[130px] flex-shrink-0 snap-start",
        "flex flex-col items-center rounded-xl p-3",
        "border transition-all duration-200",
        isSelected
          ? "border-amber-500/80 bg-zinc-900 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
          : hasError
            ? "border-red-500/40 bg-zinc-900/50 hover:border-red-400/60"
            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600",
      ].join(" ")}
    >
      
    
      <div
        className={[
          "w-16 h-16 rounded-full mb-2 flex items-center justify-center overflow-hidden",
          "border-2 transition-all duration-200 bg-purple-600/20 text-purple-300 font-bold text-xl uppercase",
          isSelected ? "border-amber-500/70" : "border-zinc-700",
        ].join(" ")}
      >
        <span className="select-none">{barber.name ? barber.name[0] : "?"}</span>
      </div>

      <span
        className={[
          "text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors duration-200",
          isSelected ? "text-amber-400" : "text-zinc-300",
        ].join(" ")}
      >
        {barber.name.split(" ")[0]}
      </span>

      <span
        className={[
          "text-[10px] text-center leading-tight mt-0.5 line-clamp-2 transition-colors duration-200",
          isSelected ? "text-amber-500/70" : "text-zinc-500",
        ].join(" ")}
      >
        {barber.role}
      </span>

      <div
        className={[
          "mt-1.5 transition-all duration-200",
          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75",
        ].join(" ")}
      >
        <CheckCircle2
          size={14}
          className="text-amber-500"
          fill="rgba(245,158,11,0.15)"
        />
      </div>
    </button>
  );
}
