"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Props = {
  children: React.ReactNode;
};

/**
 * Providers组件：包装应用程序并提供各种上下文
 * [React Query]、[主题设置]、[Clerk]
 */
const Providers: React.FC<Props> = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};

export default React.memo(Providers);
