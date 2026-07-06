import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client, date, time, barber, service, value, paymentMethod } = body;

    
    const appointment = await prisma.appointment.create({
      data: {
        client,
        date,
        time,
        barber,
        service,
        value: Number(value) || 40.0, 
        status: "Pendente",
        paymentMethod: paymentMethod || null,
      },
    });

    return NextResponse.json({ ok: true, appointment });
  } catch (error) {
    console.error("Erro ao salvar agendamento no Prisma:", error);
    return NextResponse.json(
      { ok: false, error: "Falha ao gravar no banco de dados." },
      { status: 500 }
    );
  }
}