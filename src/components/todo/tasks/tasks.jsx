import React from "react";
import Task from "../task/task";
import "./tasks.css"
import { WithLogger } from "../../withLogger/withLogger";

const Tasks = ({ tasks, onDelete, onToggle, onUpdate }) => {
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

export default WithLogger(Tasks)