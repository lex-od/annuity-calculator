import css from "./TwinInput.module.scss";
import RangeInput from "../RangeInput";

export default function TwinInput({
    className,
    name,
    value,
    onChange,
    min,
    max,
    step = 1,
}) {
    const classes = [css.twinInp];
    if (className) classes.push(className);

    const handleChange = (e) => {
        let value = Number(e.target.value);

        if (!Number.isInteger(value)) return;

        if (value < 0) value = 0;
        if (value > max) value = max;

        onChange({ name, value });
    };

    return (
        <div className={classes.join(" ")}>
            <input type="text" value={value} onChange={handleChange} />

            <RangeInput
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}
