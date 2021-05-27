import css from "./TwinInput.module.scss";
import RangeInput from "../RangeInput";

export default function TwinInput({
    className,
    value,
    onChange,
    min,
    max,
    step = 1,
    name,
}) {
    const classes = [css.twinInp];
    if (className) classes.push(className);

    const handleChange = ({ target: { name, value } }) => {
        let numVal = Number(value);

        if (!Number.isInteger(numVal)) return;

        if (numVal < 0) numVal = 0;
        if (numVal > max) numVal = max;

        onChange({ target: { name, value: numVal } });
    };

    return (
        <div className={classes.join(" ")}>
            <p>{value}</p>
            {/* <input
                type="text"
                value={value}
                onChange={handleChange}
                name={name}
                style={{ marginBottom: 20, marginTop: 20 }}
            /> */}

            <RangeInput
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                name={name}
            />
        </div>
    );
}
