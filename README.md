
La diferencia entre declarar estilos de manera **directa** (inline) y **global** (en un archivo CSS separado) radica en la reutilización, mantenibilidad y organización del código:

### **Estilo Directo (Inline)**

Este método define el estilo directamente en el atributo `style` del elemento HTML. Se utiliza principalmente cuando:

* **Propósito específico** : Los estilos son únicos y no se reutilizarán en ningún otro lugar.
* **Cambios dinámicos** : Se necesitan estilos que dependan de valores calculados o cambiantes en tiempo de ejecución.

Ejemplo:

```html
<section style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

```

**Ventajas:**

1. Es fácil y rápido para estilos únicos o específicos de un solo componente.
2. Se puede integrar con lógica de JavaScript, lo cual es útil en frameworks como React.

**Desventajas:**

1. **Mala práctica para estilos repetitivos** : Si el mismo estilo debe usarse en múltiples componentes, se duplicará el código, lo que dificulta el mantenimiento.
2. **Difícil de escalar** : Un archivo con muchos estilos inline se vuelve desorganizado rápidamente.
3. **Menor separación de responsabilidades** : Mezcla la lógica de presentación (estilos) con la estructura del componente.

---

### **Estilo Global**

Aquí, los estilos se definen en un archivo CSS (como `index.css`) y se aplican mediante clases. Esto es adecuado para estilos reutilizables o para mantener un proyecto organizado.

Ejemplo:

```html
/* index.css */
.profile__left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Y luego en el componente:

```html
<section className="profile__left"></section>
```

**Ventajas:**

1. **Reutilización** : Los estilos pueden aplicarse a múltiples elementos sin duplicar el código.
2. **Facilita el mantenimiento** : Los cambios en el diseño global se pueden realizar en un solo lugar.
3. **Mejor organización** : Promueve la separación de responsabilidades entre lógica (JavaScript/HTML) y diseño (CSS).

**Desventajas:**

1. Puede ser más complicado si solo se necesita un estilo específico en un único componente.
