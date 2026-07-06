"use client";

import { CalendarHeart, CalendarCheck } from "lucide-react";
import { useBookingForm } from "@/hooks/useBookingForm";
import { ServiceCarousel } from "./ServiceCarousel";
import { BarberCarousel } from "./BarberCarousel";
import { PaymentMethodGrid } from "./PaymentMethodGrid";
import { LatePolicyAlert } from "./LatePolicyAlert";
import { TermsCheckbox } from "./TermsCheckbox";
import { BookingSuccess } from "./BookingSuccess";

const INPUT_BASE = `
  w-full px-3.5 h-11 rounded-xl text-sm outline-none
  transition-all duration-200
  bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder:text-zinc-400
  focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30
  dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600
  dark:focus:border-amber-500 dark:focus:ring-amber-500/30
`;

const INPUT_ERROR = `
  w-full px-3.5 h-11 rounded-xl text-sm outline-none
  transition-all duration-200
  bg-zinc-100 border border-red-400 text-zinc-900 placeholder:text-zinc-400
  focus:border-red-500 focus:ring-1 focus:ring-red-500/20
  dark:bg-zinc-900/50 dark:border-red-500 dark:text-zinc-200 dark:placeholder:text-zinc-600
`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{message}</p>;
}

export default function BookingForm() {
  const form = useBookingForm();

  if (form.submitted) {
    return <BookingSuccess snapshot={form.snapshot} onReset={form.handleReset} />;
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2 mt-3 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Agende seu corte
        </h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Reserve seu horário com os melhores profissionais
        </span>
      </div>

      <main className="
        w-full rounded-2xl p-5 border md:max-w-xl mx-auto
        bg-white border-zinc-200
        dark:bg-zinc-950 dark:border-zinc-800/60
        transition-colors duration-300
      ">
        <form onSubmit={form.handleSubmit} noValidate>
          <div className="flex items-center gap-3 mb-6">
            <CalendarHeart size={20} color="orange" />
            <h2 className="font-bold text-zinc-900 dark:text-white">
              Novo Agendamento
            </h2>
          </div>

          <ServiceCarousel
            value={form.selectedService}
            onChange={form.handleServiceChange}
            error={form.errors.service}
          />

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1.5 text-zinc-700 dark:text-zinc-300">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => form.handleNameChange(e.target.value)}
                className={form.errors.name ? INPUT_ERROR : INPUT_BASE}
              />
              <FieldError message={form.errors.name} />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5 text-zinc-700 dark:text-zinc-300">
                WhatsApp
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={(e) => form.handlePhoneChange(e.target.value)}
                className={form.errors.phone ? INPUT_ERROR : INPUT_BASE}
              />
              <FieldError message={form.errors.phone} />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <CalendarHeart size={16} color="orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Data e Horário
              </span>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5 text-zinc-700 dark:text-zinc-300">
                Data
              </label>
              <input
                type="date"
                min={form.todayString}
                value={form.date}
                onChange={(e) => form.handleDateChange(e.target.value)}
                className={form.errors.date ? INPUT_ERROR : INPUT_BASE}
              />
              <FieldError message={form.errors.date} />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5 text-zinc-700 dark:text-zinc-300">
                Horário
              </label>
              <input
                type="time"
                min="07:00"
                max="18:59"
                value={form.time}
                onChange={(e) => form.handleTimeChange(e.target.value)}
                className={form.timeError || form.errors.time ? INPUT_ERROR : INPUT_BASE}
              />
              {form.timeError || form.errors.time ? (
                <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {form.timeError || form.errors.time}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                  Funcionamento: 07:00 às 19:00
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <BarberCarousel
              value={form.selectedBarber}
              onChange={form.handleBarberChange}
              error={form.errors.barber}
            />
          </div>

          <div className="mt-6">
            <PaymentMethodGrid
              value={form.selectedPayment}
              onChange={form.handlePaymentChange}
              error={form.errors.payment}
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium block mb-1.5 text-zinc-700 dark:text-zinc-300">
              Observações{" "}
              <span className="text-zinc-400 dark:text-zinc-600 font-normal">(opcional)</span>
            </label>
            <div className="relative">
              <textarea
                placeholder="Alguma preferência especial?"
                maxLength={500}
                rows={3}
                value={form.notes}
                onChange={(e) => form.setNotes(e.target.value)}
                className="
                  w-full px-3.5 py-3 pb-6 rounded-xl text-sm outline-none resize-none
                  transition-all duration-200
                  bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder:text-zinc-400
                  focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30
                  dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600
                "
              />
              <span className="absolute bottom-2.5 right-3.5 text-xs text-zinc-400 dark:text-zinc-600 pointer-events-none">
                {form.notes.length}/500
              </span>
            </div>
          </div>

          <div className="mt-5"><LatePolicyAlert /></div>
          <div className="mt-5">
            <TermsCheckbox
              checked={form.acceptedTerms}
              onChange={form.setAcceptedTerms}
            />
          </div>

          <button
            type="submit"
            disabled={!form.isFormValid || !form.acceptedTerms}
            className="
              w-full h-11 mt-5 rounded-xl text-white font-semibold text-sm
              flex items-center justify-center gap-2
              transition-all duration-200 active:scale-[0.98]
              bg-orange-500 hover:bg-orange-400
              shadow-[0_0_16px_rgba(249,115,22,0.25)]
              disabled:opacity-40 disabled:cursor-not-allowed
              disabled:hover:bg-orange-500 disabled:shadow-none
            "
          >
            <CalendarCheck size={16} />
            Agendar Horário
          </button>
        </form>
      </main>
    </>
  );
}