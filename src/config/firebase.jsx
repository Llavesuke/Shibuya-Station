// Importación de las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

// Configuración de Firebase utilizando variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APPID
}

// Inicialización de la app de Firebase
const app = initializeApp(firebaseConfig)

// Inicialización del servicio de autenticación
export const auth = getAuth()

// Función para iniciar sesión
export const login = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password) // Utiliza el método de Firebase para autenticar con email y contraseña
}

// Función para registrar un nuevo usuario
export const registro = async ({ username, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password) // Crea un nuevo usuario con email y contraseña
    await updateProfile(userCredential.user, { displayName: username }) // Actualiza el perfil del usuario para incluir el nombre de usuario
    console.log('Usuario registrado:', userCredential.user)
    return userCredential 
  } catch (error) {
    console.error('Error al registrar usuario:', error) 
    throw error 
  }
}

// Función para cerrar sesión
export const logout = () => signOut(auth) // Cierra la sesión del usuario autenticado
