"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // IMPORTAÇÃO DO ROUTER
import {
  LayoutDashboard, History, Wallet, BarChart2, LogOut, X, Menu, Scissors
} from "lucide-react";
import { Appointment, Expense, ManualCut } from "./types";

import DashboardView from "../admin/components/Dashboardview";
import HistoricoView from "../admin/components/Historicoview";
import FinancasView from "../admin/components/Financasview";
import DesempenhoView from "../admin/components/Desempenhoview";

type Tab = "dashboard" | "historico" | "financas" | "desempenho";

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "historico", label: "Histórico", icon: <History size={18} /> },
  { id: "financas", label: "Finanças", icon: <Wallet size={18} /> },
  { id: "desempenho", label: "Desempenho", icon: <BarChart2 size={18} /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [manualCuts, setManualCuts] = useState<ManualCut[]>([]);

  useEffect(() => {
    async function fetchDatabaseData() {
      try {
        const response = await fetch("/api/admin/data");
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments || []);
          setExpenses(data.expenses || []);
          setManualCuts(data.manualCuts || []);
        }
      } catch (error) {
        console.error("Erro ao conectar com a API do Prisma:", error);
      }
    }

    fetchDatabaseData();
  }, []);

  const handleMarkComplete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${id}/complete`, {
        method: "PATCH",
      });

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((a) => a.id === id ? { ...a, status: "Concluído" as const } : a)
        );
      } else {
        console.error(`Erro na resposta da API ao concluir. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao fazer requisição de conclusão:", error);
    }
  };

  const handleAddExpense = (e: Omit<Expense, "id" | "date">) => {
    const newExpense: Expense = {
      ...e,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleAddManualCut = (c: Omit<ManualCut, "id" | "date">) => {
    const newCut: ManualCut = {
      ...c,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setManualCuts((prev) => [...prev, newCut]);
  };

  const navigate = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

 
  const handleLogout = () => {
    router.push("/"); 
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#2a2a2a]">
        <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center">
          <Scissors size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg">Quatro Estilos</span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-purple-700/30 text-purple-300 border border-purple-700/50"
                : "text-gray-400 hover:text-gray-200 hover:bg-[#1e1e1e]"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2a2a2a]">
       
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-[#111] border-r border-[#1e1e1e] fixed h-full z-30">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111] border-r border-[#1e1e1e] z-50 flex flex-col transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-3 border-b border-[#2a2a2a]">
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      <main className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#111] border-b border-[#1e1e1e] sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
              <Scissors size={14} className="text-white" />
            </div>
            <span className="text-white font-semibold">Quatro Estilos</span>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardView appointments={appointments} expenses={expenses} onMarkComplete={handleMarkComplete} />
          )}
          {activeTab === "historico" && (
            <HistoricoView appointments={appointments} onMarkComplete={handleMarkComplete} />
          )}
          {activeTab === "financas" && (
            <FinancasView
              appointments={appointments}
              expenses={expenses}
              manualCuts={manualCuts}
              onAddExpense={handleAddExpense}
              onAddManualCut={handleAddManualCut}
            />
          )}
          {activeTab === "desempenho" && (
            <DesempenhoView appointments={appointments} expenses={expenses} />
          )}
        </div>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1e1e1e] flex z-20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${
                activeTab === item.id ? "text-purple-400" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="h-16 md:hidden" />
      </main>
    </div>
  );
}