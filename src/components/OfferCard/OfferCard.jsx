import css from "./OfferCard.module.scss";
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
        <div>
            <button type="button" onClick={handleDec}>
                -
            </button>

            <p>
                <span>{display}</span>
                <span>$</span>
            </p>

            <button type="button" onClick={handleInc}>
                +
            </button>

            <p>{Number((annuityMath.RATE * 12 * 100).toFixed(1))}</p>

            <p>{credit}</p>
        </div>
    );
}
