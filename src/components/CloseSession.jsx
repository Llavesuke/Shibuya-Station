import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { logout } from "../config/firebase";
import { MdOutlineLogout } from "react-icons/md";

/**
 * Component for closing the user session.
 * @component
 */
export const CloseSession = () => {
    const [user, setUser] = useContext(UserContext); // Get the user state and the function to update it

    /**
     * Handles the logout process.
     * @async
     * @function handleLogout
     */
    const handleLogout = async () => {
        try {
            await logout(); // Calls the function to log out from Firebase
            setUser(false); // Updates the user state to "false" to indicate the user is not authenticated
            console.log("Session closed successfully"); // Success message in console
        } catch (error) {
            console.error("Error closing session:", error); // Error handling if a problem occurs
        }
    };

    return (
        <NavLink to="/" className="navbar__link" onClick={handleLogout}>
            <MdOutlineLogout className="link__icon" />
            <span className="link__text">Logout</span>
        </NavLink>
    );
};

export default CloseSession;