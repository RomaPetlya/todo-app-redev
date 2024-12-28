export const InputField = ({ id, type, placeholder, register, validationRules }) => {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register(id, validationRules)}
            className="form-input"
        />
    );
};
