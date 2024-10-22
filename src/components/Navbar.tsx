// Navbar

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {

  return (
    <header className="sticky inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="container flex items-center justify-between h-full gap-2 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <div className="flex cursor-default items-center text-2xl font-bold text-[#FE7600] leading-none">
            <div>
              颜文字 (✪ω✪) <span className="ml-2">●</span>
            </div>
          </div>
        </Link>
        {/* 主题切换按钮 */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
