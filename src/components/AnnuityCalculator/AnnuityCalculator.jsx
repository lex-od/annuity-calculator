import { useState, useEffect } from "react";
import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";
import annuityMath from "../../services/annuityMath";

const { getPay, getMinFee, getCostWithMinFee } = annuityMath;

const initParams = {
    pay: 100,
    fee: 572,
    term: 1,
    cost: 1717,
};
const initMinFee = 572;

export default function AnnuityCalculator() {
    const [params, setParams] = useState(initParams);
    const [changed, setChanged] = useState(null);
    const [minFee, setMinFee] = useState(initMinFee);

    const handleSetParams = (e) => {
        setParams((state) => ({
            ...state,
            [e.target.name]: Number(e.target.value),
        }));

        setChanged(e.target.name);
    };

    const { pay, fee, term, cost } = params;

    useEffect(() => {
        if (!changed) return;

        if (changed === "fee") {
            setParams((state) => ({ ...state, pay: getPay(fee, term, cost) }));
        }

        if (changed === "term" || changed === "pay") {
            const newPay = Math.max(100, pay);
            const newMinFee = getMinFee(newPay, term);

            setParams((state) => ({
                ...state,
                pay: newPay,
                fee: newMinFee,
                cost: getCostWithMinFee(newPay, term),
            }));

            setMinFee(newMinFee);
        }

        setChanged(null);
    }, [changed]); // eslint-disable-line

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
