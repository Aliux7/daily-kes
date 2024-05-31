import { fireStore } from "@/lib/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const taskData = await request.json();

  try {
    await addDoc(collection(fireStore, "task"), {
      title: taskData.title,
      notes: taskData.notes,
      email: taskData.email,
      status: false,
      index: -1
    });

    return NextResponse.json({ message: "Task add successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
