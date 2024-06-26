import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    useEffect(() => {
        const getTheme = async () => {
          try {
            const storedTheme = await AsyncStorage.getItem("isLargeText");
            const parsedTheme = storedTheme ? JSON.parse(storedTheme) : false;
            setIsLargeText(parsedTheme);
          } catch (error) {
            console.error("Error loading theme:", error);
          }
        };
        getTheme();
      }, []);
  const [isLargeText, setIsLargeText] = useState(false);

  return (
    <ThemeContext.Provider value={{ isLargeText, setIsLargeText }}>
      {children}
    </ThemeContext.Provider>
  );
}