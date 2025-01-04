import React, { useState } from "react";
import { Header } from "../../components/mainPage/header/header.jsx";
import { TaskInput } from "../../components/mainPage/taskInput/taskInput.jsx";
import TaskList from "../../components/mainPage/taskList/taskList.jsx";
import { NoTasks } from "../../components/mainPage/noTasks/noTasks.jsx";
import { Link } from "react-router-dom";
import { api } from "../../api/todo-api.js";
import { useEffect } from "react";
import { APIerrorsList } from "../../components/APIerrors/apiErrors.jsx";
import { LoadingSpinner } from "../../components/loadingSpinner/loadingSpinner.jsx";

export const TodoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggerParams, setLoggerParams] = useState({actionType: "", task: ""});

    const [APIerrors, setAPIErrors] = useState([]);

    async function fetchTasks() {
        const tasks = await api.getTasks(setAPIErrors);
        setTasks(tasks);
        return tasks;
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (taskText) => {
        const addedTask = await api.addTask(taskText, setAPIErrors);
        setLoggerParams({actionType: "added", task: addedTask});
        await fetchTasks();
    };

    const updateTask = async (taskId, newText) => {
        const updatedTask = await api.updateTask(taskId, newText, setAPIErrors);
        setLoggerParams({actionType: "updated", task: updatedTask});
        await fetchTasks();
    };

    const toggleDone = async (id) => {
        const toggledTask = await api.toggleCompleted(id, setAPIErrors);
        setLoggerParams({actionType: toggledTask.isCompleted ? "completed" : "uncompleted", task: toggledTask});
        await fetchTasks();
    };

    const deleteTask = async (id) => {
        const deletedTask = await api.deleteTask(id, setAPIErrors);
        setLoggerParams({actionType: "deleted", task: deletedTask});
        await fetchTasks();
    };

    const handleLogout = () => {
        setIsLoading(true);
        localStorage.removeItem("token");
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <main className="app-todo">
                        <div className="container">
                            <Header />
                            <TaskInput onAdd={addTask} btnText="Add task" />
                            {APIerrors.length > 0 && (
                                <APIerrorsList errors={APIerrors} />
                            )}
                            {tasks.length > 0 ? (
                                <TaskList
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleDone}
                                    onUpdate={updateTask}
                                    loggerParams={loggerParams}
                                />
                            ) : (
                                <NoTasks />
                            )}
                        </div>
                    </main>
                    <div className="navigation">
                        <p>Already have finished?</p>
                        <Link
                            className="link btn-task"
                            to="/login"
                            onClick={handleLogout}
                        >
                            Log out
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};
