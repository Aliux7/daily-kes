import { fireStore } from "@/lib/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const email = data.email;

  try {
    const q = query(
      collection(fireStore, 'task'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("Error getting data:", error);
  }
}
