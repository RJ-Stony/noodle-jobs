import { createContext, useContext } from "react";

/**
 * Define theme types – currently supports Tailwind "light" / "dark"
 */
export type Theme = "light" | "dark";

/**
 * Theme context structure
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Create React context for theme state
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Custom hook to consume theme context safely
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
