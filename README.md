
# Estructura y Funcionalidad Básica de la Aplicación

Este documento describe la estructura organizativa de la aplicación y detalla los pasos realizados durante su desarrollo. Incluye la creación de la estructura del proyecto, las páginas principales, la configuración del enrutamiento y la implementación de la página de contacto con validaciones.

## Estructura del Proyecto

La estructura organizativa inicial del proyecto es la siguiente:

```
src
├── assets
├── components
│   ├── Footer.jsx
│   ├── Navbar.jsx
├── layouts
│   ├── LayoutPublic.jsx
├── pages
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Library.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Notifications.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
├── router
│   ├── Index.jsx
├── Index.css
├── Main.jsx
```

### Descripción de las Carpetas y Archivos

- **assets**: Contiene los recursos estáticos como imágenes, íconos y otros activos.
- **components**: Componentes reutilizables de la interfaz, como el `Navbar` y el `Footer`.
- **layouts**: Contiene el `LayoutPublic`, que incluye elementos comunes como el navbar y el footer.
- **pages**: Cada archivo representa una página principal de la aplicación.
- **router**: Contiene el archivo de enrutamiento `Index.jsx` para configurar las rutas.
- **Index.css**: Archivo de estilos globales.
- **Main.jsx**: Punto de entrada de la aplicación.

---

## Páginas Principales

Se crearon las siguientes páginas principales:

- **Home.jsx**
- **Profile.jsx**
- **Library.jsx**
- **Notifications.jsx**
- **Login.jsx**
- **Register.jsx**
- **Contact.jsx**
- **NotFound.jsx**

Cada página inicial se creó con un componente básico utilizando el siguiente código base:

```javascript
const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page;
```

---

## Configuración del Enrutamiento

El enrutamiento se configuró utilizando la función `createBrowserRouter()` en el archivo `router/Index.jsx`.

### Estructura de las Rutas

Se definió un array con objetos que representan las rutas:

```javascript
path: "/route",
element: <Element/>,
```

#### Ejemplo de Configuración

El layout principal incluye componentes comunes (como el navbar y el footer) y maneja los errores con un elemento de fallback. Las rutas dinámicas se gestionan mediante el array `children`:

```javascript
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
    element: <Profile/>
  },
  {
    path: "library",
    element: <Library/>
  },
  {
    path: "library/:id",
    element: <LibraryDetail/>
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
```

También debemos cambiar contenido en el `main.jsx`:

```javascript

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>
);
```


---

## Página de Contacto

La página `Contact.jsx` permite a los usuarios enviar información mediante un formulario con validaciones. A continuación, se detallan las funcionalidades implementadas.

### Validaciones del Formulario

El formulario realiza las siguientes validaciones:

1. **Nombre:** El campo no debe estar vacío.
2. **Correo Electrónico:** Debe cumplir con un formato válido (expresión regular).
3. **Mensaje:** El campo no debe estar vacío.

### Código Detallado

El formulario se creó utilizando el estado local para gestionar los datos y se incluyeron mensajes de validación visualizados mediante la librería `react-toastify`.

#### Funciones de Validación

```javascript
function checkName(name) {
  return name === '';
}

function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return !regex.test(email);
}
```

#### Lógica de Envío

En el `handleSubmit`, se realizan las validaciones y se generan mensajes de error personalizados:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  const nameError = checkName(formData.name);
  const emailError = checkEmail(formData.email);
  const messageError = formData.message === '';

  if (nameError) {
    toast('Name is required', { style: { backgroundColor: '#003366', color: '#E2E2B6' } });
  }

  if (emailError) {
    toast('Valid email is required', { style: { backgroundColor: '#003366', color: '#E2E2B6' } });
  }

  if (messageError) {
    toast('Message is required', { style: { backgroundColor: '#003366', color: '#E2E2B6' } });
  }

  if (!nameError && !emailError && !messageError) {
    toast('Form submitted successfully:', formData);
  }
};
```

#### Interfaz del Formulario

El formulario incluye campos de texto para el nombre y el correo electrónico, un área de texto para el mensaje y un botón para enviar:

```javascript
<form className="contact-form" onSubmit={handleSubmit}>
  <label htmlFor="name" id="nameInput">Name:</label>
  <input 
    type="text"
    name="name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
  />

  <label htmlFor="email" id="emailInput">Email:</label>
  <input 
    type="text" 
    name="email" 
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
  />

  <label htmlFor="message" id="messageInput">Message:</label>
  <textarea 
    id="message" 
    name="message"
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
  ></textarea>

  <button type="submit" id="formSubmitBtn">Send</button>
</form>
```

Además, se integró `ToastContainer` para mostrar los mensajes:

```javascript
<ToastContainer />
```

Este ToasContainer pertenece a **React-tostify.**

---

Con esta estructura y funcionalidades, la aplicación está lista para ser expandida y personalizada según los requisitos del proyecto.
