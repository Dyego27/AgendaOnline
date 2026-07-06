"use client";

import { useState } from "react";
import { Calendar, Clock, User, DollarSign, CheckCheck, FileText, Download } from "lucide-react";
import { Appointment } from "../types";

interface Props {
  appointments: Appointment[];
  onMarkComplete: (id: string) => void;
}

export default function HistoricoView({ appointments, onMarkComplete }: Props) {
  const [activeTab, setActiveTab] = useState<"Pendente" | "Concluído">("Pendente");

  const pending = appointments.filter((a) => a.status === "Pendente");
  const completed = appointments.filter((a) => a.status === "Concluído");
  const shown = activeTab === "Pendente" ? pending : completed;

  const handleExport = () => {
    const rows = shown.map((a) =>
      `${a.client},${a.status},${a.date},${a.time},${a.barber},R$${a.value},${a.service}`
    );
    const csv = ["Cliente,Status,Data,Hora,Barbeiro,Valor,Serviço", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historico.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Histórico de Agendamentos</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-transparent border border-green-600 text-green-400 rounded-xl text-sm font-medium hover:bg-green-600/10 transition-colors"
        >
          <Download size={16} /> Exportar Histórico
        </button>
      </div>

    
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("Pendente")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "Pendente"
              ? "bg-orange-900/60 text-orange-400 border border-orange-700"
              : "bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-gray-500"
          }`}
        >
          <Clock size={14} /> Pendentes {pending.length}
        </button>
        <button
          onClick={() => setActiveTab("Concluído")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "Concluído"
              ? "bg-green-900/60 text-green-400 border border-green-700"
              : "bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-gray-500"
          }`}
        >
          <CheckCheck size={14} /> Concluídos {completed.length}
        </button>
      </div>

     
      <div className="space-y-3">
        {shown.length === 0 && (
          <div className="bg-[#1a1a1a] rounded-xl p-8 text-center text-gray-500 border border-[#2a2a2a]">
            Nenhum agendamento nesta categoria.
          </div>
        )}
        {shown.map((a) => (
          <div key={a.id} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white font-semibold">{a.client}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  a.status === "Pendente"
                    ? "bg-orange-900/50 text-orange-400 border border-orange-800"
                    : "bg-green-900/50 text-green-400 border border-green-800"
                }`}>
                  {a.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={12} />{a.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{a.time}</span>
                <span className="flex items-center gap-1"><User size={12} />{a.barber}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} />R$ {a.value}</span>
              </div>
              {a.service && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FileText size={12} />{a.service}
                </div>
              )}
            </div>
            {a.status === "Pendente" && (
              <button
                onClick={() => onMarkComplete(a.id)}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-green-600 text-green-400 rounded-xl text-sm font-medium hover:bg-green-600/10 transition-colors whitespace-nowrap"
              >
                <CheckCheck size={14} /> Marcar como Concluído
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
