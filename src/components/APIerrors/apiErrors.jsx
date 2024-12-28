export const APIerrorsList = ({ errors }) => {
    return (
        <ul className="error-list">
            {errors.map((err, index) => (
                <li key={index} className="field-error">
                    {err}
                </li>
            ))}
        </ul>
    );
};
