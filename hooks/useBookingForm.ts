import { useState } from "react";
import { SERVICES, BARBERS } from "@/constants/Booking";

export interface FormErrors {
  service?: string;
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  barber?: string;
  payment?: string;
  submit?: string;
}

export interface BookingSnapshot {
  serviceName: string;
  barberName: string;
  name: string;
  phone: string;
  date: string;
  time: string;
}

function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getTodayString(): string {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

function validateTime(value: string): string {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const total = h * 60 + m;
  return total < 7 * 60 || total >= 19 * 60
    ? "A barbearia funciona apenas das 07:00 às 19:00"
    : "";
}

export function useBookingForm() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const isFormValid =
    !!selectedService &&
    name.trim().length >= 3 &&
    !!date &&
    !!time &&
    !timeError &&
    !!selectedBarber &&
    !!selectedPayment;

  const todayString = getTodayString();

  function handleServiceChange(id: string) {
    setSelectedService(id);
    setErrors((p) => ({ ...p, service: undefined }));
  }

  function handleNameChange(value: string) {
    setName(value);
    setErrors((p) => ({ ...p, name: undefined }));
  }

  function handlePhoneChange(raw: string) {
    setPhone(applyPhoneMask(raw));
    setErrors((p) => ({ ...p, phone: undefined }));
  }

  function handleDateChange(value: string) {
    setDate(value);
    setErrors((p) => ({ ...p, date: undefined }));
  }

  function handleTimeChange(value: string) {
    setTime(value);
    setErrors((p) => ({ ...p, time: undefined }));
    setTimeError(validateTime(value));
  }

  function handleBarberChange(id: string) {
    setSelectedBarber(id);
    setErrors((p) => ({ ...p, barber: undefined }));
  }

  function handlePaymentChange(id: string) {
    setSelectedPayment(id);
    setErrors((p) => ({ ...p, payment: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!selectedService) e.service = "Selecione um serviço para continuar.";
    if (!name.trim()) e.name = "Nome completo é obrigatório.";
    else if (name.trim().length < 3) e.name = "Digite um nome válido.";
    
   
    const digits = phone.replace(/\D/g, "");
    if (phone && digits.length < 11) {
      e.phone = "Digite um número completo com DDD ou deixe em branco.";
    }

    if (!date) e.date = "Selecione uma data.";
    if (!time) e.time = "Selecione um horário.";
    else if (timeError) e.time = timeError;
    if (!selectedBarber) e.barber = "Selecione um profissional.";
    if (!selectedPayment) e.payment = "Selecione a forma de pagamento.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!acceptedTerms) return;
    setErrors({});
    setLoading(true);

    
    const serviceObj = SERVICES.find((s) => s.id === selectedService);
    const barberObj = BARBERS.find((b) => b.id === selectedBarber);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: name,
          date,
          time,
          barber: barberObj?.name ?? "Desconhecido",
          service: serviceObj?.name ?? "Serviço Geral",
          value: serviceObj?.price ?? 40.0,
          paymentMethod: selectedPayment,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSubmitted(true);
      } else {
        setErrors({ submit: result.error || "Erro desconhecido ao agendar." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Erro de conexão com o servidor." });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSelectedService(null);
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setTimeError("");
    setSelectedBarber(null);
    setSelectedPayment(null);
    setNotes("");
    setAcceptedTerms(false);
    setErrors({});
    setSubmitted(false);
  }

  const snapshot: BookingSnapshot = {
    serviceName: SERVICES.find((s) => s.id === selectedService)?.name ?? "",
    barberName: BARBERS.find((b) => b.id === selectedBarber)?.name ?? "",
    name,
    phone,
    date,
    time,
  };

  return {
    selectedService,
    name,
    phone,
    date,
    time,
    timeError,
    selectedBarber,
    selectedPayment,
    notes,
    acceptedTerms,

    errors,
    submitted,
    isFormValid,
    todayString,
    snapshot,
    loading, 

    handleServiceChange,
    handleNameChange,
    handlePhoneChange,
    handleDateChange,
    handleTimeChange,
    handleBarberChange,
    handlePaymentChange,
    setNotes,
    setAcceptedTerms,
    handleSubmit,
    handleReset,
  } as const;
}