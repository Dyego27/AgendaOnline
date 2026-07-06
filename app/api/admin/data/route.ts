import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; 

export async function GET() {
  try {
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: {
        time: "asc",
      },
    });

    const expensesFromDb = await prisma.expense.findMany();
    const manualCutsFromDb = await prisma.manualCut.findMany();

    const appointments = appointmentsFromDb.map((a) => ({
      id: a.id,
      client: a.client,
      date: a.date,
      time: a.time,
      barber: a.barber,
      value: Number(a.value), 
      status: a.status,
      service: a.service,
      paymentMethod: a.paymentMethod,
    }));

    const expenses = expensesFromDb.map((e) => ({
      id: e.id,
      description: e.description,
      value: Number(e.value),
      date: e.date,
      category: e.category,
    }));

    const manualCuts = manualCutsFromDb.map((c) => ({
      id: c.id,
      value: Number(c.value),
      date: c.date,
      description: c.description, 
    }));

    return NextResponse.json({
      appointments,
      expenses,
      manualCuts,
    });
  } catch (error) {
    console.error("Erro na API do Dashboard:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar dados do banco" },
      { status: 500 }
    );
  }
}