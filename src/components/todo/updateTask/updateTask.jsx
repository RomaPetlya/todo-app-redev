import { useState } from "react";
import { Button } from "../button";
import "./updateTask.css";

// eslint-disable-next-line react/prop-types
export const TaskUpdate = ({ onUpdate, btnText, setEditable, task, inputRef }) => {
    const [inputValue, setInputValue] = useState(task.text);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        onUpdate(task.id, inputValue);
        setEditable(false);
    };

    const handleButtonSave = (event) => {
        if (event.key === "Enter") {
            handleSave()
        }
    }

    return (
        <div className="update-task-form">
            <input
                ref={inputRef}
                className="task-update"
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleButtonSave}
                placeholder="Write changes"
            />
            <Button onClick={handleSave} btnText={btnText} />
        </div>
    );
};
