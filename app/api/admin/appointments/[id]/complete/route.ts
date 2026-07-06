import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function PATCH(
  request: NextRequest, 
  context: { params: Promise<{ id: string }> } 
) {
  try {
    
    const params = await context.params;
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: id },
      data: { status: "Concluído" },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Erro interno na rota do Prisma:", error);
    return NextResponse.json(
      { error: "Erro ao salvar no banco de dados" },
      { status: 500 }
    );
  }
}