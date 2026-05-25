"use client";

import { useState, useEffect, useRef } from "react";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "completed";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; dot: string }> = {
  high:   { label: "High",   color: "text-rose-500",   dot: "bg-rose-500"   },
  medium: { label: "Medium", color: "text-amber-500",  dot: "bg-amber-500"  },
  low:    { label: "Low",    color: "text-emerald-500", dot: "bg-emerald-500" },
};

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("todos-v1");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("todos-v1", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false, priority, createdAt: Date.now() },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    const trimmed = editText.trim();
    if (trimmed) {
      setTodos(prev => prev.map(t => t.id === id ? { ...t, text: trimmed } : t));
    }
    setEditingId(null);
  };

  const filtered = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">
          My<span className="text-indigo-400">Tasks</span>
        </h1>
        <p className="text-slate-400 text-sm">
          {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
          {completedCount > 0 && ` · ${completedCount} completed`}
        </p>
      </div>

      {/* Input Card */}
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl mb-6">
        <div className="flex gap-3 mb-3">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            className="flex-1 bg-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold rounded-xl px-5 py-3 transition-all text-sm"
          >
            Add
          </button>
        </div>

        {/* Priority Selector */}
        <div className="flex gap-2">
          {(["low", "medium", "high"] as Priority[]).map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                priority === p
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/10 text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_CONFIG[p].dot}`} />
              {PRIORITY_CONFIG[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-xl flex gap-1 mb-4 bg-white/5 border border-white/10 rounded-xl p-1">
        {(["all", "active", "completed"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 text-xs font-semibold py-2 rounded-lg capitalize transition-all ${
              filter === f
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="w-full max-w-xl flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-12 text-sm">
            {filter === "completed" ? "No completed tasks yet." : "Nothing to do — enjoy your day!"}
          </div>
        )}

        {filtered.map(todo => {
          // Color scheme per status:
          // completed  → green tint (emerald)
          // high priority pending → red/rose tint (urgent/remaining)
          // medium priority pending → amber tint
          // low priority pending → indigo/blue tint
          const cardStyle = todo.completed
            ? "bg-emerald-900/30 border-emerald-700/40 hover:bg-emerald-900/40"
            : todo.priority === "high"
            ? "bg-rose-900/30 border-rose-600/40 hover:bg-rose-900/45"
            : todo.priority === "medium"
            ? "bg-amber-900/25 border-amber-600/35 hover:bg-amber-900/35"
            : "bg-indigo-900/25 border-indigo-600/30 hover:bg-indigo-900/35";

          const statusBadge = todo.completed
            ? { label: "Done", cls: "bg-emerald-500/20 text-emerald-300 border border-emerald-600/40" }
            : todo.priority === "high"
            ? { label: "Urgent", cls: "bg-rose-500/20 text-rose-300 border border-rose-600/40" }
            : todo.priority === "medium"
            ? { label: "Pending", cls: "bg-amber-500/20 text-amber-300 border border-amber-600/40" }
            : { label: "Remaining", cls: "bg-indigo-500/20 text-indigo-300 border border-indigo-600/40" };

          return (
          <div
            key={todo.id}
            className={`group flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-all ${cardStyle}`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                todo.completed
                  ? "bg-emerald-500 border-emerald-500"
                  : todo.priority === "high"
                  ? "border-rose-500 hover:border-rose-400"
                  : todo.priority === "medium"
                  ? "border-amber-500 hover:border-amber-400"
                  : "border-indigo-500 hover:border-indigo-400"
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Text / Edit */}
            {editingId === todo.id ? (
              <input
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") saveEdit(todo.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                onBlur={() => saveEdit(todo.id)}
                className="flex-1 bg-white/10 text-white rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            ) : (
              <span
                onDoubleClick={() => startEdit(todo)}
                className={`flex-1 text-sm select-none cursor-default ${
                  todo.completed
                    ? "line-through text-emerald-400/70"
                    : todo.priority === "high"
                    ? "text-rose-100"
                    : todo.priority === "medium"
                    ? "text-amber-100"
                    : "text-indigo-100"
                }`}
              >
                {todo.text}
              </span>
            )}

            {/* Status Badge */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>

            {/* Priority Dot */}
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIORITY_CONFIG[todo.priority].dot}`} title={PRIORITY_CONFIG[todo.priority].label} />

            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(todo)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                title="Edit"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3.536 3.536-6 6H9v-3.536z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Delete"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      {completedCount > 0 && (
        <div className="w-full max-w-xl mt-4 flex justify-end">
          <button
            onClick={clearCompleted}
            className="text-xs text-slate-500 hover:text-rose-400 transition"
          >
            Clear {completedCount} completed
          </button>
        </div>
      )}

      {/* Stats Bar */}
      {todos.length > 0 && (
        <div className="w-full max-w-xl mt-6 grid grid-cols-3 gap-3">
          <div className="bg-indigo-900/30 border border-indigo-600/30 rounded-xl py-3 text-center">
            <div className="text-2xl font-bold text-indigo-200">{todos.length}</div>
            <div className="text-xs text-indigo-400 mt-0.5">Total</div>
          </div>
          <div className="bg-amber-900/25 border border-amber-600/35 rounded-xl py-3 text-center">
            <div className="text-2xl font-bold text-amber-200">{activeCount}</div>
            <div className="text-xs text-amber-400 mt-0.5">Remaining</div>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl py-3 text-center">
            <div className="text-2xl font-bold text-emerald-200">{completedCount}</div>
            <div className="text-xs text-emerald-400 mt-0.5">Done</div>
          </div>
        </div>
      )}
    </div>
  );
}
