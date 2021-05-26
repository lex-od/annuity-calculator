import css from "./Container.module.scss";

export default function Container({ children }) {
    return <div className={css.container}>{children}</div>;
}
