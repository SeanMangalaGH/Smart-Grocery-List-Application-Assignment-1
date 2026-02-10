import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Author notes:
// AsyncStorage is React Native’s simple, promise-based API for persisting
// small bits of data on a user’s device. Think of it as the mobile-app equivalent
// of the browser’s localStorage, but asynchronous and cross-platform.

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#ffffff",
  surface: "#ffffff",
  text: "#030213",
  textMuted: "#4b5563",
  border: "#e5e7eb",
  primary: "#059669",
  success: "#10b981",
  warning: "#ca8a04",
  danger: "#d4183d",
  shadow: "#000000",
  gradients: {
    background: ["#ffffff", "#f3f3f5"],
    surface: ["#ffffff", "#f3f3f5"],
    primary: ["#059669", "#047857"],
    success: ["#22c55e", "#16a34a"],
    warning: ["#facc15", "#ca8a04"],
    danger: ["#d4183d", "#9f1239"],
    muted: ["#4b5563", "#9ca3af"],
    empty: ["#f3f3f5", "#e5e7eb"],
  },
  backgrounds: {
    input: "#f3f3f5",
    editInput: "#f3f3f5",
  },
  statusBarStyle: "dark-content",
};

const darkColors: ColorScheme = {
  bg: "#1f2937",
  surface: "#1f2937",
  text: "#fafafa",
  textMuted: "#9ca3af",
  border: "#374151",
  primary: "#34d399",
  success: "#22c55e",
  warning: "#facc15",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#1f2937", "#111827"],
    surface: ["#1f2937", "#374151"],
    primary: ["#34d399", "#059669"],
    success: ["#22c55e", "#16a34a"],
    warning: ["#facc15", "#ca8a04"],
    danger: ["#ef4444", "#b91c1c"],
    muted: ["#9ca3af", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  backgrounds: {
    input: "#374151",
    editInput: "#111827",
  },
  statusBarStyle: "light-content",
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // get the user's choice
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
