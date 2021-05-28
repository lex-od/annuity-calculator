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

    const handleSetParams = ({ name, value }) => {
        setParams((state) => ({ ...state, [name]: value }));

        setChanged(name);
    };

    const { pay, fee, term, cost } = params;

    useEffect(() => {
        if (!changed) return;

        if (changed === "fee") {
            setParams((state) => ({ ...state, pay: getPay(fee, term, cost) }));
        }

        if (changed === "term" || changed === "pay") {
            const newMinFee = getMinFee(pay, term);

            setParams((state) => ({
                ...state,
                fee: newMinFee,
                cost: getCostWithMinFee(pay, term),
            }));

            setMinFee(newMinFee);
        }

        setChanged(null);
    }, [changed]); // eslint-disable-line

    return (
        <div className={css.annuityCalculator}>
            <div className={css.twinArea}>
                <TwinInput
                    title="Комфортный месячный платеж"
                    className={css.paramInp}
                    name="pay"
                    value={pay}
                    onChange={handleSetParams}
                    min={100}
                    max={10000}
                    step={50}
                />

                <TwinInput
                    title="Первоначальный взнос"
                    className={css.paramInp}
                    name="fee"
                    value={fee}
                    onChange={handleSetParams}
                    min={minFee}
                    max={cost}
                />

                <TwinInput
                    title="Срок кредитования"
                    className={css.paramInp}
                    name="term"
                    value={term}
                    onChange={handleSetParams}
                    min={1}
                    max={30}
                    unit="year"
                />
            </div>

            <p>Стоимость: {cost} $</p>
        </div>
    );
}
