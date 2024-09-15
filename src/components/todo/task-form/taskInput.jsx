import { useState, useRef } from "react";
import { Button } from "../button";
import "./taskInput.css";

// eslint-disable-next-line react/prop-types
export const TaskInput = ({ onAdd, btnText }) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue("");
        }
        setTimeout(() => inputRef.current.focus(), 0);
    };

    const handleButtonSave = (event) => {
        if (event.key === "Enter") {
            handleAddTask()
        }
    }

    return (
        <div className="task-form">
            <input
                ref={inputRef}
                className="task-input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleButtonSave}
                placeholder="What is the task today?"
            />
            <Button onClick={handleAddTask} btnText={btnText} />
        </div>
    );
};
