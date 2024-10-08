import React, { useState } from "react";
import "./App.css";
import { TaskInput } from "./components/todo/task-input/taskInput.jsx";
import Tasks from "./components/todo/tasks/tasks.jsx";
import { NoTasks } from "./components/todo/noTasks/noTasks.jsx";
import { Header } from "./components/todo/header/header.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [tasks, setTasks] = useState([
        { id: uuidv4(), text: "lala", isDone: false },
        { id: uuidv4(), text: "dadada", isDone: false },
    ]);
    const [actionType, setActionType] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const addTask = (taskText) => {
        const newTask = { id: uuidv4(), text: taskText, isDone: false };
        setTasks([...tasks, newTask]);
        setSelectedTask(newTask);
        setActionType("added");
    };

    const updateTask = (taskId, newText) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, text: newText } : task
        );
        setTasks(updatedTasks);
        setSelectedTask(updatedTasks.find((task) => task.id === taskId));
        setActionType("updated");
    };

    const toggleDone = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        setTasks(updatedTasks);
        const taskToLog = updatedTasks.find((task) => task.id === id);
        setSelectedTask(taskToLog);
        taskToLog.isDone ? setActionType("done") : setActionType("undone");
    };

    const deleteTask = (id) => {
        const taskToDelete = tasks.find((task) => task.id === id);
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask(taskToDelete);
        setActionType("deleted");
    };

    return (
        <>
            <main className="app-todo">
                <div className="container">
                    <Header />
                    <TaskInput onAdd={addTask} btnText="Add task" />
                    {tasks.length > 0 ? (
                        <Tasks
                            tasks={tasks}
                            onDelete={deleteTask}
                            onToggle={toggleDone}
                            onUpdate={updateTask}
                            actionType={actionType}
                            selectedTask={selectedTask}
                        />
                    ) : (
                        <NoTasks />
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
