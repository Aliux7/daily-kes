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

  data.map(
    (task: {
      id: string;
      title: string;
      notes: string;
      status: boolean;
      index: number;
    }) => {
      const docRef = doc(fireStore, "task", task.id);
      setDoc(
        docRef,
        {
          index: task.index,
        },
        { merge: true }
      );
      return NextResponse.json({ data: data });
    }
  );
}
