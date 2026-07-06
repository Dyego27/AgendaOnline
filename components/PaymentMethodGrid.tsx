import { QrCode, Coins, CreditCard, Wallet } from "lucide-react";

interface PaymentOption { id: string; label: string; icon: React.ReactNode; }

const OPTIONS: PaymentOption[] = [
  { id: "pix",  label: "PIX",      icon: <QrCode size={18} />    },
  { id: "cash", label: "Dinheiro", icon: <Coins size={18} />     },
  { id: "card", label: "Cartão",   icon: <CreditCard size={18} /> },
];

interface PaymentMethodGridProps {
  value: string | null;
  onChange: (id: string) => void;
  error?: string;
}

export function PaymentMethodGrid({ value, onChange, error }: PaymentMethodGridProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Wallet size={20} color="orange" />
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-gray-400">
          Forma de Pagamento
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((method) => {
          const isSelected = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={[
                "flex items-center justify-center gap-2 h-11 rounded-xl",
                "border text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-amber-500/80 bg-zinc-100 dark:bg-zinc-900 text-amber-500 dark:text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  : error
                    ? "border-red-400/40 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-red-400/60"
                    : "border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300",
              ].join(" ")}
            >
              <span className={isSelected ? "text-amber-500 dark:text-amber-400" : "text-zinc-400 dark:text-zinc-500"}>
                {method.icon}
              </span>
              {method.label}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}