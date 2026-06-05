import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Counter</h1>

      <div style={styles.display}>
        <span style={{ ...styles.value, color: count < 0 ? "#e74c3c" : count > 0 ? "#2ecc71" : "#ecf0f1" }}>
          {count}
        </span>
      </div>

      <div style={styles.buttonGroup}>
        <button style={{ ...styles.button, ...styles.decrementBtn }} onClick={decrement}>
          −
        </button>
        <button style={{ ...styles.button, ...styles.resetBtn }} onClick={reset}>
          Reset
        </button>
        <button style={{ ...styles.button, ...styles.incrementBtn }} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a2e",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#ecf0f1",
    marginBottom: "2rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  display: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    backgroundColor: "#16213e",
    border: "4px solid #0f3460",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  value: {
    fontSize: "4rem",
    fontWeight: "700",
    transition: "color 0.3s ease",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  button: {
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.4rem",
    fontWeight: "700",
    padding: "0.75rem 1.5rem",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
  },
  decrementBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    minWidth: "60px",
  },
  resetBtn: {
    backgroundColor: "#0f3460",
    color: "#ecf0f1",
    fontSize: "1rem",
    padding: "0.75rem 1.25rem",
  },
  incrementBtn: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    minWidth: "60px",
  },
};

export default Counter;
