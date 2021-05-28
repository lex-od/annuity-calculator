import css from "./OfferCard.module.scss";
import buttonSprite from "../../assets/buttonSprite.svg";
import IconButton from "../IconButton/IconButton";
import { annuityMath } from "../../services";

export default function OfferCard({
    display,
    term,
    onTermChange,
    min,
    max,
    credit,
}) {
    const handleDec = () => {
        if (term <= min) return;

        onTermChange({ name: "term", value: term - 1 });
    };

    const handleInc = () => {
        if (term >= max) return;

        onTermChange({ name: "term", value: term + 1 });
    };

    return (
        <div className={css.card}>
            <h2 className={css.title}>Стоимость объекта</h2>

            <div className={css.controls}>
                <IconButton svg={`${buttonSprite}#minus`} onClick={handleDec} />

                <p className={css.display}>
                    {display}
                    <span className={css.unit}>$</span>
                </p>

                <IconButton svg={`${buttonSprite}#plus`} onClick={handleInc} />
            </div>

            <div className={css.info}>
                <div className={css.rate}>
                    <p className={css.rateTitle}>Процентная ставка</p>
                    <p className={css.rateValue}>
                        {Number((annuityMath.RATE * 12 * 100).toFixed(1))} %
                    </p>
                </div>

                <div>
                    <p className={css.creditTitle}>Сумма кредита</p>
                    <p className={css.creditValue}>{credit} $</p>
                </div>
            </div>

            <button className={css.order}>Оставить заявку</button>
        </div>
    );
}
