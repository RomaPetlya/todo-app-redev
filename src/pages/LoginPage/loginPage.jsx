import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./../basePage.css";
import { Button } from "../../components/button/button.jsx";
import { api } from "../../api/todo-api.js";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/formField/formField.jsx";
import { APIerrorsList } from "../../components/APIerrors/apiErrors.jsx";

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [APIerrors, setAPIErrors] = useState([]);

    const onSubmit = async (data) => {
        await api.login(data, setAPIErrors);
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
        <>
            <div className="app-todo">
                <div className="container">
                    <form
                        className="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {loginFields.map((field) => (
                            <FormInput
                                key={field.id}
                                label={field.label}
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                register={register}
                                validationRules={field.validationRules}
                                fieldError={errors[field.id]?.message}
                            />
                        ))}
                        <APIerrorsList errors={APIerrors} />
                        <div className="button">
                            <Button
                                type="submit"
                                className="btn-task"
                                btnText="Log In"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="navigation">
                <p>Don't have an account?</p>
                <Link className="link btn-task" to="/registration">Sign Up</Link>
            </div>
        </>
    );
}
