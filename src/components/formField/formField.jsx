import React from "react";
import "./formField.css";
import { InputField } from "./inputField";
import { RadioButton } from "./radioButton";

export function FormInput({
    label,
    id,
    type = "text",
    placeholder,
    register,
    validationRules,
    options = [],
    watch,
    fieldError,
}) {
    let FieldComponent;

    if (type === "radio") {
        FieldComponent = (
            <RadioButton
                options={options}
                id={id}
                register={register}
                validationRules={validationRules}
                watch={watch}
            />
        );
    } else {
        FieldComponent = (
            <InputField
                id={id}
                type={type}
                placeholder={placeholder}
                register={register}
                validationRules={validationRules}
            />
        );
    }

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                {FieldComponent}
                {fieldError && <p className="field-error">{fieldError}</p>}
            </div>
        </div>
    );
}
