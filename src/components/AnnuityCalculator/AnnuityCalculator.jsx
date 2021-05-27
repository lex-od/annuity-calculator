import { useState } from "react";
import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";

const FEE_MIN_PART = 1 / 3;
const RATE = 0.088 / 12;

export default function AnnuityCalculator() {
    const [pay, setPay] = useState(100);
    const [fee, setFee] = useState(1000);
    const [term, setTerm] = useState(1);
    const [cost, setCost] = useState(3000);

    const handleSetPay = (e) => {
        setPay(Number(e.target.value));
    };

    const handleSetFee = (e) => {
        setFee(Number(e.target.value));
    };

    const handleSetTerm = (e) => {
        setTerm(Number(e.target.value));
    };

    const payTmp =
        (cost * RATE * (1 + RATE) ** (term * 12)) /
        ((1 + RATE) ** (term * 12) - 1);

    return (
        <div className={css.annuityCalculator}>
            <TwinInput
                value={pay}
                onChange={handleSetPay}
                min={100}
                max={10000}
                step={50}
            />

            <TwinInput
                value={fee}
                onChange={handleSetFee}
                min={Math.round(cost * FEE_MIN_PART)}
                max={cost}
            />

            <TwinInput value={term} onChange={handleSetTerm} min={1} max={30} />

            <p>Стоимость: ${payTmp}</p>
        </div>
    );
}
