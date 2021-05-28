const FEE_MIN_PART = 1 / 3;
const RATE = 0.088 / 12;

const getPay = (fee, term, cost) =>
    Math.round(
        ((cost - fee) * RATE * (1 + RATE) ** (term * 12)) /
            ((1 + RATE) ** (term * 12) - 1)
    );

const getMinFee = (pay, term) =>
    Math.round(
        (pay * ((1 + RATE) ** (term * 12) - 1)) /
            ((1 / FEE_MIN_PART - 1) * RATE * (1 + RATE) ** (term * 12))
    );

const getCostWithMinFee = (pay, term) =>
    Math.round(
        (pay * ((1 + RATE) ** (term * 12) - 1)) /
            ((1 - FEE_MIN_PART) * RATE * (1 + RATE) ** (term * 12))
    );

const annuityMath = {
    RATE,
    getPay,
    getMinFee,
    getCostWithMinFee,
};
export default annuityMath;
