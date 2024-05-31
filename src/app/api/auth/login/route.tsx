import { auth, fireStore } from "@/lib/firebase/config";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userData = await request.json();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    if (userCredential.user.uid) {
      const docRef = doc(fireStore, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = userCredential.user;
        const email = userCredential.user.email
          ? userCredential.user.email
          : "example@gmail.com";
        const name = docSnap.data().name;
        const accessToken = await user.getIdToken();

        cookies().set("name", name, {
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        });
        cookies().set("email", email, {
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        });
        cookies().set("accessToken", accessToken, {
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        });
        return NextResponse.json({ accessToken, user });
      }

      console.log("No such document!");
      return NextResponse.json(
        { error: "Failed to login user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error login user:", error);
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  }
}
