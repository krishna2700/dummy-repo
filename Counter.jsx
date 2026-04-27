import React from "react";
import { useCounter } from "usehooks-ts";
import { useToggle } from "usehooks-ts";
import { useLocalStorage } from "usehooks-ts";
import { useEventListener } from "usehooks-ts";

/**
 * Counter component using hooks from `usehooks-ts`:
 *
 *  - useCounter      → manages count with built-in increment / decrement / reset / set
 *  - useToggle       → toggles the "dark / light" theme
 *  - useLocalStorage → persists the step size across page refreshes
 *  - useEventListener → increments / decrements counter via keyboard (ArrowUp / ArrowDown)
 */

const Counter = () => {
  // ── usehooks-ts: useCounter ────────────────────────────────────────────────
  // Gives us count + helpers (increment, decrement, reset, set) out of the box.
  const { count, increment, decrement, reset, set } = useCounter(0);

  // ── usehooks-ts: useLocalStorage ──────────────────────────────────────────
  // Persists the step size so it survives a page refresh.
  const [step, setStep] = useLocalStorage("counter-step", 1);

  // ── usehooks-ts: useToggle ─────────────────────────────────────────────────
  // Toggles between dark and light themes with a single call.
  const [isDark, toggleTheme] = useToggle(true);

  // ── usehooks-ts: useEventListener ─────────────────────────────────────────
  // Binds keyboard arrow-key events without manual add/removeEventListener.
  useEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") increment();
    else if (e.key === "ArrowDown") decrement();
    else if (e.key === "r" || e.key === "R") reset();
  });

  // Custom step-aware increment / decrement (wraps useCounter.set)
  const incrementByStep = () => set(count + step);
  const decrementByStep = () => set(count - step);

  // ── Derived values ─────────────────────────────────────────────────────────
  const valueColor =
    count > 0 ? "#2ecc71" : count < 0 ? "#e74c3c" : isDark ? "#ecf0f1" : "#2c3e50";

  // ── Theme styles ───────────────────────────────────────────────────────────
  const theme = {
    bg: isDark ? "#1a1a2e" : "#f0f4f8",
    card: isDark ? "#16213e" : "#ffffff",
    border: isDark ? "#0f3460" : "#cbd5e0",
    text: isDark ? "#ecf0f1" : "#2c3e50",
    muted: isDark ? "#a0aec0" : "#718096",
    shadow: isDark
      ? "0 8px 32px rgba(0,0,0,0.5)"
      : "0 8px 32px rgba(0,0,0,0.12)",
  };

  return (
    <div style={{ ...styles.page, backgroundColor: theme.bg }}>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          ...styles.card,
          backgroundColor: theme.card,
          border: `2px solid ${theme.border}`,
          boxShadow: theme.shadow,
        }}
      >
        {/* Header */}
        <div style={styles.header}>
          <h1 style={{ ...styles.title, color: theme.text }}>Counter</h1>
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{ ...styles.themeBtn, color: theme.muted, borderColor: theme.border }}
          >
            {isDark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>

        {/* Hint */}
        <p style={{ ...styles.hint, color: theme.muted }}>
          ↑ / ↓ arrow keys • R to reset
        </p>

        {/* Count display */}
        <div
          style={{
            ...styles.display,
            backgroundColor: isDark ? "#0d1b2a" : "#edf2f7",
            border: `3px solid ${theme.border}`,
          }}
        >
          <span style={{ ...styles.value, color: valueColor }}>{count}</span>
        </div>

        {/* Step control */}
        <div style={styles.stepRow}>
          <label style={{ ...styles.stepLabel, color: theme.muted }}>
            Step:
          </label>
          <input
            type="number"
            min={1}
            value={step}
            onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
            style={{
              ...styles.stepInput,
              backgroundColor: isDark ? "#0d1b2a" : "#edf2f7",
              color: theme.text,
              borderColor: theme.border,
            }}
          />
        </div>

        {/* Main buttons */}
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, backgroundColor: "#e74c3c", color: "#fff" }}
            onClick={decrementByStep}
            title={`−${step}`}
          >
            − {step}
          </button>

          <button
            style={{
              ...styles.button,
              backgroundColor: isDark ? "#0f3460" : "#e2e8f0",
              color: theme.text,
              fontSize: "0.9rem",
            }}
            onClick={reset}
          >
            Reset
          </button>

          <button
            style={{ ...styles.button, backgroundColor: "#2ecc71", color: "#fff" }}
            onClick={incrementByStep}
            title={`+${step}`}
          >
            + {step}
          </button>
        </div>

        {/* Footer note */}
        <p style={{ ...styles.footer, color: theme.muted }}>
          Step is saved via <code>useLocalStorage</code> and survives refresh.
        </p>
      </div>
    </div>
  );
};

/* ── Static styles ──────────────────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: "background-color 0.3s ease",
  },
  card: {
    borderRadius: "20px",
    padding: "2.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.25rem",
    width: "340px",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: 0,
  },
  themeBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: "20px",
    padding: "0.3rem 0.75rem",
    cursor: "pointer",
    fontSize: "0.78rem",
    fontWeight: "600",
    transition: "opacity 0.2s",
  },
  hint: {
    fontSize: "0.75rem",
    margin: 0,
    letterSpacing: "0.05em",
  },
  display: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-color 0.3s ease",
  },
  value: {
    fontSize: "3.8rem",
    fontWeight: "800",
    transition: "color 0.3s ease",
    lineHeight: 1,
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  stepLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  stepInput: {
    width: "64px",
    padding: "0.35rem 0.5rem",
    borderRadius: "8px",
    border: "1px solid",
    fontSize: "0.9rem",
    textAlign: "center",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "700",
    padding: "0.7rem 1.2rem",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
    minWidth: "72px",
  },
  footer: {
    fontSize: "0.72rem",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.5,
  },
};

export default Counter;
