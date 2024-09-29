import React, { useState, useRef} from "react";
import "./task.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskUpdate } from "../updateTask/updateTask";
import { WithLogger } from "../../withLogger/withLogger";

const Task = ({ task, onDelete, onToggle, onUpdate }) => {
    const [isEditable, setEditable] = useState(false);
    const inputRef = useRef(null);
    const handleEdit = () => {
        setEditable(!isEditable);
        setTimeout(() => inputRef.current.focus(), 0);
    }
   
    if (isEditable) {
        return (
            <TaskUpdate
                onUpdate={onUpdate}
                task={task}
                setEditable={setEditable}
                btnText="Update task"
                inputRef={inputRef}
            />
        );
    } else {
        return (
            <div className="task">
                <div className={`taskText ${task.isDone ? "done" : ""}`} onClick={() => onToggle(task.id)}>
                    {task.text}
                </div>
                <div className="task-icons">
                    <FontAwesomeIcon
                        className="icon edit-icon"
                        icon={faPenToSquare}
                        onClick={handleEdit}
                    />
                    <FontAwesomeIcon
                        className="icon delete-icon"
                        icon={faTrash}
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </div>
        );
    }
};

export default WithLogger(Task)