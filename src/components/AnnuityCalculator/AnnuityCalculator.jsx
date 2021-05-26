import css from "./AnnuityCalculator.module.scss";
import TwinInput from "../TwinInput";

export default function AnnuityCalculator() {
    return (
        <div className={css.annuityCalculator}>
            <TwinInput value="120" />
        </div>
    );
}
