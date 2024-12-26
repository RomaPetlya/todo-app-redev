import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./loginPage.css";
import { Button } from "../../components/button/button.jsx";
import { api } from "../../api/todo-api.js";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/formField/formField.jsx";

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        await api.login(data, setError);
        console.log(data);
    };

    const loginFields = [
        {
            label: "Email:",
            id: "email",
            type: "email",
            placeholder: "Email",
            validationRules: {
                required: "Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                },
            },
        },
        {
            label: "Password:",
            id: "password",
            type: "password",
            placeholder: "Password",
            validationRules: {
                required: "Password is required",
                maxLength: 24,
            },
        },
    ];

    return (
        <div className="app-todo">
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    {loginFields.map((field) => (
                        <FormInput
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            register={register}
                            validationRules={field.validationRules}
                            error={errors[field.id]}
                        />
                    ))}
                    <div className="center button">
                        <Button
                            type="submit"
                            className="btn-task"
                            btnText="Log In"
                        />
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                </form>
                <div className="link">
                    <p>Don't have an account?</p>
                    <Link to="/registration">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
