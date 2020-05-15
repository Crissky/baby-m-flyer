export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function randomNegativeOrPositiveIntFromInterval(min, max) {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    return (randomIntFromInterval(min, max) * plusOrMinus);
}