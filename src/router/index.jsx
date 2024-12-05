import { createBrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";
import LayoutPublic from "../layouts/LayoutPublic"; 
import { lazy } from "react";
import PublicRoute from "../layouts/PublicRoute";  
import PrivateRoute from "../layouts/PrivateRoute"; 
import Chapter from "../pages/Chapter";

// Lazy-loads
const Library = lazy(() => import("../pages/Library"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Notifications = lazy(() => import("../pages/Notifications"))
const Profile = lazy(() => import("../pages/Profile"))
const NotFound = lazy(() => import("../pages/NotFound"))
const Contact = lazy(() => import("../pages/Contact"))
const Manga = lazy(() => import("../pages/Manga"))

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true, 
                element: <Home/> 
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                )
            },
            {
                path: "library", 
                element: <Library/> 
            },
            {
                path: "manga/:mangaId", 
                element: <Manga/>
            },
            {
                path: "chapter/:chapterId",
                element: <Chapter/>
            },
            {
                path: "notifications",
                element: <Notifications/> 
            },
            {
                path: "login", 
                element: (
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                )
            },
            {
                path: "register",
                element: (
                    <PublicRoute>
                        <Register/> 
                    </PublicRoute>
                )
            },
            {
                path: "contact",
                element: <Contact/> 
            },
        ]
    }
]);
