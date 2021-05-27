import { useState, useEffect } from "react";
import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";

const FEE_MIN_PART = 1 / 3;
const RATE = 0.088 / 12;

const initParams = {
    pay: 100,
    fee: 1000,
    term: 1,
    cost: 3000,
};

export default function AnnuityCalculator() {
    const [params, setParams] = useState(initParams);
    const [changed, setChanged] = useState(null);

    const handleSetParams = (e) => {
        setParams((state) => ({
            ...state,
            [e.target.name]: Number(e.target.value),
        }));

        setChanged(e.target.name);
    };

    useEffect(() => {
        if (!changed) return;

        switch (changed) {
            case "pay":
                break;
            case "fee":
                break;
            case "term":
                break;
            default: // Чтобы ESLint не ругался
        }

        setChanged(null);
    }, [changed]);

    const { pay, fee, term, cost } = params;

    const getPay = () =>
        ((cost - fee) * RATE * (1 + RATE) ** (term * 12)) /
        ((1 + RATE) ** (term * 12) - 1);

    return (
        <div className={css.annuityCalculator}>
            <TwinInput
                value={pay}
                onChange={handleSetParams}
                min={100}
                max={10000}
                step={50}
                name="pay"
            />

            <TwinInput
                value={fee}
                onChange={handleSetParams}
                min={Math.round(cost * FEE_MIN_PART)}
                max={cost}
                name="fee"
            />

            <TwinInput
                value={term}
                onChange={handleSetParams}
                min={1}
                max={30}
                name="term"
            />

            <p>Стоимость: ${cost}</p>
        </div>
    );
}
