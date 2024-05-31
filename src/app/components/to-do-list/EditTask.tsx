"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { cn } from "@/lib/utils/cn";
import { IconKey, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import getUserCookies from "@/lib/utils/server/server";
import { ItemType } from "./Types";
import { deleteTask, updateItemsDetail } from "@/lib/utils/server/task";

interface EditTaskProps {
  item: ItemType;
  setIsEditFormOpen: Dispatch<SetStateAction<boolean>>;
  onTaskUpdated: () => void;
}

export function EditTask({
  item,
  setIsEditFormOpen,
  onTaskUpdated,
}: EditTaskProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItemsDetail(item.id, title, notes).then(() => {
      setIsEditFormOpen(false);
      onTaskUpdated();
    });
  };

  useEffect(() => {
    setTitle(item.title);
    setNotes(item.notes);
  }, []);

  return (
    <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input dark:shadow-[#27272A] bg-white dark:bg-[#0F0F0F]">
      <form className="relative pt-8 mb-4" onSubmit={handleSubmit}>
        <div className="absolute top-0 right-0">
          <span
            className="bg-red-500 text-white p-2 rounded-xl text-sm cursor-pointer"
            onClick={() => {
              deleteTask(item.id).then(() => {
                setIsEditFormOpen(false);
                onTaskUpdated();
              })
            }}
          >
            Delete
          </span>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="task_title">Task Title</Label>
          <Input
            id="task_title"
            placeholder=""
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="task_note">Task Note</Label>
          <Input
            id="task_note"
            placeholder=""
            type="text"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </LabelInputContainer>
        <button
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-black dark:from-white dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 w-full text-white dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Update
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
