import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_PASSWORD = "belal2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Set secure session cookie (valid for 7 days)
    const cookieStore = cookies();
    cookieStore.set("admin_session", expectedPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}

