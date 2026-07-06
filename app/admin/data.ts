import { Appointment, Barber } from "./types";

export const BARBERS: Barber[] = [
  { id: "denius", name: "Denius", specialty: "Barbeiro", avatar: "/avatars/carlos.jpg" },
  { id: "nyel", name: "Nyel", specialty: "Barbeiro", avatar: "/avatars/andre.jpg" },
  { id: "marcos", name: "Marcos", specialty: "Barbeiro", avatar: "/avatars/marcos.jpg" },
  { id: "dindo", name: "Dindo", specialty: "Barbeiro", avatar: "/avatars/pedro.jpg" },
];

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "1", client: "João Silva", date: "2025-05-28", time: "10:00", barber: "Carlos", value: 35, status: "Concluído", service: "Corte Clássico", paymentMethod: "Pix" },
  { id: "2", client: "Pedro Oliveira", date: "2025-05-28", time: "11:30", barber: "André", value: 35, status: "Concluído", service: "Barba e Degradê", paymentMethod: "Dinheiro" },
  { id: "3", client: "Bruno Lima", date: "2025-05-28", time: "09:00", barber: "André", value: 35, status: "Concluído", service: "Corte + Barba", paymentMethod: "Cartão" },
  { id: "4", client: "Gustavo Rocha", date: "2025-05-28", time: "17:00", barber: "Marcos", value: 35, status: "Concluído", service: "Nevou & Riscos", paymentMethod: "Pix" },
  { id: "5", client: "Marcelo Alves", date: "2025-05-28", time: "10:30", barber: "Carlos", value: 35, status: "Concluído", service: "Corte Clássico", paymentMethod: "Dinheiro" },
  { id: "6", client: "Henrique Pires", date: "2025-05-28", time: "14:00", barber: "Pedro", value: 35, status: "Concluído", service: "Coloração", paymentMethod: "Pix" },
  { id: "7", client: "Maria Santos", date: today, time: "14:00", barber: "Marcos", value: 35, status: "Pendente", service: "Degradê com risco", paymentMethod: undefined },
  { id: "8", client: "Lucas Mendes", date: today, time: "15:30", barber: "Carlos", value: 35, status: "Pendente", service: "Corte Clássico", paymentMethod: undefined },
  { id: "9", client: "Felipe Costa", date: today, time: "16:00", barber: "Pedro", value: 35, status: "Pendente", service: "Corte + Barba", paymentMethod: undefined },
  { id: "10", client: "André Souza", date: yesterday, time: "10:30", barber: "Carlos", value: 35, status: "Pendente", service: "Degradê", paymentMethod: undefined },
  { id: "11", client: "Thiago Ribeiro", date: yesterday, time: "11:00", barber: "André", value: 35, status: "Pendente", service: "Barba", paymentMethod: undefined },
  { id: "12", client: "Rafael Dias", date: today, time: "18:00", barber: "Pedro", value: 35, status: "Pendente", service: "Corte Clássico", paymentMethod: undefined },
];

export const WEEKLY_DATA = [
  { day: "dom", value: 0 },
  { day: "seg", value: 0 },
  { day: "ter", value: 0 },
  { day: "qua", value: 0 },
  { day: "qui", value: 0 },
  { day: "sex", value: 0 },
  { day: "sáb", value: 0 },
];
