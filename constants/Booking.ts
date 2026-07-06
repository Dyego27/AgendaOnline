import { QrCode, Coins, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    id: "corte-social",
    name: "Corte social",
    price: 20,
    image: "/images/Social.jpg",
  },
  { 
    id: "degrade", 
    name: "Degrade", 
    price: 25, 
    image: "/images/Degrade.jpg" 
  },
  { 
    id: "militar", 
    name: "Militar", 
    price: 25, 
    image: "/images/Militar.jpg" 
  },
  { 
    id: "low-fade", 
    name: "Low Fade", 
    price: 25, 
    image: "/images/LowFade.jpg" 
  },
  {
    id: "americano",
    name: "Americano",
    price: 25,
    image: "/images/Americano.jpg",
  },
  { 
    id: "maraca", 
    name: "Maraca", 
    price: 25, 
    image: "/images/Maraca.jpg" 
  },
  { 
    id: "jit-fade", 
    name: "Jit fade", 
    price: 25, 
    image: "/images/JitFade.jpg" 
  },
  {
    id: "infantil-maquina",
    name: "Corte infantil (máquina)",
    price: 25,
    image: "/images/infantilmaquina.jpg",
  },
  {
    id: "infantil-tesoura",
    name: "Corte infantil (tesoura)",
    price: 30,
    image: "/images/infantiltesoura.jpg",
  },
  {
    id: "luzes-reflexo",
    name: "Luzes e reflexo",
    price: 60,
    image: "/images/luzesreflexo.jpg",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    price: 15,
    image: "/images/pigmentacao.jpg",
  },
  { 
    id: "nevou", 
    name: "Nevou", 
    price: 75, 
    image: "/images/Nevou.jpg" 
  }
];

export const BARBERS: Barber[] = [
  { id: "any", name: "Qualquer um", role: "Melhor horário disponível" },
  {
    id: "denius",
    name: "Denius barbeiro",
    role: "Barbeiro",
    image: "/images/barbers/Denius.jpg",
  },
  {
    id: "dindo",
    name: "Dindo barbeiro",
    role: "Barbeiro",
    image: "/images/barbers/Dindo.jpg",
  },
  {
    id: "marcos",
    name: "Marcos barbeiro",
    role: "Barbeiro",
    image: "/images/barbers/Marcos.jpg",
  },
  {
    id: "nyel",
    name: "Nyel barbeiro",
    role: "Barbeiro",
    image: "/images/barbers/Nyel.jpg",
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "pix", label: "PIX", icon: QrCode },
  { id: "cash", label: "Dinheiro", icon: Coins },
  { id: "card", label: "Cartão", icon: CreditCard },
];

export const OPENING_HOUR = 7;
export const CLOSING_HOUR = 19;
