import React from "react";
import {useForm} from "react-hook-form";
import "./loginPage.css";
import {Button} from "../../button/button.jsx";


export function LoginPage() {
    const {
        register, handleSubmit, formState: {errors}, watch,
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (<div className="app-todo">
        <div className="container">
            <form
                className="login-form"
            >
                <label className="center" htmlFor="email">
                    Email:{" "}
                </label>
                <div className="login-field">

                    <input
                        className="login-input"
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Required field", maxLength: 40,
                        })}
                    />
                </div>
                <p className="field-error">{errors.email?.message}</p>
                <label className="center" htmlFor="password">
                    Password:{" "}
                </label>
                <div className="login-field">
                    <input
                        className="login-input"
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Required field", maxLength: 24,
                        })}
                    />
                </div>
                <p className="field-error">{errors.password?.message}</p>
            </form>
            <div className="center button">
                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="btn-task"
                    btnText="Sign Up"
                />
            </div>
        </div>
    </div>);
}
