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
    storedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
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

  const handleSortTasks = (criterion) => {
    let sortedTasks = [...tasks];
    if (criterion === "name") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criterion === "priority") {
      sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    setTasks(sortedTasks);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-pink-500 p-8 gap-8 overflow-hidden">
      <header className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg animate-pulse">
        Task Manager
      </header>

      <div className="flex relative w-full max-w-xl mt-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-3xl bg-white shadow-xl text-black text-lg font-semibold placeholder-gray-600 focus:ring-4 focus:ring-indigo-500 transition-all transform hover:scale-105"
        />

        <div className="flex space-x-3 absolute right-3 top-3">
          <button
            onClick={() => handleSortTasks("name")}
            className="text-white bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-2 rounded-full hover:bg-gradient-to-r hover:from-yellow-500 hover:to-teal-500 transition-all transform hover:scale-110"
            aria-label="Sort by Name"
          >
            Sort by Name
          </button>
          <button
            onClick={() => handleSortTasks("priority")}
            className="text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 transition-all transform hover:scale-110"
            aria-label="Sort by Priority"
          >
            Sort by Priority
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-xl">
        <input
          type="text"
          placeholder="Task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="p-4 rounded-2xl border-2 border-white bg-gradient-to-r from-purple-400 to-indigo-600 text-white text-lg font-semibold w-full focus:ring-4 focus:ring-indigo-500 placeholder-gray-700 transition-all transform hover:scale-105"
        />
        <textarea
          placeholder="Task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="p-4 rounded-2xl border-2 border-white bg-gradient-to-r placeholder-gray-700 from-teal-400 to-cyan-600 text-white text-lg font-semibold w-full focus:ring-4 focus:ring-cyan-500 transition-all transform hover:scale-105"
        />
        <div className="flex items-center gap-4 w-full">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-4 rounded-xl border-2 border-white bg-gradient-to-r from-teal-400 to-cyan-600 text-black text-lg font-semibold w-1/2 focus:ring-4 focus:ring-cyan-500 transition-all transform hover:scale-105"
          >
            <option value="low">Low Priority</option>
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-4 rounded-3xl font-semibold shadow-xl w-1/2 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-all transform hover:scale-105"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl space-y-6 mt-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex flex-col justify-between items-start p-5 rounded-3xl shadow-2xl transition-all transform hover:scale-105 ${
              task.completed
                ? "text-gray-500 line-through"
                : task.priority === "low"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                : task.priority === "normal"
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                : "bg-gradient-to-r from-black to-gray-700 text-white"
            }`}
          >
            <div className="flex items-center gap-6 w-full">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
                className="form-checkbox text-lg text-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <h3 className="text-2xl font-bold">{task.title}</h3>
            </div>
            <p className="text-lg mt-2">{task.description}</p>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-white bg-red-500 p-2 rounded-full mt-4 self-end hover:bg-red-600 transition-all transform hover:scale-110"
              aria-label="Delete Task"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
