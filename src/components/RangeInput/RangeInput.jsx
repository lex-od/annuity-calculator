import { useState } from "react";
import css from "./RangeInput.module.scss";

export default function RangeInput({ ...rest }) {
    const [value, setValue] = useState(1);

    return (
        <input
            type="range"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={css.rangeInp}
            {...rest}
        />
    );
}
