// src/context/FiltersContext.jsx
import React, { createContext, useContext, useState } from "react";

// Crear el contexto de los filtros
const FiltersContext = createContext();

// Hook para acceder al contexto
export const useFilters = () => useContext(FiltersContext);

// Proveedor del contexto para envolver la aplicación
export const FiltersProvider = ({ children }) => {
  // Estado para almacenar los filtros
  const [filters, setFilters] = useState({
    tags: [],
    author: "",
    dateRange: { start: "", end: "" }, // Para filtrar por fecha
    searchQuery: "", // Para filtrar por búsqueda textual
  });

  // Función para actualizar los filtros
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
