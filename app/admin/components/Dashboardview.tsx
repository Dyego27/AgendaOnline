"use client";

import { CalendarDays, Clock, CheckCheck, DollarSign, ListOrdered, TrendingUp, Trophy, CreditCard } from "lucide-react";
import { Appointment, Expense } from "../types";
import { BARBERS } from "../data";

interface Props {
  appointments: Appointment[];
  expenses: Expense[];
  onMarkComplete: (id: string) => void;
}

const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;


const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function DashboardView({ appointments, expenses, onMarkComplete }: Props) {

  const now = new Date();
  const todayStr = getLocalDateString(now);
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const apptsLast30Days = appointments.filter(a => new Date(a.date) >= thirtyDaysAgo && a.status === "Concluído");
  const expensesLast30Days = expenses.filter(e => new Date(e.date) >= thirtyDaysAgo);

  const totalRevenue30Days = apptsLast30Days.reduce((s, a) => s + a.value, 0);
  const totalExpenses30Days = expensesLast30Days.reduce((s, e) => s + e.value, 0);
  const netProfit30Days = totalRevenue30Days - totalExpenses30Days;

  const todayAppts = appointments.filter((a) => a.date === todayStr);
  const pendingToday = todayAppts.filter((a) => a.status === "Pendente");
  const completedToday = todayAppts.filter((a) => a.status === "Concluído");

  const sortedPendingToday = [...pendingToday].sort((a, b) => a.time.localeCompare(b.time));

 
  const days = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const weeklyData = Array.from({ length: 7 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - index));
    const dayLabel = days[d.getDay()];
    const dateStr = getLocalDateString(d);
    
    const val = appointments
      .filter((a) => a.date === dateStr && a.status === "Concluído")
      .reduce((s, a) => s + a.value, 0);
      
    return { day: dayLabel, value: val };
  });
  const maxWeekly = Math.max(...weeklyData.map((d) => d.value), 1);

  const completedAllTime = appointments.filter((a) => a.status === "Concluído");
  

  const pmCount = { Pix: 0, Dinheiro: 0, Cartão: 0 };
  
  completedAllTime.forEach((a) => { 
    if (!a.paymentMethod) return;
    const method = a.paymentMethod.toLowerCase().trim();
    
    if (method.includes("pix")) {
      pmCount["Pix"]++;
    } else if (method.includes("dinheiro") || method.includes("money")) {
      pmCount["Dinheiro"]++;
    } else if (method.includes("cart") || method.includes("card") || method.includes("comprovante")) {
      pmCount["Cartão"]++;
    }
  });


  const totalPm = (pmCount["Pix"] + pmCount["Dinheiro"] + pmCount["Cartão"]) || 1;

  const barberStats = BARBERS.map((b) => ({
    ...b,
    revenue: completedAllTime
      .filter((a) => 
        a.barber.toLowerCase().includes(b.name.toLowerCase()) || 
        a.barber.toLowerCase().includes(b.id.toLowerCase())
      )
      .reduce((s, a) => s + a.value, 0),
  })).sort((a, b) => b.revenue - a.revenue);

  const kpis = [
    { icon: <CalendarDays size={20} />, color: "bg-purple-600", label: "Total de agendamentos", value: appointments.length },
    { icon: <Clock size={20} />, color: "bg-orange-600", label: "Pendentes", value: appointments.filter((a) => a.status === "Pendente").length },
    { icon: <CheckCheck size={20} />, color: "bg-green-700", label: "Concluídos", value: appointments.filter((a) => a.status === "Concluído").length },
    { icon: <DollarSign size={20} />, color: "bg-yellow-700", label: "Receita bruta (30 dias)", value: fmt(totalRevenue30Days) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
            <div className={`${k.color} w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3`}>{k.icon}</div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <p className="text-sm text-gray-400 mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <h2 className="text-white font-semibold mb-4">Agendamentos de hoje</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#111] rounded-xl p-4 border border-[#2a2a2a]">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Clock size={16} /><span className="text-sm">Pendentes</span>
              </div>
              <p className="text-3xl font-bold text-white">{pendingToday.length}</p>
            </div>
            <div className="bg-[#111] rounded-xl p-4 border border-[#2a2a2a]">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCheck size={16} /><span className="text-sm">Concluídos</span>
              </div>
              <p className="text-3xl font-bold text-white">{completedToday.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
          <h2 className="text-white font-semibold mb-4">Resumo Financeiro (30 dias)</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Receita Bruta</span>
              <span className="text-white font-medium text-sm">{fmt(totalRevenue30Days)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Despesas</span>
              <span className="text-red-400 font-medium text-sm">{fmt(totalExpenses30Days)}</span>
            </div>
            <div className="flex justify-between border-t border-[#2a2a2a] pt-3">
              <span className="text-gray-400 text-sm">Lucro Líquido</span>
              <span className="text-green-400 font-medium text-sm">{fmt(netProfit30Days)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ListOrdered size={16} className="text-purple-400" /> Próximos da Fila
            </div>
            <span className="text-xs text-gray-400">{sortedPendingToday.length} hoje</span>
          </div>
          
          {sortedPendingToday.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center py-6">Nenhum agendamento pendente hoje</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
              {sortedPendingToday.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0 pr-1">
                  <div>
                    <p className="text-white text-sm font-medium">{a.client}</p>
                    <p className="text-gray-500 text-xs">{a.time} · {a.barber}</p>
                  </div>
                  <button 
                    onClick={() => onMarkComplete(a.id)} 
                    className="w-7 h-7 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white rounded-lg flex items-center justify-center transition-colors text-xs flex-shrink-0"
                    title="Concluir Agendamento"
                  >
                    ✓
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] flex flex-col justify-between h-[320px]">
          <div className="flex items-center gap-2 text-white font-semibold mb-4 flex-shrink-0">
            <TrendingUp size={16} className="text-purple-400" /> Evolução Semanal
          </div>
          <div className="flex items-end gap-2 h-36 px-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <span className="absolute -top-7 bg-[#2a2a2a] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {fmt(d.value)}
                </span>
                <div className="w-full bg-purple-600/20 rounded-t-md relative" style={{ height: `${(d.value / maxWeekly) * 100}%`, minHeight: 4 }}>
                  <div className="absolute inset-0 bg-purple-500 group-hover:bg-purple-400 rounded-t-md transition-colors" />
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase font-medium">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 border-t border-[#2a2a2a] pt-3 flex-shrink-0">
            <span>Últimos 7 dias</span>
            <span className="text-white font-medium">Total: {fmt(weeklyData.reduce((s, d) => s + d.value, 0))}</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] flex flex-col justify-between h-[320px]">
          <div>
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <Trophy size={16} className="text-purple-400" /> Destaques do Mês
            </div>
            <p className="text-[11px] text-gray-500 mb-3 uppercase tracking-wider">Ranking por Faturamento (R$)</p>
            <div className="space-y-2">
              {barberStats.map((b, i) => (
                <div key={b.id} className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs w-3 font-semibold">{i + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-300 font-bold uppercase">
                    {b.name[0]}
                  </div>
                  <span className="text-gray-300 text-sm flex-1 truncate">{b.name}</span>
                  <span className="text-white text-xs font-semibold">{fmt(b.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-[#2a2a2a] pt-3">
            <p className="text-[11px] text-gray-500 mb-2 uppercase tracking-wider">Métodos de Pagamento</p>
            <div className="space-y-1.5">
              {(["Pix", "Dinheiro", "Cartão"] as const).map((pm) => {
                const count = pmCount[pm];
                const percentage = Math.round((count / totalPm) * 100);
                return (
                  <div key={pm} className="flex items-center gap-2">
                    <CreditCard size={12} className="text-purple-500/70" />
                    <span className="text-gray-300 text-xs flex-1">{pm}</span>
                    <span className="text-purple-400 text-xs font-medium">{percentage}%</span>
                    <span className="text-gray-600 text-xs font-mono">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}