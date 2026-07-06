"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus, Minus, Download, Info } from "lucide-react";
import { Appointment, Expense, ManualCut, TimePeriod } from "../types";

interface Props {
  appointments: Appointment[];
  expenses: Expense[];
  manualCuts: ManualCut[];
  onAddExpense: (e: Omit<Expense, "id" | "date">) => void;
  onAddManualCut: (c: Omit<ManualCut, "id" | "date">) => void;
}

type FormMode = null | "corte" | "despesa";

export default function FinancasView({ appointments, expenses, manualCuts, onAddExpense, onAddManualCut }: Props) {
  const [period, setPeriod] = useState<TimePeriod>("Quinzena");
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [expenseFilter, setExpenseFilter] = useState<"Dia" | "Quinzena" | "Mês">("Dia");

 
  const [corteDesc, setCorteDesc] = useState("");
  const [corteVal, setCorteVal] = useState("");
  const [despBarber, setDespBarber] = useState("Carlos");
  const [despDesc, setDespDesc] = useState("");
  const [despCat, setDespCat] = useState("Luz");
  const [despVal, setDespVal] = useState("");

  const totalRevenue = appointments.filter((a) => a.status === "Concluído").reduce((s, a) => s + a.value, 0)
    + manualCuts.reduce((s, c) => s + c.value, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.value, 0);
  const netProfit = totalRevenue - totalExpenses;

  const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;

 
  const chartPoints = Array.from({ length: 15 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (14 - i));
    const label = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const rev = appointments.filter((a) => a.status === "Concluído" && a.date === d.toISOString().split("T")[0]).reduce((s, a) => s + a.value, 0);
    const exp = expenses.filter((e) => e.date === d.toISOString().split("T")[0]).reduce((s, e) => s + e.value, 0);
    return { label, rev, exp };
  });
  const maxVal = Math.max(...chartPoints.flatMap((p) => [p.rev, p.exp]), 10);

  const handleCorteSubmit = () => {
    if (!corteDesc || !corteVal) return;
    onAddManualCut({ description: corteDesc, value: parseFloat(corteVal) });
    setCorteDesc(""); setCorteVal(""); setFormMode(null);
  };

  const handleDespesaSubmit = () => {
    if (!despDesc || !despVal) return;
    onAddExpense({ barber: despBarber, description: despDesc, category: despCat, value: parseFloat(despVal) });
    setDespDesc(""); setDespVal(""); setFormMode(null);
  };

  const handleExport = () => {
    const rows = expenses.map((e) => `${e.date},${e.barber},${e.description},${e.category},R$${e.value}`);
    const csv = ["Data,Barbeiro,Descrição,Categoria,Valor", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "financas.csv"; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Finanças</h1>
        <div className="flex gap-1 bg-[#111] border border-[#2a2a2a] rounded-xl p-1">
          {(["Dia", "Quinzena", "Mês", "Ano"] as TimePeriod[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${period === p ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-200"}`}
            >{p}</button>
          ))}
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Valor Bruto (Caixa)</span>
            <div className="w-7 h-7 bg-green-900/50 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{fmt(totalRevenue)}</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Despesas</span>
            <div className="w-7 h-7 bg-red-900/50 rounded-lg flex items-center justify-center">
              <TrendingDown size={14} className="text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-400">{fmt(totalExpenses)}</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Lucro Líquido</span>
            <div className="w-7 h-7 bg-green-900/50 rounded-lg flex items-center justify-center">
              <DollarSign size={14} className="text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-400">{fmt(netProfit)}</p>
        </div>
      </div>

    
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
        <h2 className="text-white font-semibold mb-4">Receita vs Despesas</h2>
        <div className="relative h-40 flex items-end gap-0.5 overflow-x-auto">
          {chartPoints.map((p, i) => (
            <div key={i} className="flex-1 min-w-[20px] flex flex-col items-center gap-0.5 h-full justify-end">
              <div className="w-full flex gap-px items-end" style={{ height: "100%" }}>
                <div className="flex-1 bg-red-500/50 rounded-sm" style={{ height: `${(p.exp / maxVal) * 100}%`, minHeight: p.exp > 0 ? 2 : 0 }} />
                <div className="flex-1 bg-purple-500/70 rounded-sm" style={{ height: `${(p.rev / maxVal) * 100}%`, minHeight: p.rev > 0 ? 2 : 0 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-2 overflow-x-auto">
          {chartPoints.map((p, i) => (
            <div key={i} className="flex-1 min-w-[20px] text-center text-[9px] text-gray-600">{p.label}</div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 justify-center">
          <div className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Despesa</div>
          <div className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" /> Receita</div>
        </div>
      </div>

    
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFormMode(formMode === "corte" ? null : "corte")}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-700/30 border border-purple-600 text-purple-300 rounded-xl text-sm font-medium hover:bg-purple-700/50 transition-colors"
        >
          <Plus size={16} /> Registrar Corte Físico (Manual)
        </button>
        <button
          onClick={() => setFormMode(formMode === "despesa" ? null : "despesa")}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-900/30 border border-red-700 text-red-400 rounded-xl text-sm font-medium hover:bg-red-900/50 transition-colors"
        >
          <Minus size={16} /> Registrar Despesa / Decremento
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-900/30 border border-green-700 text-green-400 rounded-xl text-sm font-medium hover:bg-green-900/50 transition-colors"
        >
          <Download size={16} /> Exportar Relatório
        </button>
      </div>

    
      {formMode === "corte" && (
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <h3 className="text-white font-semibold mb-4">Registrar Corte Físico</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={corteDesc} onChange={(e) => setCorteDesc(e.target.value)}
              placeholder="Descrição"
              className="flex-1 bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500"
            />
            <input
              value={corteVal} onChange={(e) => setCorteVal(e.target.value)}
              placeholder="Valor (R$)" type="number"
              className="flex-1 bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500"
            />
            <button onClick={handleCorteSubmit} className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">Registrar</button>
            <button onClick={() => setFormMode(null)} className="px-4 py-2.5 text-gray-400 text-sm hover:text-white transition-colors">Cancelar</button>
          </div>
        </div>
      )}

      {formMode === "despesa" && (
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <h3 className="text-white font-semibold mb-4">Registrar Despesa / Decremento</h3>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <select
              value={despBarber} onChange={(e) => setDespBarber(e.target.value)}
              className="bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
            >
              {["Carlos", "André", "Marcos", "Pedro"].map((b) => <option key={b}>{b}</option>)}
            </select>
            <input
              value={despDesc} onChange={(e) => setDespDesc(e.target.value)}
              placeholder="Motivo / Descrição"
              className="flex-1 min-w-[160px] bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500"
            />
            <select
              value={despCat} onChange={(e) => setDespCat(e.target.value)}
              className="bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
            >
              {["Luz", "Água", "Aluguel", "Material", "Outro"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              value={despVal} onChange={(e) => setDespVal(e.target.value)}
              placeholder="Valor (R$)" type="number"
              className="w-32 bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500"
            />
            <button onClick={handleDespesaSubmit} className="px-6 py-2.5 bg-red-700 text-white rounded-xl text-sm font-medium hover:bg-red-800 transition-colors">Registrar</button>
            <button onClick={() => setFormMode(null)} className="px-4 py-2.5 text-gray-400 text-sm hover:text-white transition-colors">Cancelar</button>
          </div>
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
            <Info size={12} /> A despesa será subtraída do Caixa geral e dividida igualmente entre os 4 barbeiros (R$ {despVal ? (parseFloat(despVal) / 4).toFixed(2) : "0"} cada).
          </p>
        </div>
      )}

     
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-white font-semibold">Histórico de Despesas</h2>
          <div className="flex gap-1 bg-[#111] border border-[#2a2a2a] rounded-xl p-1">
            {(["Dia", "Quinzena", "Mês"] as const).map((f) => (
              <button key={f} onClick={() => setExpenseFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${expenseFilter === f ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-200"}`}
              >{f}</button>
            ))}
          </div>
        </div>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">Nenhuma despesa registrada neste período</p>
        ) : (
          <div className="space-y-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-[#2a2a2a]">
                  <th className="text-left pb-2">Data</th>
                  <th className="text-left pb-2">Barbeiro</th>
                  <th className="text-left pb-2">Descrição</th>
                  <th className="text-left pb-2">Categoria</th>
                  <th className="text-right pb-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-b border-[#1e1e1e] hover:bg-[#111] transition-colors">
                    <td className="py-2 text-gray-400">{e.date}</td>
                    <td className="py-2 text-gray-300">{e.barber}</td>
                    <td className="py-2 text-gray-300">{e.description}</td>
                    <td className="py-2 text-gray-400">{e.category}</td>
                    <td className="py-2 text-red-400 text-right">R$ {e.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
