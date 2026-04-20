import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(null);
    }

    // Якщо потрібно передати токен у заголовок, формуємо рядок Cookie вручну
    const response = await api.get("/auth/session", {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Session error:", error.response?.data || error.message);
    return NextResponse.json(null);
  }
}
