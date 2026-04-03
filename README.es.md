# Introducción a React (en español)

## ¿Qué es React?
React es una biblioteca de JavaScript creada para construir interfaces de usuario (UI) de forma **modular**, **rápida** y **mantenible**. Se utiliza principalmente para desarrollar aplicaciones web modernas basadas en componentes.

## ¿Por qué usar React?
- **Componentes reutilizables**: divide la interfaz en bloques independientes.
- **Renderizado eficiente**: React actualiza el DOM de forma optimizada.
- **Ecosistema rico**: herramientas, bibliotecas y una comunidad muy activa.
- sasash
- sahsajhsjkas
- sakhskjas
- **Buena mantenibilidad**: arquitectura clara para aplicaciones que evolucionan.

## Conceptos clave

### 1) Los componentes
Un componente es una función (o clase) que devuelve una interfaz.
sasjajksh
- **Componente padre**: contiene otros componentes.
- **Componente hijo**: recibe datos del padre.

### 2) JSX
JSX es una sintaxis que se parece al HTML dentro de JavaScript.sasnajsjahs
asbjahsjas

Ejemplo:
```jsx
const elemento = <h1>Hola React</h1>;
```

### 3) Props
Las **props** son datos que se pasan de un componente padre a un componente hijo.
Son de solo lectura dentro del componente hijo.

### 4) State
El **state** representa los datos internos de un componente que pueden cambiar con el tiempo (interacción del usuario, respuesta de una API, etc.).

### 5) Flujo de datos unidireccional
En React, los datos fluyen principalmente del padre al hijo. Este modelo hace que el comportamiento de la aplicación sea más predecible.

## Hooks esenciales

### useState
Permite gestionar un estado local en un componente funcional.

### useEffect
Permite ejecutar efectos secundarios (llamadas a la API, suscripciones, temporizadores, etc.) después del renderizado.

## Ejemplo mínimo

```jsx
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;
```

## Buenas prácticas para empezar
- Mantener los componentes pequeños y legibles.
- Nombrar claramente los componentes y las variables.
- Evitar lógica de negocio pesada en la UI.
- Reutilizar las partes repetibles.
- Agregar pruebas a medida que el proyecto crece.

## Conclusión
React es una excelente puerta de entrada para construir interfaces modernas y robustas. Dominando componentes, props, state y hooks, puedes desarrollar aplicaciones escalables y profesionales.
