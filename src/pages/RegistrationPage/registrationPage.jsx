import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./../basePage.css";
import { Button } from "../../components/button/button.jsx";
import { api } from "../../api/todo-api.js";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/formField/formField.jsx";
import { APIerrorsList } from "../../components/APIerrors/apiErrors.jsx";

const registrationFields = [
    {
        label: "Username:",
        id: "username",
        type: "text",
        placeholder: "Username",
        validationRules: {
            required: "Username is required",
            // maxLength: {
            //     value: 24,
            //     message: "Username cannot exceed 24 characters",
            // },
        },
    },
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
            maxLength: {
                value: 24,
                message: "Email cannot exceed 24 characters",
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
            maxLength: {
                value: 24,
                message: "Password cannot exceed 24 characters",
            },
        },
    },
    {
        label: "Age:",
        id: "age",
        type: "number",
        placeholder: "Age",
        validationRules: {
            required: "Age is required",
            min: {
                value: 10,
                message: "Age must be at least 10",
            },
            max: {
                value: 100,
                message: "Age must be under 100",
            },
        },
    },
    {
        label: "Gender:",
        id: "gender",
        type: "radio",
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
        ],
        validationRules: {
            required: "Gender is required",
        },
    },
];

export const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [APIerrors, setAPIErrors] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        const result = await api.registration(data, setAPIErrors);
        console.log(data);
       
        if (result) {
            setAPIErrors([]);
            setSuccessMessage("Registration successful! Please log in.");
        }
    };
    console.log(APIerrors);

    return (
        <>
            <div className="app-todo">
                <div className="container">
                    <form className="form">
                        {registrationFields.map((field) => (
                            <FormInput
                                key={field.id}
                                label={field.label}
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                register={register}
                                validationRules={field.validationRules}
                                options={field.options}
                                watch={watch}
                                fieldError={errors[field.id]?.message}
                            />
                        ))}
                        <APIerrorsList errors={APIerrors} />
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <div className="button">
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                className="btn-task"
                                btnText="Sign Up"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="navigation">
                <p>Already have an account?</p>
                <Link className="link btn-task" to="/login">
                    Log In
                </Link>
            </div>
        </>
    );
};
