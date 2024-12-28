export const APIerrorsList = ({ errors }) => {
    return (
        errors.length > 0 && (
            <ul className="error-list">
                {errors.map((err, index) => (
                    <li key={index} className="field-error">
                        {err}
                    </li>
                ))}
            </ul>
        )
    );
};
