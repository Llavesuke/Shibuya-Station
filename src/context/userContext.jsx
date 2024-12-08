import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Ensure you have the Firebase configuration
import { onAuthStateChanged } from "firebase/auth";

/**
 * UserContext to provide user authentication state.
 * @type {React.Context}
 */
export const UserContext = createContext();

/**
 * UserProvider component that provides the user context to its children.
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will consume the context.
 * @returns {JSX.Element} The UserProvider component.
 */
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false); // Initialize as false, indicating no authenticated user

  useEffect(() => {
    /**
     * Listener for authentication state changes.
     * @function
     * @param {Object} auth - The Firebase auth object.
     * @param {Function} callback - The callback function to handle the auth state change.
     */
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // If the user is authenticated, save the user in the state
      } else {
        setUser(false); // If no user is authenticated, set user to false
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