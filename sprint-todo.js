// ─── Sprint Todo — Application Logic ────────────────────────────────────────
// Requires data.js to be loaded first (via <script> or require).

const SprintTodo = (() => {
  // ── Internal mutable state ────────────────────────────────────────────────
  let _currentSprintId = null;
  let _tasks           = [];  // working copy so we don't mutate TODOS
  let _filters         = { assigneeId: null, priority: null, label: null, search: "" };
  let _listeners       = [];  // onChange subscribers

  // ── Private helpers ───────────────────────────────────────────────────────
  function _clone(obj)      { return JSON.parse(JSON.stringify(obj)); }
  function _notify(payload) { _listeners.forEach(fn => fn(payload)); }

  function _applyFilters(tasks) {
    return tasks.filter(t => {
      if (_filters.assigneeId && t.assigneeId !== _filters.assigneeId) return false;
      if (_filters.priority   && t.priority   !== _filters.priority)   return false;
      if (_filters.label      && t.label      !== _filters.label)      return false;
      if (_filters.search) {
        const q = _filters.search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    // Initialise with a sprint (defaults to active sprint)
    init(sprintId) {
      _currentSprintId = sprintId || (getActiveSprint() || {}).id || SPRINTS[0].id;
      _tasks = _clone(getTodosBySprintId(_currentSprintId));
      _notify({ type: "INIT", sprintId: _currentSprintId });
    },

    // Switch to a different sprint
    setSprint(sprintId) {
      _currentSprintId = sprintId;
      _tasks = _clone(getTodosBySprintId(sprintId));
      this.clearFilters();
      _notify({ type: "SPRINT_CHANGED", sprintId });
    },

    getCurrentSprint() { return getSprintById(_currentSprintId); },

    // Filtered tasks grouped by kanban column
    getBoard() {
      const visible  = _applyFilters(_tasks);
      const columns  = ["todo", "in-progress", "review", "done"];
      const board    = {};
      columns.forEach(col => { board[col] = []; });
      visible.forEach(t => {
        if (board[t.status] !== undefined) board[t.status].push(t);
        else board["todo"].push(t);
      });
      return board;
    },

    // All tasks (unfiltered) for the current sprint
    getAllTasks() { return _clone(_tasks); },

    // Move a task to a new status column
    moveTask(taskId, newStatus) {
      const VALID = ["todo", "in-progress", "review", "done"];
      if (!VALID.includes(newStatus)) throw new Error(`Invalid status: ${newStatus}`);
      const task = _tasks.find(t => t.id === taskId);
      if (!task) throw new Error(`Task not found: ${taskId}`);
      const old = task.status;
      task.status = newStatus;
      _notify({ type: "TASK_MOVED", taskId, from: old, to: newStatus });
      return _clone(task);
    },

    // Re-assign a task
    reassignTask(taskId, assigneeId) {
      const member = getMemberById(assigneeId);
      if (!member) throw new Error(`Member not found: ${assigneeId}`);
      const task = _tasks.find(t => t.id === taskId);
      if (!task) throw new Error(`Task not found: ${taskId}`);
      task.assigneeId = assigneeId;
      _notify({ type: "TASK_REASSIGNED", taskId, assigneeId });
      return _clone(task);
    },

    // Update priority
    setPriority(taskId, priority) {
      if (!PRIORITIES.includes(priority)) throw new Error(`Invalid priority: ${priority}`);
      const task = _tasks.find(t => t.id === taskId);
      if (!task) throw new Error(`Task not found: ${taskId}`);
      task.priority = priority;
      _notify({ type: "PRIORITY_CHANGED", taskId, priority });
      return _clone(task);
    },

    // Add a brand-new task to the current sprint
    addTask({ title, description = "", priority = "medium", label = "feature",
              assigneeId = null, storyPoints = 1 }) {
      if (!title || !title.trim()) throw new Error("Task title is required.");
      const newTask = {
        id: `t-${Date.now()}`,
        sprintId: _currentSprintId,
        title: title.trim(),
        description,
        priority,
        label,
        assigneeId: assigneeId || TEAM_MEMBERS[0].id,
        status: "todo",
        storyPoints,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      _tasks.push(newTask);
      _notify({ type: "TASK_ADDED", task: _clone(newTask) });
      return _clone(newTask);
    },

    // Delete a task
    deleteTask(taskId) {
      const idx = _tasks.findIndex(t => t.id === taskId);
      if (idx === -1) throw new Error(`Task not found: ${taskId}`);
      const [removed] = _tasks.splice(idx, 1);
      _notify({ type: "TASK_DELETED", taskId, task: removed });
    },

    // Filters
    setFilter(key, value) {
      _filters[key] = value || null;
      _notify({ type: "FILTER_CHANGED", filters: { ..._filters } });
    },
    setSearch(q) {
      _filters.search = q;
      _notify({ type: "FILTER_CHANGED", filters: { ..._filters } });
    },
    clearFilters() {
      _filters = { assigneeId: null, priority: null, label: null, search: "" };
      _notify({ type: "FILTER_CLEARED" });
    },
    getFilters() { return { ..._filters }; },

    // Sprint-level statistics (live, includes filter-independent totals)
    getStats() { return getSprintStats(_currentSprintId); },

    // Member helpers
    getMembers()           { return _clone(TEAM_MEMBERS); },
    getMember(id)          { return _clone(getMemberById(id)) || null; },
    getAllSprints()         { return _clone(SPRINTS); },

    // Subscribe to state changes
    onChange(fn) {
      _listeners.push(fn);
      return () => { _listeners = _listeners.filter(l => l !== fn); }; // unsubscribe
    },
  };
})();
