import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Asegúrate de tener la configuración de firebase
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);  // Se inicializa como false, si no hay usuario autenticado

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Si el usuario está autenticado, lo guardamos en el estado
      } else {
        setUser(false);  // Si no hay usuario autenticado, setUser a false
      }
    });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
