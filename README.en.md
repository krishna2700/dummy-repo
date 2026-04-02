# Introduction to React (in English)

## What is React?
React is a JavaScript library created to build user interfaces (UI) in a **modular**, **fast**, and **maintainable** way. It is primarily used to develop modern, component-based web applications.

## Why use React?
- **Reusable components**: break the interface into independent blocks.
- **Efficient rendering**: React updates the DOM in an optimized way.
- **Rich ecosystem**: tools, libraries, and a very active community.
- **Good maintainability**: clear architecture for applications that evolve over time.

## Key Concepts

### 1) Components
A component is a function (or class) that returns a piece of UI.

- **Parent component**: contains other components.
- **Child component**: receives data from the parent.

### 2) JSX
JSX is a syntax that looks like HTML inside JavaScript.

Example:
```jsx
const element = <h1>Hello React</h1>;
```

### 3) Props
**Props** are data passed from a parent component to a child component.
They are read-only within the child component.

### 4) State
**State** represents a component's internal data that can change over time (user interaction, API response, etc.).

### 5) Unidirectional Data Flow
In React, data flows primarily from parent to child. This model makes the application's behavior more predictable.

## Essential Hooks

### useState
Allows you to manage local state in a functional component.

### useEffect
Allows you to run side effects (API calls, subscriptions, timers, etc.) after rendering.

## Minimal Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

## Best Practices for Getting Started
- Keep components small and readable.
- Name components and variables clearly.
- Avoid heavy business logic in the UI.
- Factor out reusable parts.
- Add tests as the project grows.

## Conclusion
React is an excellent starting point for building modern and robust interfaces. By mastering components, props, state, and hooks, you can develop scalable and professional applications.
