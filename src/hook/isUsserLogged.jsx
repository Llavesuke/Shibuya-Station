import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"

const isUsserLogged = () => {
    const { user } = useContext(UserContext) // Obtiene el estado del usuario desde el contexto global
    const navigate = useNavigate() // Hook para redirigir a otras rutas

    useEffect(() => {
        if (user) return navigate("/profile") // Redirige al perfil si el usuario está autenticado
    }, [user]) 
}

export default isUsserLogged
