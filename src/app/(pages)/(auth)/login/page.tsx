import Header from "@/app/components/layout/Header";
import { SignInForm } from "@/app/components/auth/SignIn";
import ThemeBox from "@/app/components/layout/ThemeBox";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen px-2 sm:px-0">
      <ThemeBox />
      <Header />
      <div className="h-full w-full  relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center"></div>
        <div className="relative w-full h-full font-bold flex justify-center items-center">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default page;
