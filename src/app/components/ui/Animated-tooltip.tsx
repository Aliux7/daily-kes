"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { IconUserCircle } from "@tabler/icons-react";
import getUserCookies from "@/lib/utils/server/server";

export const AnimatedTooltip = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<boolean>(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    async function fetchUserCookies() {
      try {
        const userDetail = await getUserCookies();
        console.log(userDetail);
        setName(userDetail.name);
        setEmail(userDetail.email);
      } catch (error) {
        console.error("Error fetching user cookies:", error);
      }
    }

    fetchUserCookies();
  }, []);

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setHoveredIndex(true)}
        onMouseLeave={() => setHoveredIndex(false)}
      >
        {hoveredIndex === true && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute top-0 sm:-top-16 right-10 sm:right-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
            <div className="font-bold text-white relative z-30 text-base">
              {name}
            </div>
            <div className="text-white text-xs">{email}</div>
          </motion.div>
        )}

        <IconUserCircle onMouseMove={handleMouseMove} strokeWidth={1} />
      </div>
    </>
  );
};
