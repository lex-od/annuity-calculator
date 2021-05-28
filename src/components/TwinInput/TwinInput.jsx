import css from "./TwinInput.module.scss";
import RangeInput from "../RangeInput";

export default function TwinInput({
    title,
    className,
    name,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "dollar",
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

    const formatUnit = () => {
        let label = "";

        if (unit === "dollar") label = "$";

        if (unit === "year") {
            switch (value) {
                case 1:
                    label = "год";
                    break;
                case 2:
                case 3:
                case 4:
                    label = "года";
                    break;
                default:
                    label = "лет";
            }
        }

        return label;
    };

    return (
        <div className={classes.join(" ")}>
            <label className={css.textLabel}>
                <span className={css.textLabelText}>{title}</span>
                <input
                    className={css.textInp}
                    type="text"
                    value={value}
                    onChange={handleChange}
                />

                <span className={css.textLabelOver}>
                    {value}
                    <span className={css.textLabelUnit}>{formatUnit()}</span>
                </span>
            </label>

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
