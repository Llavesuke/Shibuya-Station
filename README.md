
# Shibuya Station

## Índice

1. [Descripción de la Aplicación](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
2. [Pantallas y Funcionalidades](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
3. [Tecnologías Utilizadas](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
4. [Procedimientos de Instalación y Configuración](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
5. [Documentación del Código](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
6. [Información Relevante](vscode-file://vscode-app/snap/code/176/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

## Descripción de la Aplicación

Shibuya Station es una aplicación web que permite a los usuarios buscar, leer y gestionar mangas. Los usuarios pueden marcar mangas como favoritos, ver detalles de los mangas, y gestionar su lista de mangas pendientes, en lectura y completados.

## Pantallas y Funcionalidades

### Pantallas

* **Pantalla de Inicio** : Muestra una lista de mangas populares.
* **Pantalla de Búsqueda** : Permite a los usuarios buscar mangas por título.
* **Pantalla de Detalles del Manga** : Muestra información detallada sobre un manga específico.
* **Pantalla de Perfil** : Permite a los usuarios ver y gestionar sus mangas favoritos, pendientes, en lectura y completados.
* **Pantalla de Notificaciones** : Muestra notificaciones relevantes para el usuario.

### Funcionalidades

* **Búsqueda de Mangas** : Los usuarios pueden buscar mangas por título.
* **Gestión de Favoritos** : Los usuarios pueden marcar mangas como favoritos.
* **Gestión de Listas** : Los usuarios pueden gestionar sus listas de mangas pendientes, en lectura y completados.
* **Perfil de Usuario** : Los usuarios pueden ver y actualizar su perfil, incluyendo la imagen de perfil.

## Tecnologías Utilizadas

* **React** : Biblioteca de JavaScript para construir interfaces de usuario.
* **React Router** : Biblioteca para manejar la navegación en la aplicación.
* **Axios** : Cliente HTTP para realizar solicitudes a la API de MangaDex.
* **Firebase** : Plataforma para el backend, incluyendo autenticación y base de datos.
* **Formik** : Biblioteca para manejar formularios en React.
* **Yup** : Biblioteca para la validación de formularios.
* **React Toastify** : Biblioteca para mostrar notificaciones.
* **JSDoc** : Herramienta para generar documentación del código.

## Procedimientos de Instalación y Configuración

### Requisitos Previos

* Node.js (versión 14 o superior)
* npm (versión 6 o superior)

### Instalación

1. Clona el repositorio:

   ```plaintext
   https://github.com/Llavesuke/Shibuya-Station

   cd Shibuya-Station
   ```
2. Instala las dependencias:

   ```plaintext
   npm install
   ```
3. Configura las variables de entorno: Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```plaintext

   **VITE_FIREBASE_APIKEY=tu-api-key**

   **VITE_FIREBASE_AUTHDOMAIN=tu-auth-domain**

   **VITE_FIREBASE_PROJECTID=tu-project-id**

   **VITE_FIREBASE_STORAGEBUCKET=tu-storage-bucket**

   **VITE_FIREBASE_MESSAGINGSENDERID=tu-messaging-sende**r-id

   **VITE_FIREBASE_APPID=tu-app-id**
   ```

### Ejecución

Para iniciar la aplicación en modo desarrollo:

```plaintext
npm run dev
```

Para construir la aplicación para producción:

```plaintext
npm run build
```

Para ejecutar la aplicación en modo producción:

```plaintext
npm run serve
```

## Documentación del Código

La documentación del código se ha generado utilizando JSDoc. Puedes acceder a la documentación completa en el siguiente enlace:

[Documentación Técnica Generada por JSDoc](./docs/index.html) 

# Información Relevante

* **API Utilizada** : La aplicación utiliza la API de MangaDex para obtener información sobre los mangas.
* **Autenticación** : La autenticación de usuarios se maneja a través de Firebase Authentication.
* **Almacenamiento de Datos** : Los datos de los usuarios, como listas de mangas favoritos, pendientes, en lectura y completados, se almacenan en `localStorage`.


# Reflexión


## Introducción

El desarrollo inicial del proyecto fue bastante caótico. Sin la guía del profesor en las primeras etapas, habría sido mucho más complicado sentar las bases necesarias para estructurar adecuadamente el proyecto. Una vez establecida esa base, el progreso se convirtió en una cuestión de dedicar tiempo y mantener una concentración constante durante largos períodos.

Aunque el tiempo disponible fue justo, logré completar el proyecto justo a tiempo para la entrega. Trabajé casi todos los días en el desarrollo, y creo que, en términos de funcionalidad, he alcanzado el resultado esperado. Salvo algunos pequeños inconvenientes relacionados con la comodidad en la navegación, considero que el proyecto cumple con los objetivos planteados.

## Aprendizajes

Este proyecto me ha permitido adquirir conocimientos fundamentales y prácticos que sin duda serán útiles en el futuro:

1. **Estructura de aplicaciones web:**Aprendí a organizar mejor una aplicación, dividiendo responsabilidades entre componentes y hooks, lo que mejoró tanto la eficiencia como la claridad del código.
2. **Uso de APIs complejas:**Trabajé con la API de MangaDex, que es muy completa y versátil. Esto me obligó a explorar a fondo las opciones que ofrece, como parámetros de búsqueda, filtros avanzados, y tipos de retorno. Gracias a esto, ahora tengo un mejor manejo de APIs y puedo integrar sus funcionalidades de manera eficiente.
3. **Firebase Authentication:**
   Implementé un sistema de login y registro utilizando Firebase Authentication, lo que me permitió crear una funcionalidad avanzada y práctica que será muy valiosa en futuros proyectos.

## Dificultades y Soluciones

El desarrollo no estuvo exento de retos interesantes. Algunos de los principales desafíos que enfrenté fueron:

1. **Manejo de la API con filtros y paginación:**Implementar filtros en las búsquedas y mantenerlos al navegar entre páginas fue complejo. Inicialmente, los filtros se perdían al cambiar de página, y si la página seleccionada estaba fuera del rango de resultados, se mostraba un contenido vacío.**Solución:** Decidí almacenar los datos de los filtros en la URL. Así, al cambiar de página, la aplicación recupera los filtros desde la URL y los utiliza para mostrar la página correspondiente con los filtros aplicados.
2. **Desarrollo de notificaciones:**
   Para informar al usuario sobre actualizaciones en sus lecturas, debía comprobar continuamente si la fecha de última actualización de un manga había cambiado. Sin embargo, esto requería llamadas recursivas a la API, lo que no era viable debido al límite de solicitudes impuesto por la API de MangaDex.
   **Propuesta:** Diseñé un sistema para recuperar y analizar estos datos, pero no pude probarlo completamente debido a la dependencia de actualizaciones en la API. Aunque no llegué a implementarlo en su totalidad, fue una experiencia de aprendizaje valiosa.

## Conclusión

El proyecto ha sido una experiencia enriquecedora. He mejorado mis habilidades técnicas y adquirido un entendimiento más profundo de cómo desarrollar aplicaciones web funcionales y bien estructuradas. Aunque el tiempo fue ajustado y no todo se pudo implementar como deseaba, el resultado es satisfactorio y cumple con los objetivos principales del proyecto.

Este trabajo no solo me ha ayudado a mejorar mis conocimientos actuales, sino que también me ha preparado para abordar desafíos más complejos en el futuro.
