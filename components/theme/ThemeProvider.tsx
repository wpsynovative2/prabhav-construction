"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // Light only for now. To bring dark mode back: drop forcedTheme, restore
    // defaultTheme="system" + enableSystem and SHOW_THEME_TOGGLE in SideNav.
    <NextThemes attribute="data-theme" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}
