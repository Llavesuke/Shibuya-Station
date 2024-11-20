import { createBrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Library from "../pages/Library";
import Notifications from "../pages/Notifications";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound"; 
import LayoutPublic from "../layouts/LayoutPublic"; 

export const router = createBrowserRouter([
    {
        path: "/", // Ruta principal de la aplicación.
        element: <LayoutPublic/>, // Define el layout que envolverá las rutas anidadas.
        errorElement: <NotFound/>, // Página que se muestra en caso de un error (por ejemplo, ruta no encontrada).
        children: [ // Rutas anidadas dentro del layout principal.
            {
                index: true, // Ruta predeterminada cuando se accede a "/".
                element: <Home/> 
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "library", 
                element: <Library/> 
            },
            {
                path: "library/:id", // Ruta dinámica para "/library/:id". 
                // Nota: No se define un elemento aún
            },
            {
                path: "notifications",
                element: <Notifications/> 
            },
            {
                path: "login", 
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/> 
            },
            {
                path: "contact",
                element: <Contact/> 
            },
        ]
    }
]);
