import { auth } from "@/lib/firebase/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await auth.signOut();
    cookies().delete("accessToken");
    cookies().delete("name");
    cookies().delete("email");
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error logout user:", error);
    return NextResponse.json(
      { error: "Failed to logout user" },
      { status: 500 }
    );
  }
}
