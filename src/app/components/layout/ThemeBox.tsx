"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AnimatedTooltip } from "../ui/Animated-tooltip";
import { logout } from "@/lib/utils/server/auth";
import { useRouter } from "next/navigation";

const ThemeBox = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") as string);
    } else {
      localStorage.setItem("theme", "Light");
    }
  }, []);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    try {
      logout().then(() => {
        router.push("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed h-fit sm:h-full w-auto right-5 z-[70] flex justify-center items-start sm:items-center top-5 sm:top-0">
      <div className="flex flex-row sm:flex-col justify-center items-center text-center gap-2 sm:w-12 bg-[var(--background-color)] border border-gray-100 dark:border-gray-900 shadow-inner shadow-lg dark:shadow-gray-900 rounded-xl p-1 sm:p-3">
        <div className="text-[var(--off-stroke-color)] hover:cursor-pointer hover:bg-[var(--hover-color)] rounded-lg p-1">
          <AnimatedTooltip />
        </div>
        <svg
          onClick={() => setTheme("Light")}
          className="hover:cursor-pointer p-1.5 hover:bg-[var(--hover-color)] rounded-lg"
          width="30"
          height="30"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5Z"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 0.5V2.5"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M2.3999 2.4L3.8199 3.82"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M0.5 7H2.5"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M2.3999 11.6L3.8199 10.18"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 13.5V11.5"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M11.5999 11.6L10.1799 10.18"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.5 7H11.5"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M11.5999 2.4L10.1799 3.82"
            stroke={
              theme == "Light"
                ? "var(--on-stroke-color)"
                : "var(--off-stroke-color)"
            }
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <div
          className="hover:cursor-pointer p-1.5 hover:bg-[var(--hover-color)] rounded-lg"
          onClick={() => setTheme("Dark")}
        >
          <svg
            className="-rotate-[30deg] ml-1"
            width="17"
            height="17"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 7C6.00471 5.78763 6.32421 4.59726 6.92723 3.54548C7.53025 2.4937 8.39611 1.61657 9.44 1C8.66591 0.679515 7.83775 0.509809 7 0.5C5.27609 0.5 3.62279 1.18482 2.40381 2.40381C1.18482 3.62279 0.5 5.27609 0.5 7C0.5 8.72391 1.18482 10.3772 2.40381 11.5962C3.62279 12.8152 5.27609 13.5 7 13.5C7.84786 13.494 8.68657 13.3242 9.47 13C8.42053 12.3872 7.54869 11.5117 6.94026 10.4596C6.33183 9.40759 6.00779 8.21528 6 7V7Z"
              stroke={
                theme == "Dark"
                  ? "var(--on-stroke-color)"
                  : "var(--off-stroke-color)"
              }
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <div
          onClick={() => {
            handleLogout();
          }}
        >
          <div className="hover:cursor-pointer p-1.5 hover:bg-[var(--hover-color)] rounded-lg">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-5 text-[var(--off-stroke-color)] font-light"
              strokeWidth="0.75"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBox;
