import React from "react";
import {useForm} from "react-hook-form";
import "./registrationPage.css";
import {Button} from "../../button/button.jsx";


export const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <div className="app-todo">
            <div className="container">
                <form
                    className="registration-form"
                >
                    <div className="registration-field">
                        <label className="center" htmlFor="username">
                            Username:{" "}
                        </label>
                        <input
                            className="registration-input"
                            id="username"
                            type="text"
                            placeholder="Username"
                            {...register("username", {
                                required: "Required field",
                                maxLength: 24,
                            })}
                        />
                    </div>
                    <p className="field-error">{errors.username?.message}</p>
                    <div className="registration-field">
                        <label className="center" htmlFor="email">
                            Email:{" "}
                        </label>
                        <input
                            className="registration-input"
                            id="email"
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Required field",
                                maxLength: 40,
                            })}
                        />
                    </div>
                    <p className="field-error">{errors.email?.message}</p>
                    <div className="registration-field">
                        <label className="center" htmlFor="password">
                            Password:{" "}
                        </label>
                        <input
                            className="registration-input"
                            id="password"
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Required field",
                                maxLength: 24,
                            })}
                        />
                    </div>
                    <p className="field-error">{errors.password?.message}</p>
                    <div className="registration-field">
                        <label className="center" htmlFor="gender">
                            Gender:{" "}
                        </label>
                        <div id="gender" className="gender-field">
                            <label
                                className={`center gender-radio ${
                                    watch("gender") === "Male" ? "active" : ""
                                }`}
                            >
                                <input
                                    id="male"
                                    {...register("gender", {required: "Required field"})}
                                    type="radio"
                                    value="Male"
                                    hidden
                                />
                                Male
                            </label>
                            <label
                                className={`center gender-radio ${
                                    watch("gender") === "Female" ? "active" : ""
                                }`}
                            >
                                <input
                                    id="female"
                                    {...register("gender", {required: "Required field"})}
                                    type="radio"
                                    value="Female"
                                    hidden
                                />
                                Female
                            </label>{" "}
                        </div>
                    </div>
                    <p className="field-error">{errors.gender?.message}</p>
                    <div className="registration-field">
                        <label className="center" htmlFor="age">
                            Age:
                        </label>
                        <input
                            className="registration-input"
                            id="age"
                            type="number"
                            placeholder="Age"
                            {...register("age", {
                                required: "Required field",
                                max: 100,
                                min: 10,
                            })}
                        />
                    </div>
                    <p className="field-error">{errors.age?.message}</p>
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
        </div>
    );
}
