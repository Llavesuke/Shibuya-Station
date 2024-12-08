import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

/**
 * Custom hook to check if the user is logged in and redirect to the profile page if authenticated.
 * @function
 * @returns {void}
 */
const isUsserLogged = () => {
    const { user } = useContext(UserContext); // Get the user state from the global context
    const navigate = useNavigate(); // Hook to navigate to other routes

    useEffect(() => {
        if (user) {
            navigate("/profile"); // Redirect to the profile page if the user is authenticated
        }
    }, [user, navigate]); // Dependency array to re-run the effect when user or navigate changes
};

export default isUsserLogged;