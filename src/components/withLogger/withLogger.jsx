import React, { useEffect } from "react";

export const WithLogger = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            if (props.actionType && props.selectedTask) {
                const date = new Date().toLocaleString();
                console.log(
                    `${date} - ${props.selectedTask.text} was ${props.actionType}.`
                );
            }
        }, [props.actionType, props.selectedTask]);

        return <WrappedComponent {...props} />;
    };
};
