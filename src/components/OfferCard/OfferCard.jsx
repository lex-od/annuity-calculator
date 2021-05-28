import css from "./OfferCard.module.scss";
import buttonSprite from "../../assets/buttonSprite.svg";
import IconButton from "../IconButton/IconButton";
import { annuityMath } from "../../services";

export default function OfferCard({
    className,
    display,
    term,
    onTermChange,
    min,
    max,
    credit,
}) {
    const handleDec = () => {
        console.log("---");
        if (term <= min) return;

        onTermChange({ name: "term", value: term - 1 });
    };

    const handleInc = () => {
        console.log("+++");
        if (term >= max) return;

        onTermChange({ name: "term", value: term + 1 });
    };

    return (
        <div className={className}>
            <IconButton svg={`${buttonSprite}#minus`} onClick={handleDec} />

            <p>
                <span>{display}</span>
                <span>$</span>
            </p>

            <IconButton svg={`${buttonSprite}#plus`} onClick={handleInc} />

            <p>{Number((annuityMath.RATE * 12 * 100).toFixed(1))}</p>

            <p>{credit}</p>
        </div>
    );
}
