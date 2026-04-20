import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://notehub-api.goit.study";

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    const nextResponse = NextResponse.json({});

    // Clear the auth cookie
    nextResponse.cookies.delete("auth-token");

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
