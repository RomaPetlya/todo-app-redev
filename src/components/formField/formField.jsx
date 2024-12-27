import React from "react";
import "./formField.css";

export function FormInput({
    label,
    id,
    type = "text",
    placeholder,
    register,
    validationRules,
    options = [],
    watch,
}) {
    if (type === "radio") {
        return (
            <div className="form-field">
                <label>{label}</label>
                <div className={"radio-group"}>
                    {options.map((option) => (
                        <label key={option.value} className={`radio-option ${watch(id) === option.value ? "active" : ""}`}>
                            <input
                                type="radio"
                                value={option.value}
                                {...register(id, validationRules)}
                                name={id}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id, validationRules)}
                className="form-input"
            />
        </div>
    );
}