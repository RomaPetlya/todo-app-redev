import React, { useState } from "react";
import "./App.css";
import { TaskInput } from "./components/todo/task-form/taskInput.jsx";
import { Tasks } from "./components/todo/tasks/tasks.jsx";
import { NoTasks } from "./components/todo/noTasks/noTasks.jsx";
import { Header } from "./components/todo/header/header.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [tasks, setTasks] = useState([
        { id: uuidv4(), text: "lala", isDone: false },
        { id: uuidv4(), text: "dadada", isDone: false },
    ]);

    const addTask = (taskText) => {
        setTasks([...tasks, { id: uuidv4(), text: taskText, isDone: false }]);
    };

    const updateTask = (taskId, newText) => {
        const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task));
        setTasks(updatedTasks);
    };

    const toggleDone = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, isDone: !task.isDone } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <>
            <main className="app-todo">
                <div className="container">
                    <Header/>
                    <TaskInput onAdd={addTask} btnText="Add task" />
                    {tasks.length > 0 ? (
                        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleDone} onUpdate={updateTask}/>
                    ) : (
                        <NoTasks/>
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
