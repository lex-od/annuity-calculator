import { useState } from "react";
import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";

const MONTH_PAY_STEP = 50;
const TERM_MIN = 1;
const TERM_MAX = 30;

export default function AnnuityCalculator() {
    const [monthPay, setMonthPay] = useState(100);
    const [initPay, setInitPay] = useState(0);
    const [term, setTerm] = useState(1);

    const handleSetMonthPay = (e) => {
        setMonthPay(Number(e.target.value));
    };

    const handleSetInitPay = (e) => {
        setInitPay(Number(e.target.value));
    };

    const handleSetTerm = (e) => {
        setTerm(Number(e.target.value));
    };

    let monthPayMin = 100;
    let monthPayMax = 10000;

    let initPayMin = 0;
    let initPayMax = 10000;

    return (
        <div className={css.annuityCalculator}>
            <TwinInput
                value={monthPay}
                onChange={handleSetMonthPay}
                min={monthPayMin}
                max={monthPayMax}
                step={MONTH_PAY_STEP}
            />

            <TwinInput
                value={initPay}
                onChange={handleSetInitPay}
                min={initPayMin}
                max={initPayMax}
            />

            <TwinInput
                value={term}
                onChange={handleSetTerm}
                min={TERM_MIN}
                max={TERM_MAX}
            />
        </div>
    );
}
