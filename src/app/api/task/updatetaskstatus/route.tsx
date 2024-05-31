import { fireStore } from "@/lib/firebase/config";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const docRef = doc(fireStore, "task", data.id);
  setDoc(
    docRef,
    {
      status: data.status,
    },
    { merge: true }
  );
  
  return NextResponse.json({ data: data });
}
