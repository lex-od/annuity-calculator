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

    useEffect(() => {
        if (!changed) return;

        if (changed === "fee") {
            setParams((state) => ({ ...state, pay: getPay(fee, term, cost) }));
        }

        if (changed === "term" || changed === "pay") {
            const newPay = Math.max(100, pay);

            setParams((state) => ({
                ...state,
                pay: newPay,
                fee: getMinFee(newPay, term),
                cost: getCostWithMinFee(newPay, term),
            }));
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
                min={getMinFee(pay, term)}
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
