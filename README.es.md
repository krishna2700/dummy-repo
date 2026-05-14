# Introducción a React (en español)

## ¿Qué es React?

React es una biblioteca de JavaScript creada por Meta para construir interfaces de usuario (UI) de forma **modular**, **rápida** y **mantenible**. Se utiliza principalmente para desarrollar aplicaciones web modernas basadas en componentes reutilizables.

## ¿Por qué usar React?

- **Componentes reutilizables**: divide la interfaz en bloques independientes y fáciles de mantener.
- **Renderizado eficiente**: React actualiza el DOM de forma optimizada mediante su DOM virtual.
- **Ecosistema rico**: herramientas, bibliotecas y una comunidad muy activa.
- **Buena mantenibilidad**: arquitectura clara para aplicaciones que evolucionan con el tiempo.
- **Gran demanda laboral**: una de las tecnologías frontend más solicitadas en el mercado.

## Conceptos clave

### 1) Los componentes

Un componente es una función (o clase) que devuelve una interfaz. Los componentes son los bloques básicos de toda aplicación React.

- **Componente padre**: contiene y coordina otros componentes.
- **Componente hijo**: recibe datos del padre a través de las props.

```jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>;
}
```

### 2) JSX

JSX es una extensión de sintaxis que permite escribir HTML dentro de JavaScript. El compilador lo transforma en llamadas a `React.createElement()`.

```jsx
const elemento = <h1>Hola React</h1>;
```

### 3) Props

Las **props** (propiedades) son datos que se pasan de un componente padre a un componente hijo. Son de solo lectura dentro del componente hijo, lo que garantiza un flujo de datos predecible.

```jsx
function Tarjeta({ titulo, descripcion }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
}
```

### 4) State

El **state** representa los datos internos de un componente que pueden cambiar con el tiempo, por ejemplo, como respuesta a interacciones del usuario o llamadas a una API.

### 5) Flujo de datos unidireccional

En React, los datos fluyen principalmente del padre al hijo. Este modelo hace que el comportamiento de la aplicación sea más predecible y fácil de depurar.

## Hooks esenciales

### useState

Permite gestionar un estado local en un componente funcional.

```jsx
const [contador, setContador] = useState(0);
```

### useEffect

Permite ejecutar efectos secundarios (llamadas a la API, suscripciones, temporizadores, etc.) después del renderizado del componente.

```jsx
useEffect(() => {
  document.title = `Contador: ${contador}`;
}, [contador]);
```

### useContext

Permite acceder a un contexto global sin necesidad de pasar props manualmente por cada nivel del árbol de componentes.

```jsx
const tema = useContext(TemaContexto);
```

## Ejemplo completo: Contador

```jsx
import { useState, useEffect } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Contador: ${count}`;
  }, [count]);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
      <button onClick={() => setCount(0)}>Reiniciar</button>
    </div>
  );
}

export default Contador;
```

## Instalación y primeros pasos

```bash
# Crear un nuevo proyecto con Vite (recomendado)
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev

# O con Create React App (alternativa clásica)
npx create-react-app mi-app
cd mi-app
npm start
```

## Buenas prácticas

- Mantener los componentes pequeños y con una sola responsabilidad.
- Nombrar claramente los componentes (PascalCase) y las variables (camelCase).
- Evitar lógica de negocio pesada dentro de los componentes de la UI.
- Reutilizar los fragmentos de código que se repiten.
- Agregar pruebas unitarias a medida que el proyecto crece.
- Organizar el proyecto en carpetas por funcionalidad o por tipo de archivo.

## Recursos oficiales

- [Documentación oficial de React](https://react.dev/)
- [Tutorial oficial](https://react.dev/learn)
- [Referencia de la API](https://react.dev/reference/react)

## Conclusión

React es una excelente puerta de entrada para construir interfaces modernas y robustas. Dominando componentes, props, state y hooks, puedes desarrollar aplicaciones escalables y profesionales con una experiencia de usuario excepcional.
