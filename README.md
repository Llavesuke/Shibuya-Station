# Proyecto React con Firebase y Rutas Protegidas

Este proyecto es una aplicación web construida con **React** y **Firebase**, que implementa rutas protegidas, autenticación de usuarios, y comunicación asíncrona para proporcionar una experiencia segura y optimizada. A continuación, se detalla la estructura del proyecto, las funcionalidades principales y cómo se ha integrado cada componente.

---

## Tabla de Contenidos
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autenticación con Firebase](#autenticacion-con-Firebase)
- [Protección de Rutas](#protección-de-rutas)
- [Comunicación Asíncrona con la API](#comunicación-asíncrona-de-la-api)
- [Lazy Loading y Optimización](#lazyload)

---

## Características

- Autenticación: Registro, inicio de sesión y cierre de sesión con Firebase.
- Rutas protegidas: Acceso restringido basado en el estado de autenticación del usuario.
- Lazy Loading: Carga de componentes bajo demanda para optimizar el rendimiento.
- Gestión del estado global: Implementación de React.Context para manejar el estado del usuario.
- Integración de API: Comunicación asíncrona con Firebase para autenticación y gestión de usuarios.

--- 

## Estructura del Proyecto

```plaintext
src/
├── components/         # Componentes reutilizables
├── context/            # Contexto global para el estado del usuario
│   └── userContext.js  # Proveedor del contexto del usuario
├── layouts/            # Layouts para diseño y rutas protegidas
│   ├── LayoutPublic.js # Diseño para rutas públicas
│   ├── PublicRoute.js  # Componente para proteger rutas públicas
│   └── PrivateRoute.js # Componente para proteger rutas privadas
├── pages/              # Páginas de la aplicación
│   ├── Home.js         # Página principal
│   ├── Profile.js      # Página de perfil (ruta privada)
│   ├── Login.js        # Página de inicio de sesión
│   ├── Register.js     # Página de registro
│   ├── Library.js      # Página de biblioteca
│   ├── Contact.js      # Página de contacto
│   └── NotFound.js     # Página 404
├── config/             # Configuración de Firebase
│   └── firebase.js     # Integración y configuración de Firebase
├── router/             # Configuración de rutas
│   └── index.js        # Enrutador principal
└── App.js              # Componente raíz
```

--- 

 ### Autenticacion con Firebase
 
 Utilizo el SDK de Firebase para la implementación de este apartado.
 
 
 **Registro:**
```javascript
 export const registro = async ({ username, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: username })
    return userCredential
}
```


 **Login**
 
```
 export const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password)
}
```


Cierre de sesión
```
export const logout = () => signOut(auth)
```
---

### Protección de rutas.

Se quiere proteger las rutas de `/login` y `/register` para que cuando el usuario ya este autenticado, no permita la entrada a esas rutas.
También si no se esta autenticado, no se debe poder acceder a `/profile` 

Para eso se llega a la siguiente solución:

##### PublicRoute

```javascript
if (user) {
   return <Navigate to="/" />
}
return children
```

##### PrivateRoute

```javascript
if (!user) {
   return <Navigate to="/" />
}
return children
```

---

### Comunicación asíncrona de la API

El componente Library implementa las siguientes funcionalidades principales:

- Integración con una API externa: Se conecta a la API de Mangadex (https://api.mangadex.org) para obtener datos de mangas, incluyendo títulos y portadas.

- Paginación: Implementa paginación basada en el parámetro page en la URL. Se maneja el estado del número de página y la navegación entre páginas, actualizando dinámicamente el contenido mostrado.

- Comunicación asíncrona: Utiliza axios para hacer solicitudes HTTP asíncronas a la API y maneja respuestas y errores.

- Uso de parámetros en la URL: Usa el parámetro de búsqueda ?page en la URL para sincronizar la navegación y la carga de datos.


#### Flujo del Componente
1. Estado inicial:

- mangas: Contiene los datos de los mangas obtenidos desde la API.
- currentPage: Rastrea la página actual.
- totalMangas: Almacena el número total de mangas disponibles.
- mangasPerPage: Define el número de mangas por página.

2. Carga inicial y actualizaciones:

Cuando el componente se monta o la URL cambia, se llama a fetchMangas para obtener datos de la API, basándose en el número de página obtenido de la URL.

3. Paginación:

Los botones Next y Previous permiten navegar entre páginas.
La función navigate actualiza el parámetro ?page en la URL, sincronizando el estado de la aplicación con la interfaz.


```javascript
const fetchMangas = async (page) => {
 const offset = (page - 1) * mangasPerPage; // Cálculo del desplazamiento
 try {
   const resp = await axios({
     method: 'GET',
     url: `${baseUrl}/manga`,
     params: {
       limit: mangasPerPage,
       offset: offset,
       includes: ['cover_art'],
     },
   });
   setMangas(resp.data.data); // Actualiza los mangas en el estado
   setTotalMangas(resp.data.total); // Actualiza el total de mangas disponibles
 } catch (error) {
   console.error('Error fetching mangas:', error); // Manejo de errores
 }
};
```

FetchMangas -> Maneja la comunicación con la API para obtener datos de mangas.

```javascript
const getPageFromUrl = () => {
 const urlParams = new URLSearchParams(location.search);
 const page = parseInt(urlParams.get('page'), 10);
 return isNaN(page) ? 1 : page; // Página predeterminada es 1 si no hay un parámetro válido
};
```

getPageFromUrl -> Obtiene el número de página desde la URL usando useLocation.


```javascript
const nextPage = () => {
 if (currentPage < Math.ceil(totalMangas / mangasPerPage)) {
   const newPage = currentPage + 1;
   setCurrentPage(newPage);
   navigate(`?page=${newPage}`); 
   fetchMangas(newPage);
 }
};
```

Controlan la navegación entre páginas, actualizando el estado y el parámetro en la URL.


```html
<div className="pagination">
 <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
 <span>Page {currentPage} of {Math.ceil(totalMangas / mangasPerPage)}</span>
 <button
   onClick={nextPage}
   disabled={currentPage === Math.ceil(totalMangas / mangasPerPage)}
 >
   Next
 </button>
</div>
```

Paginación -> Incluye botones de navegación y muestra la página actual.


#### Comunicación Asíncrona y API

Este componente demuestra una integración completa con una API REST:

- Petición GET: Se utilizan parámetros como limit y offset para controlar la paginación.
- Manejo de errores: Uso de bloques try-catch para capturar y manejar errores de red o API.
- Actualización dinámica: Almacena los datos obtenidos en el estado de React, actualizando la interfaz automáticamente.


Aspectos Destacados
- Sincronización con la URL: El componente utiliza useLocation y navigate para sincronizar la URL con el estado de la aplicación.
- Eficiencia: Limita la cantidad de datos solicitados por página, optimizando el rendimiento.

![image](https://github.com/user-attachments/assets/760b2d1c-9f03-49cd-b71a-45c55ebffc0b)
Una muestra de como obtiene los datos de la API de manera correcta y los muestra sin errores

<br>

![image](https://github.com/user-attachments/assets/dbb05da6-be8e-4b0b-a5b6-0d576f6f83f3)
Muestra de la paginación
<br>

![image](https://github.com/user-attachments/assets/efa1634c-d8c3-41ba-906d-e27632421cc5)
<br>
Se guarda en la URL la página en la que se esta para que no se pierda el progreso de la aplicación al refrescar

----

### Lazyload

Se ha utilizado lazyload para aumentar el rendimiento inicial de la aplicación, la modificación se ha realizado en `index.jsx`

```javascript

// Lazy-loads
const Library = lazy(() => import("../pages/Library"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Notifications = lazy(() => import("../pages/Notifications"))
const Profile = lazy(() => import("../pages/Profile"))
const NotFound = lazy(() => import("../pages/NotFound"))
const Contact = lazy(() => import("../pages/Contact"))
```


 
