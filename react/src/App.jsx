// Stage 3: Task Completion Toggle

"use client";
import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priority, setPriority] = useState("normal");

  const priorityOrder = { high: 1, normal: 2, low: 3 };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        priority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const handleToggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => handleSortTasks("name")}>Sort by Name</button>
      <button onClick={() => handleSortTasks("priority")}>Sort by Priority</button>
      
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <div>
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
