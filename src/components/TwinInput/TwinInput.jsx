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

    return (
        <div className={classes.join(" ")}>
            <p>{value}</p>

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
