import React from "react";
import "./button.css"


export const Button = ({btnText, onClick}) => {
    return (
        <button className="btn-task" onClick={onClick}>{btnText}</button>
    )
}