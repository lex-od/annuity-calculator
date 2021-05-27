import { useState, useEffect } from "react";
import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";

const FEE_MIN_PART = 1 / 3;
const RATE = 0.088 / 12;

const initParams = {
    pay: 100,
    fee: 572,
    term: 1,
    cost: 1717,
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

    const { pay, fee, term, cost } = params;

    const getPay = () =>
        Math.round(
            ((cost - fee) * RATE * (1 + RATE) ** (term * 12)) /
                ((1 + RATE) ** (term * 12) - 1)
        );

    const getMinFee = () =>
        Math.round(
            (pay * ((1 + RATE) ** (term * 12) - 1)) /
                ((1 / FEE_MIN_PART - 1) * RATE * (1 + RATE) ** (term * 12))
        );

    const getCostWithMinFee = () =>
        Math.round(
            (pay * ((1 + RATE) ** (term * 12) - 1)) /
                ((1 - FEE_MIN_PART) * RATE * (1 + RATE) ** (term * 12))
        );

    const getCost = () =>
        Math.round(
            (pay * ((1 + RATE) ** (term * 12) - 1)) /
                (RATE * (1 + RATE) ** (term * 12)) +
                fee
        );

    const minFee = getMinFee();

    useEffect(() => {
        if (!changed) return;

        if (changed === "fee") {
            setParams((state) => ({ ...state, pay: getPay() }));
        }

        if (changed === "term" || changed === "pay") {
            // if (fee < minFee) {
            setParams((state) => ({
                ...state,
                fee: minFee,
                cost: getCostWithMinFee(),
            }));
            // } else {
            //     setParams((state) => ({ ...state, cost: getCost() }));
            // }
        }

        setChanged(null);
    }, [changed]);

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
                min={minFee}
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
