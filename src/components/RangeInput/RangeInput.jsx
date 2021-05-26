import css from "./RangeInput.module.scss";

export default function RangeInput({ className, ...rest }) {
    const classes = [css.rangeInp];
    if (className) classes.push(className);

    return <input type="range" className={classes.join(" ")} {...rest} />;
}
