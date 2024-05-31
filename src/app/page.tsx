import {
  IconChartPieFilled,
  IconChartBar,
  IconBrandCashapp,
  IconListCheck,
  IconClipboardCheck,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import ThemeBox from "./components/layout/ThemeBox";
import { PinContainer } from "./components/ui/3D-Pin";
import Header from "./components/layout/Header";

export default function Home() {
  const sections = [
    // {
    //   title: "Portofolio",
    //   icon: (
    //     <IconChartPieFilled className="h-20 w-20 text-neutral-700 dark:text-neutral-300" />
    //   ),
    //   href: "/portofolio",
    // },
    // {
    //   title: "Trading",
    //   icon: (
    //     <IconChartBar className="h-20 w-20 text-neutral-700 dark:text-neutral-300" />
    //   ),
    //   href: "/trading",
    // },
    // {
    //   title: "Cash Flow",
    //   icon: (
    //     <IconBrandCashapp className="h-20 w-20 text-neutral-700 dark:text-neutral-300" />
    //   ),
    //   href: "/cash-flow",
    // },
    {
      title: "To Do List",
      icon: (
        <IconListCheck className="h-20 w-20 text-neutral-700 dark:text-neutral-300" />
      ),
      href: "/to-do-list",
    },
    {
      title: "Coming Soon",
      icon: (
        <IconClipboardCheck className="h-20 w-20 text-neutral-700 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="w-screen min-h-screen px-10 py-2 flex justify-center items-center">
      <ThemeBox />
      <Header />
      <div className="w-full h-fit flex flex-wrap overflow-y-auto pb-20 justify-center items-center gap-10">
        {sections.map((section) => (
          <Link href={section.href}>
            <PinContainer title={section.title}>
              <div className="flex basis-full flex-col pt-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[10rem] h-[10rem] items-center gap-y-5">
                {section.icon}
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-[var(--text-color)]">
                  {section.title}
                </h3>
              </div>
            </PinContainer>
          </Link>
        ))}
      </div>
    </div>
  );
}
