import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/userContext" 
import { logout } from "../config/firebase"
import { MdOutlineLogout } from "react-icons/md"

export const CloseSession = () => {
    const [user, setUser] = useContext(UserContext) // Obtiene el estado del usuario y la función para actualizarlo

    const handleLogout = async () => {
        try {
            await logout() // Llama a la función para cerrar sesión en Firebase
            setUser(false) // Actualiza el estado del usuario a "false" para indicar que no está autenticado
            console.log("Sesión cerrada exitosamente") // Mensaje de éxito en consola
        } catch (error) {
            console.error("Error al cerrar sesión:", error) // Manejo de errores si ocurre un problema
        }
    }

    return (
        <NavLink to="/" className="navbar__link" onClick={handleLogout}>
            <MdOutlineLogout className="link__icon" />
            <span className="link__text">Logout</span>
        </NavLink>
    )
}

export default CloseSession
