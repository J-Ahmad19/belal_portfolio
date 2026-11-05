import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");

  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");

  return NextResponse.json({ success: true });
}

