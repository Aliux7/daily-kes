import { fireStore } from "@/lib/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    deleteDoc(doc(fireStore, "task", data.id));
  } catch (error) {
      return NextResponse.json({ message: "Delete Failed" });
  }
  return NextResponse.json({ message: "Delete Successfully" });
}
