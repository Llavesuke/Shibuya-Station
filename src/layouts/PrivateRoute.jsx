import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

const PrivateRoute = ({ children }) => {
    const [user] = useContext(UserContext) // Obtiene el estado del usuario desde el contexto global

    if (!user) {
        return <Navigate to="/" /> // Redirige a la página principal si el usuario no está autenticado
    }
    return children 
}

export default PrivateRoute
