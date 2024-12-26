import React from "react";
import "./formField.css";

export function FormInput({
    label,
    id,
    type = "text",
    placeholder,
    register,
    validationRules,
    error,
}) {
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
            {error && <p className="field-error">{error.message}</p>}
        </div>
    );
}
