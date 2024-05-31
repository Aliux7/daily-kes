import { fireStore } from "@/lib/firebase/config";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const docRef = doc(fireStore, "task", data.id);
  setDoc(
    docRef,
    {
      title: data.title,
      notes: data.notes,
    },
    { merge: true }
  );
  
  return NextResponse.json({ data: data });
}
