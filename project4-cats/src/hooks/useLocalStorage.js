import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  }, [key, state]);

  const setValue = (value) => {
    try {
      setState(prev => {
        return typeof value === "function" ? value(prev) : value;
      });
    } catch (err) {
      console.error("useLocalStorage set error:", err);
    }
  };

  return [state, setValue];
}
