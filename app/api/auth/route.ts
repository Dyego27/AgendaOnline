import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    
    const correctEmail = process.env.ADMIN_EMAIL;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (email === correctEmail && password === correctPassword) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { authenticated: false, error: "E-mail ou senha inválidos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Erro no servidor." }, { status: 500 });
  }
}