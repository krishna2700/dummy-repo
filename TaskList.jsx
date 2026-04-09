import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskList = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error('Failed to load tasks:', e);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Listen for task updates from other tabs
  useEffect(() => {
    const handleTaskUpdate = (e) => {
      if (e.key === 'tasks' && e.newValue) {
        try {
          setTasks(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to sync tasks:', err);
        }
      }
    };

    window.addEventListener('storage', handleTaskUpdate);
    return () => window.removeEventListener('storage', handleTaskUpdate);
  }, []);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please log in to view your tasks.</p>
      </div>
    );
  }

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1>Task List</h1>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, {user.name}!</span>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center' }}>
            No tasks yet. Add one to get started!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#999' : '#333',
                    }}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#1565c0',
        }}
      >
        <strong>Multi-Tab Support:</strong> Your login status and tasks are
        synced across all tabs. Log out in one tab and you'll be logged out
        everywhere.
      </div>
    </div>
  );
};

export default TaskList;
