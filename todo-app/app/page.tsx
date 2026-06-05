"use client";

import { useState, useEffect } from "react";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "completed";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-rose-100 text-rose-700 border-rose-200",
};

const PRIORITY_DOT: Record<Priority, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("todos-v1");
      if (stored) setTodos(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("todos-v1", JSON.stringify(todos));
  }, [todos, mounted]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: genId(), text, completed: false, priority, createdAt: Date.now() },
      ...prev,
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    const text = editText.trim();
    if (text) setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
    setEditId(null);
  };

  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">
            My Tasks
          </h1>
          <p className="text-slate-500 text-sm">
            {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
            {completedCount > 0 && ` · ${completedCount} completed`}
          </p>
        </div>

        {/* Add Todo */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-100 border border-violet-100 p-4 mb-6">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
            <button
              onClick={addTodo}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md shadow-violet-200"
            >
              Add
            </button>
          </div>
          {/* Priority selector */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-400 font-medium">Priority:</span>
            {(["low", "medium", "high"] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  priority === p
                    ? PRIORITY_COLORS[p] + " shadow-sm scale-105"
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1 mb-4 bg-white border border-slate-100 rounded-xl p-1 shadow-sm">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl mb-3">✓</div>
              <p className="text-sm">
                {filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "active"
                  ? "All done! Nothing left to do"
                  : "No tasks yet — add one above"}
              </p>
            </div>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center gap-3 bg-white rounded-xl px-4 py-3 border transition-all shadow-sm hover:shadow-md ${
                todo.completed ? "border-slate-100 opacity-60" : "border-slate-200"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-violet-600 border-violet-600"
                    : "border-slate-300 hover:border-violet-400"
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Text / Edit */}
              <div className="flex-1 min-w-0">
                {editId === todo.id ? (
                  <input
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    onBlur={() => saveEdit(todo.id)}
                    className="w-full px-2 py-0.5 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-800 text-sm"
                  />
                ) : (
                  <span
                    className={`text-sm block truncate ${
                      todo.completed ? "line-through text-slate-400" : "text-slate-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              {/* Priority badge */}
              <span className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${PRIORITY_COLORS[todo.priority]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[todo.priority]}`} />
                {todo.priority}
              </span>

              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => startEdit(todo)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        {completedCount > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearCompleted}
              className="text-xs text-slate-400 hover:text-rose-500 transition-colors"
            >
              Clear {completedCount} completed task{completedCount !== 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
