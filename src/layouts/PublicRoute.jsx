import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

/**
 * PublicRoute component that restricts access to unauthenticated users.
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will be rendered if the user is not authenticated.
 * @returns {JSX.Element} The PublicRoute component.
 */
const PublicRoute = ({ children }) => {
    const [user] = useContext(UserContext); // Get the user state from the global context

    if (user) {
        return <Navigate to="/" />; // Redirect to the home page if the user is authenticated
    }

    return children; // Render the children components if the user is not authenticated
};

export default PublicRoute;