function getTimeLeft (target) {
    return target - Date.now();
}

function setTimeoutToTarget (target, callback) {
    const timeLeft = getTimeLeft(target);

    return setTimeout(() => {
        callback(target);
    }, timeLeft);
}

function isNumber (val) {
    if (typeof val !== 'number') return false;

    // typeof NaN === 'number'
    // Number.isNaN() checks if the given value is itself a type NaN
    // while window.isNaN() tries to convert the value into a number (e.g. `Number(val)`).
    if (Number.isNaN(val)) return false;

    return true;
}

module.exports = {
    isNumber,
    getTimeLeft,
    setTimeoutToTarget,
};
