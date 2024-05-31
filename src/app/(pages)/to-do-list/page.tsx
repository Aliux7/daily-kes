"use client";
import Header from "@/app/components/layout/Header";
import ThemeBox from "@/app/components/layout/ThemeBox";
import { AddTask } from "@/app/components/to-do-list/AddTask";
import DndItemList from "@/app/components/to-do-list/DndItemList";
import { EditTask } from "@/app/components/to-do-list/EditTask";
import FinishItemList from "@/app/components/to-do-list/FinishItemList";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="max-w-screen min-h-screen px-10 py-2 flex justify-center items-start">
      <ThemeBox />
      <Header />
      <div className="max-w-screen-lg w-full h-fit flex flex-wrap overflow-y-auto mt-20">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[var(--text-color)] text-4xl">My Task</h1>
          <div
            onClick={(e) => {
              setIsAddFormOpen(true);
            }}
            className="text-[var(--text-color)] text-xl p-2 rounded-xl hover:bg-[var(--hover-color)] cursor-pointer"
          >
            + Add Task
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto h-full my-5">
          <DndItemList isAddFormOpen={isAddFormOpen} setIsAddFormOpen={setIsAddFormOpen}/>
        </div>
      </div>
    </div>
  );
};

export default page;
