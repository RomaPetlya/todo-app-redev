import React from "react";
import Task from "../task/task.jsx";
import "./taskList.css"
import { WithLogger } from "../../withLogger/withLogger.jsx";

const TaskList = ({ tasks, onDelete, onToggle, onUpdate }) => {
    return (
        <>
            <div className="tasks">
                {tasks.map((task) => {
                    return (
                        <Task key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle}/>
                    );
                })}
            </div>
        </>
    );
};

export default WithLogger(TaskList)