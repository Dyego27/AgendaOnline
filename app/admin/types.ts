export type Status = "Pendente" | "Concluído";

export type PaymentMethod = "Pix" | "Dinheiro" | "Cartão";

export interface Appointment {
  id: string;
  client: string;
  date: string;
  time: string;
  barber: string;
  value: number;
  status: Status;
  service: string;
  paymentMethod?: PaymentMethod;
}

export interface Expense {
  id: string;
  barber: string;
  description: string;
  category: string;
  value: number;
  date: string;
}

export interface ManualCut {
  id: string;
  description: string;
  value: number;
  date: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export type TimePeriod = "Dia" | "Quinzena" | "Mês" | "Ano";
