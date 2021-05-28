import css from "./IconButton.module.scss";

export default function IconButton({ className, svg, ...rest }) {
    const classes = [css.button];
    if (className) classes.push(className);

    return (
        <button className={classes.join(" ")} type="button" {...rest}>
            <svg className={css.svg}>
                <use href={svg} />
            </svg>
        </button>
    );
}
