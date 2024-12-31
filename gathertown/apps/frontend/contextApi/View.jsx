"use client";

import { useState, createContext, useContext } from "react";

// Create the context
const ViewContext = createContext();

// Create the provider component
export const ViewProvider = ({ children }) => {
  const [view, setView] = useState("default");

  const viewChange = (updatedView) => {
    setView(updatedView);
  };

  return (
    <ViewContext.Provider value={{ view, viewChange }}>
      {children}
    </ViewContext.Provider>
  );
};

// Custom hook for consuming the context
export function useView() {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }

  return context;
}
