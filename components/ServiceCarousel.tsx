import Image from "next/image";
import { CheckCircle2, MousePointerClick } from "lucide-react";
import { SERVICES, type Service } from "../constants/Booking";
import { useDragScroll } from "../hooks/useDragScroll";

interface ServiceCarouselProps {
  value: string | null;

  onChange: (id: string) => void;

  error?: string;
}

export function ServiceCarousel({
  value,
  onChange,
  error,
}: ServiceCarouselProps) {
  const { ref, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MousePointerClick size={20} color="orange" />
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Selecione o serviço
        </p>
      </div>

      <div
        ref={ref}
        {...handlers}
        className="flex w-full overflow-x-auto gap-4 pb-3 snap-x snap-mandatory scrollbar-none select-none mb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SERVICES.map((service: Service) => {
          const isSelected = value === service.id;
          return (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={isSelected}
              hasError={!!error}
              onSelect={() => onChange(service.id)}
            />
          );
        })}
      </div>

      {error && <p className="mt-1.5 mb-1 text-xs text-red-400">{error}</p>}
      {value && !error && (
        <p className="mt-2 text-xs text-zinc-500 text-center mb-2">
          Serviço selecionado:{" "}
          <span className="text-orange-400 font-semibold">
            {SERVICES.find((s) => s.id === value)?.name}
          </span>
        </p>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  hasError: boolean;
  onSelect: () => void;
}

function ServiceCard({
  service,
  isSelected,
  hasError,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-[140px] flex-shrink-0 snap-start",
        "flex flex-col items-center rounded-xl overflow-hidden",
        "border transition-all duration-200",
        isSelected
          ? "border-orange-500 bg-zinc-800 shadow-[0_0_12px_rgba(249,115,22,0.3)]"
          : hasError
            ? "border-red-500/50 bg-zinc-900 hover:border-red-400"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-600",
      ].join(" ")}
    >
      <div className="relative w-full h-[100px]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover rounded-t-xl"
          draggable={false}
        />
      </div>

      <div className="w-full px-2 pt-2 pb-3 flex flex-col items-center gap-1">
        <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2">
          {service.name}
        </span>
        <span className="text-xs text-orange-400 font-bold">
          R$ {service.price},00
        </span>
        <div
          className={[
            "mt-1 transition-all duration-200",
            isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75",
          ].join(" ")}
        >
          <CheckCircle2
            size={16}
            className="text-orange-500"
            fill="rgba(249,115,22,0.15)"
          />
        </div>
      </div>
    </button>
  );
}