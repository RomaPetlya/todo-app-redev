import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/mainPage/header/header.jsx";
import { TaskInput } from "../../components/mainPage/taskInput/taskInput.jsx";
import TaskList from "../../components/mainPage/taskList/taskList.jsx";
import { NoTasks } from "../../components/mainPage/noTasks/noTasks.jsx";
import { Link } from "react-router-dom";
import { api } from "../../api/todo-api.js";
import { useEffect } from "react";
import { APIerrorsList } from "../../components/APIerrors/apiErrors.jsx";

export const TodoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [actionType, setActionType] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [APIerrors, setAPIErrors] = useState([]);

    async function fetchTasks() {
        const tasks = await api.getTasks(setAPIErrors);
        setTasks(tasks);
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (taskText) => {
        await api.addTask(taskText, setAPIErrors);
        fetchTasks();
    };

    const updateTask = async (taskId, newText) => {
        await api.updateTask(taskId, newText, setAPIErrors);
        fetchTasks();
    };

    const toggleDone = async (id) => {
        await api.toggleCompleted(id, setAPIErrors)
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await api.deleteTask(id, setAPIErrors);
        fetchTasks();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <main className="app-todo">
                <div className="container">
                    <Header />
                    <TaskInput onAdd={addTask} btnText="Add task" />
                    {APIerrors.length > 0 && <APIerrorsList errors={APIerrors} />}
                    {tasks.length > 0 ? (
                        <TaskList
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
            <div className="navigation">
                <p>Already have finished?</p>
            <Link className="link btn-task" to="/login" onClick={handleLogout}>
                Log out
            </Link>
            </div>
        </>
    );
};
