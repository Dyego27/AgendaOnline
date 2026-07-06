import { Scissors } from "lucide-react";

function IconInstagram({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconWhatsApp({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}



const HOURS = [
  { days: "Seg - Sex", time: "08:00 - 19:00" },
  { days: "Sábado",    time: "09:00 - 19:00" },
  { days: "Domingo",   time: "Fechado"        },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "WhatsApp",  href: "https://wa.me/5583993368237", Icon: IconWhatsApp  },
];

export default function Footer() {
  return (
    <footer className="
      w-full border-t mt-8
      bg-zinc-50 border-zinc-200
      dark:bg-zinc-950/80 dark:border-zinc-800/60
      transition-colors duration-300
    ">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left md:items-start">

         
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 flex-shrink-0">
                <Scissors size={18} className="text-zinc-950" />
              </div>
              <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                Quatro Estilos
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[220px] text-zinc-500 dark:text-zinc-500">
              Avenida São João, 165 - Casa - Centro Mamanguape/PB
            </p>
          </div>

          
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
              Horário de Funcionamento
            </h3>
            <ul className="space-y-2 w-full">
              {HOURS.map(({ days, time }) => (
                <li key={days} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{days}</span>
                  <span className={time === "Fechado" ? "text-red-500 dark:text-red-400 font-medium" : "text-zinc-700 dark:text-zinc-300 font-medium"}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
              Redes Sociais
            </h3>
           <div className="flex items-center gap-3">
  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
    <a 
      key={label}
      href={href}
      aria-label={label}
      className="
        flex items-center justify-center w-10 h-10 rounded-full
        border transition-all duration-200
        bg-zinc-200 border-zinc-300 text-zinc-500
        hover:text-zinc-900 hover:bg-zinc-300 hover:border-zinc-400
        dark:bg-zinc-800 dark:border-zinc-700/60 dark:text-zinc-400
        dark:hover:text-white dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
    >
      <Icon size={17} />
    </a>
  ))}
</div> 
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-zinc-200 dark:border-zinc-800/40 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © 2025 Quatro Estilos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}