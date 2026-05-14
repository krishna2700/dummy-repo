// App.jsx — React Concepts Demonstration
// This file accompanies the README.md to show React in practice.

import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// 1. FUNCTIONAL COMPONENT — simplest building block
// ─────────────────────────────────────────────
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// ─────────────────────────────────────────────
// 2. PROPS — passing data from parent → child
// ─────────────────────────────────────────────
function UserCard({ username, role, avatarUrl }) {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt={`${username} avatar`} width={64} height={64} />
      <div>
        <strong>{username}</strong>
        <p>{role}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. STATE — useState hook
// ─────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. LISTS & KEYS — rendering arrays
// ─────────────────────────────────────────────
const FRAMEWORKS = [
  { id: 1, name: "React", creator: "Meta" },
  { id: 2, name: "Vue", creator: "Evan You" },
  { id: 3, name: "Angular", creator: "Google" },
  { id: 4, name: "Svelte", creator: "Rich Harris" },
];

function FrameworkList() {
  return (
    <ul>
      {FRAMEWORKS.map((fw) => (
        <li key={fw.id}>
          <strong>{fw.name}</strong> — by {fw.creator}
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────
// 5. CONDITIONAL RENDERING
// ─────────────────────────────────────────────
function StatusBadge({ isOnline }) {
  return (
    <span style={{ color: isOnline ? "green" : "red" }}>
      {isOnline ? "● Online" : "● Offline"}
    </span>
  );
}

// ─────────────────────────────────────────────
// 6. FORMS & CONTROLLED COMPONENTS
// ─────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return <p>Thanks, {form.name}! We'll be in touch at {form.email}.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

// ─────────────────────────────────────────────
// 7. useEffect — side-effects & lifecycle
// ─────────────────────────────────────────────
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // do nothing when paused

    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    // Cleanup: clear interval when component unmounts or running → false
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <h2>Stopwatch: {seconds}s</h2>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>
        Reset
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// 8. useRef — accessing DOM nodes directly
// ─────────────────────────────────────────────
function FocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Type here…" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// 9. LIFTING STATE UP — shared state between siblings
// ─────────────────────────────────────────────
function TemperatureInput({ scale, value, onChange }) {
  const label = scale === "C" ? "Celsius" : "Fahrenheit";
  return (
    <label>
      {label}:{" "}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");

  const fahrenheit = celsius !== "" ? (celsius * 9) / 5 + 32 : "";

  return (
    <div>
      <TemperatureInput scale="C" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        scale="F"
        value={fahrenheit}
        onChange={(f) => setCelsius(((f - 32) * 5) / 9)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 10. ROOT APP — composes all components
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <header>
        <h1>React Concepts — Live Demo</h1>
        <p>
          Every section below maps directly to a topic in the{" "}
          <a href="README.md">README</a>.
        </p>
      </header>

      <section>
        <h2>1. Functional Component &amp; Props</h2>
        <Greeting name="World" />
        <UserCard
          username="krishna2700"
          role="Frontend Developer"
          avatarUrl="https://avatars.githubusercontent.com/u/krishna2700"
        />
      </section>

      <section>
        <h2>2. State — useState</h2>
        <Counter />
      </section>

      <section>
        <h2>3. Lists &amp; Keys</h2>
        <FrameworkList />
      </section>

      <section>
        <h2>4. Conditional Rendering</h2>
        <StatusBadge isOnline={true} />
        &nbsp;|&nbsp;
        <StatusBadge isOnline={false} />
      </section>

      <section>
        <h2>5. Forms &amp; Controlled Components</h2>
        <ContactForm />
      </section>

      <section>
        <h2>6. useEffect — Stopwatch</h2>
        <Timer />
      </section>

      <section>
        <h2>7. useRef — DOM Access</h2>
        <FocusInput />
      </section>

      <section>
        <h2>8. Lifting State Up — Temperature Converter</h2>
        <TemperatureConverter />
      </section>

      <footer>
        <p>Built with React. See README.md for explanations of each concept.</p>
      </footer>
    </div>
  );
}
