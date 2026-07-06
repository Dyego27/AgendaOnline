"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, UserCog, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const INPUT_CLASS = `
  w-full h-11 px-3.5 rounded-xl text-sm border
  transition-all duration-200 focus:outline-none focus:ring-1
  bg-zinc-100 border-zinc-300 text-zinc-900 placeholder:text-zinc-400
  focus:border-violet-500/60 focus:ring-violet-500/40
  dark:bg-zinc-900 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-600
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export function AdminLoginButton() {
  const router = useRouter();
  const [modalOpen, setModalOpen]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  function handleOpen() {
    setError("");
    setEmail("");
    setPassword("");
    setModalOpen(true);
  }

  function handleClose(open: boolean) {
    if (!loading) setModalOpen(open);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.authenticated) {
        setModalOpen(false);
        router.push("/admin");
      } else {
        setError(data.error || "E-mail ou senha inválidos.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
     
      <button
        onClick={handleOpen}
        aria-label="Acesso administrativo"
        className="
          flex items-center gap-1.5 px-3 h-8 sm:px-4 sm:h-9
          rounded-full border font-semibold text-[10px] sm:text-xs
          tracking-widest uppercase transition-colors duration-200
          flex-shrink-0 whitespace-nowrap cursor-pointer
          border-amber-500/70 text-amber-600 hover:bg-amber-500/10
          dark:text-amber-400 dark:hover:bg-amber-500/10
        "
      >
        <UserRound size={12} />
        ADM
      </button>

      
      <Dialog open={modalOpen} onOpenChange={handleClose}>
        <DialogOverlay className="bg-black/60 backdrop-blur-lg" />

        <DialogContent className="
          border shadow-2xl rounded-2xl p-0 overflow-hidden
          w-[calc(100%-2rem)] max-w-sm mx-auto
          bg-white border-zinc-200
          dark:bg-zinc-950 dark:border-white/10
          transition-colors duration-300
        ">
          
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600" />

          <VisuallyHidden>
            <DialogTitle>Acesso Administrativo</DialogTitle>
          </VisuallyHidden>

          <form onSubmit={handleLogin} className="px-6 py-6 space-y-6">

           
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex-shrink-0">
                <UserCog size={20} className="text-violet-500 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="font-semibold text-base leading-tight text-zinc-900 dark:text-white">
                  Acesso Administrativo
                </h2>
                <p className="text-xs mt-0.5 text-zinc-500 dark:text-zinc-400">
                  Entre para gerenciar o sistema
                </p>
              </div>
            </div>

           
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@quatroestilos.com"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className={`${INPUT_CLASS} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

           
            {error && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium tracking-wide animate-pulse">
                {error}
              </p>
            )}

           
            <button
              type="submit"
              disabled={loading}
              className="
                w-full h-11 flex items-center justify-center
                rounded-xl text-sm font-semibold tracking-wide text-white
                bg-violet-600 hover:bg-violet-500 active:bg-violet-700
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-violet-500/50
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}