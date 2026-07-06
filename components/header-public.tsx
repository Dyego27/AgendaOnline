"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AdminLoginButton } from "@/components/AdminLoginButton";

export default function HeaderPublic() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 6 && hour < 19);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="
        fixed top-0 left-0 right-0 z-50 border-b
        bg-white border-zinc-200
        dark:bg-black dark:border-white/[0.06]
        transition-colors duration-300
      ">
        <div className="relative w-full px-4 h-14 flex items-center justify-between">

         
          <div className="flex items-center gap-2 z-10">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={45}
              height={45}
              priority
              className="object-contain"
            />
            <span className="hidden sm:inline font-semibold text-base tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
              Quatro Estilos
            </span>
          </div>

        
          <div className="absolute left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
            </span>
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap ${isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {isOpen ? "Aberto agora" : "Fechado agora"}
            </span>
          </div>

          <div className="flex items-center gap-2 z-10">
            <ThemeToggle />
            <AdminLoginButton />
          </div>

        </div>
      </header>

      <div className="h-14" aria-hidden="true" />
    </>
  );
}