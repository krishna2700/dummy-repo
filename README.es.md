# React — Introducción (en español)

> Una biblioteca de JavaScript para construir interfaces de usuario modernas, modulares y de alto rendimiento.

---

## Tabla de contenidos

- [¿Qué es React?](#qué-es-react)
- [¿Por qué usar React?](#por-qué-usar-react)
- [Conceptos clave](#conceptos-clave)
- [Hooks esenciales](#hooks-esenciales)
- [Ejemplo mínimo](#ejemplo-mínimo)
- [Buenas prácticas](#buenas-prácticas)
- [Conclusión](#conclusión)

---

## ¿Qué es React?

React es una **biblioteca de JavaScript** de código abierto creada por Facebook, diseñada para construir interfaces de usuario (UI) de forma **modular**, **rápida** y **mantenible**.

Es el núcleo de muchas aplicaciones web modernas y se basa en un modelo de **componentes reutilizables**.

---

## ¿Por qué usar React?

| Ventaja | Descripción |
|---|---|
| Componentes reutilizables | Divide la interfaz en bloques independientes y reutilizables |
| Renderizado eficiente | React actualiza el DOM de forma optimizada mediante el Virtual DOM |
| Ecosistema rico | Herramientas, bibliotecas y una comunidad muy activa |
| Mantenibilidad | Arquitectura clara para aplicaciones que evolucionan |
| Compatible con TypeScript | Integración nativa y madura con TypeScript |

---

## Conceptos clave

### 1. Los componentes

Un componente es una **función** (o clase) que devuelve JSX (interfaz).

```
App (componente raíz)
├── Header
├── Main
│   ├── ArticleList
│   │   └── ArticleItem
│   └── Sidebar
└── Footer
```

- **Componente padre**: contiene y orquesta otros componentes.
- **Componente hijo**: recibe datos del padre mediante `props`.

### 2. JSX

JSX es una **extensión de sintaxis** que se parece al HTML dentro de JavaScript. Se transpila a llamadas `React.createElement()`.

```jsx
// JSX
const elemento = <h1 className="titulo">Hola React!</h1>;

// JavaScript puro equivalente
const elemento = React.createElement('h1', { className: 'titulo' }, 'Hola React!');
```

### 3. Props

Las **props** (propiedades) son datos que se pasan de un componente **padre** a un componente **hijo**. Son de **solo lectura** en el componente hijo.

```jsx
function Saludo({ nombre, edad }) {
  return <p>Hola {nombre}, tienes {edad} años.</p>;
}

// Uso
<Saludo nombre="Alicia" edad={30} />
```

### 4. State

El **state** representa los datos **internos y dinámicos** de un componente. Puede cambiar como resultado de la interacción del usuario o de una respuesta de API.

```jsx
const [isOpen, setIsOpen] = useState(false);
```

### 5. Flujo de datos unidireccional

En React, los datos fluyen **del padre al hijo**. Este modelo hace que el comportamiento de la aplicación sea más **predecible** y **fácil de depurar**.

```
Padre  →  (props)  →  Hijo
Hijo   →  (callback / evento)  →  Padre
```

---

## Hooks esenciales

| Hook | Función |
|---|---|
| `useState` | Gestionar estado local en un componente funcional |
| `useEffect` | Ejecutar efectos secundarios (API, temporizadores, suscripciones) |
| `useContext` | Acceder a un contexto global sin prop drilling |
| `useRef` | Referenciar un elemento DOM o un valor persistente |
| `useMemo` / `useCallback` | Optimizar el rendimiento memorizando valores y funciones |

---

## Ejemplo mínimo

Un contador interactivo que ilustra el uso de `useState`:

```jsx
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div className="contador">
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Incrementar</button>
      <button onClick={() => setCount(count - 1)}>- Decrementar</button>
      <button onClick={() => setCount(0)}>Reiniciar</button>
    </div>
  );
}

export default Contador;
```

---

## Buenas prácticas

- **Componentes pequeños**: cada componente debe tener una sola responsabilidad.
- **Nombres claros**: usa nombres descriptivos para componentes y variables.
- **Separación UI / lógica**: evita la lógica de negocio en los componentes de presentación.
- **Reutilización**: identifica y extrae partes comunes.
- **Pruebas**: agrega tests unitarios y de integración a medida que el proyecto crece.
- **Accesibilidad**: usa atributos ARIA y etiquetas HTML5 semánticas.

---

## Conclusión

React es una excelente puerta de entrada para construir interfaces modernas y robustas. Dominando **componentes**, **props**, **state** y **hooks**, puedes desarrollar aplicaciones escalables y profesionales.

**Recursos útiles:**
- [Documentación oficial de React](https://react.dev)
- [React en GitHub](https://github.com/facebook/react)

---

*Ver también: [README en français](./README.md)*
