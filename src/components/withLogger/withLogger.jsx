import React, { useEffect } from "react";

export const WithLogger = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            if (props.loggerParams) {
                const {actionType, task} = props.loggerParams;
                const date = new Date().toLocaleString();
                console.log(
                    `${date} - Task: id: ${task.id}, title: ${task.title} was ${actionType}.`
                );
            }
        }, [props.loggerParams]);

        return <WrappedComponent {...props} />;
    };
};
