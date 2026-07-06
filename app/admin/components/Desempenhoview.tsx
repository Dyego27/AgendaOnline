"use client";

import { useState } from "react";
import { Scissors, DollarSign, Download, Info } from "lucide-react";
import { Appointment, Expense, TimePeriod } from "../types";
import { BARBERS } from "../data";

interface Props {
  appointments: Appointment[];
  expenses: Expense[];
}

export default function DesempenhoView({ appointments, expenses }: Props) {
  const [period, setPeriod] = useState<TimePeriod>("Mês");

  const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;

 
  const getFilteredData = () => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    return appointments.filter((a) => {
      if (a.status !== "Concluído") return false;
      
      const apptDate = new Date(a.date);
      
      if (period === "Dia") {
        return a.date === todayStr;
      }
      if (period === "Quinzena") {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(now.getDate() - 15);
        return apptDate >= fifteenDaysAgo;
      }
      if (period === "Mês") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return apptDate >= thirtyDaysAgo;
      }
      if (period === "Ano") {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        return apptDate >= oneYearAgo;
      }
      return true;
    });
  };

  const getFilteredExpenses = () => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    return expenses.filter((e) => {
      const expDate = new Date(e.date);
      if (period === "Dia") return e.date === todayStr;
      if (period === "Quinzena") {
        const diff = (now.getTime() - expDate.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 15;
      }
      if (period === "Mês") {
        const diff = (now.getTime() - expDate.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      }
      if (period === "Ano") {
        return expDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const filteredAppointments = getFilteredData();
  const filteredExpenses = getFilteredExpenses();


  const totalExpenses = filteredExpenses.reduce((s, e) => s + e.value, 0);
  const sharePerBarber = totalExpenses / 4;

 
  const barberStats = BARBERS.map((b) => {
   
    const completed = filteredAppointments.filter(
      (a) => a.barber.toLowerCase().includes(b.name.toLowerCase())
    );
    
    const grossRevenue = completed.reduce((s, a) => s + a.value, 0);
    
    
    const retainedForCaixa = grossRevenue * 0.25;
    const revenueAfterCaixa = grossRevenue * 0.75;
    
   
    const netRevenue = revenueAfterCaixa - sharePerBarber;

    return { 
      ...b, 
      appointments: completed.length, 
      grossRevenue, 
      retainedForCaixa,
      netRevenue 
    };
  });

  const handleExport = () => {
    const rows = barberStats.map((b) =>
      `${b.name},${b.appointments},R$${b.grossRevenue},R$${b.retainedForCaixa.toFixed(2)},R$${sharePerBarber.toFixed(2)},R$${b.netRevenue.toFixed(2)}`
    );
    const csv = ["Barbeiro,Atendimentos,Fat.Bruto,Retido Caixa (25%),Share Despesas,Fat.Líquido", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `desempenho_${period.toLowerCase()}.csv`; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Desempenho dos Barbeiros</h1>
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-1 bg-[#111] border border-[#2a2a2a] rounded-xl p-1">
            {(["Dia", "Quinzena", "Mês", "Ano"] as TimePeriod[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${period === p ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-200"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-green-600 text-green-400 rounded-xl text-sm font-medium hover:bg-green-600/10 transition-colors"
          >
            <Download size={14} /> Exportar Relatório
          </button>
        </div>
      </div>

      
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex items-center gap-3">
        <Info size={16} className="text-purple-400 shrink-0" />
        <p className="text-sm text-gray-300">
          Regra de Repasse: <span className="text-purple-400 font-semibold">25%</span> de retenção para o caixa da empresa. Despesas gerais divididas por 4 barbeiros: <span className="text-red-400 font-semibold">{fmt(sharePerBarber)}</span> por membro neste período.
        </p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barberStats.map((b) => (
          <div key={b.id} className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
            
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl font-bold overflow-hidden">
                {b.name[0]}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{b.name}</h3>
                <p className="text-gray-400 text-sm">{b.specialty || "Barbeiro Parceiro"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#111] rounded-xl p-3 border border-[#2a2a2a]">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                  <Scissors size={12} /> Atendimentos
                </div>
                <p className="text-2xl font-bold text-white">{b.appointments}</p>
              </div>
              <div className="bg-[#111] rounded-xl p-3 border border-[#2a2a2a]">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                  <DollarSign size={12} className="text-green-400" /> Lucro do Barbeiro
                </div>
                <p className={`text-2xl font-bold ${b.netRevenue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {fmt(b.netRevenue)}
                </p>
              </div>
            </div>

          
            <div className="space-y-2 border-t border-[#2a2a2a] pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Faturamento Bruto Total</span>
                <span className="text-white font-medium">{fmt(b.grossRevenue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Retido p/ o Caixa (25%)</span>
                <span className="text-purple-400 font-medium">- {fmt(b.retainedForCaixa)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cota de Despesas (1/4)</span>
                <span className="text-red-400 font-medium">- {fmt(sharePerBarber)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[#2a2a2a] pt-2">
                <span className="text-gray-300 font-medium">Líquido Final Receber</span>
                <span className={`font-semibold ${b.netRevenue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {fmt(b.netRevenue)}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}