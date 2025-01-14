export const RadioButton = ({ options, id, register, validationRules, watch }) => {
    return (
        <div className={"radio-group"}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`radio-option ${
                        watch(id) === option.value ? "active" : ""
                    }`}
                >
                    <input
                        type="radio"
                        value={option.value}
                        {...register(id, validationRules)}
                        name={id}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};
