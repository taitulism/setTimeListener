function Now (target) {
    return Date.now();
}


function getTimeLeft (target) {
    return target - Now();
}


// setTimeout 
function waitAndRun (delay, callback) {
    return setTimeout(callback, delay);
}


// setTimeoutTo
function runAt (target, callback) {
    const timeLeft = getTimeLeft(target);

    return setTimeout(() => {
        callback(target);
    }, timeLeft);
}

const DEFAULT_META_TICK = 25;
const DEFAULT_THRESHOLD = DEFAULT_META_TICK * 2;
const DEFAULT_TIME_MARGIN = 2;

function getMetaTickValues (opts) {
    if (typeof opts === 'boolean') {
        // using defaults
        return {
            metaTick: DEFAULT_META_TICK,
            timeMargin: DEFAULT_TIME_MARGIN,
            threshold: DEFAULT_THRESHOLD,
        };
    }

    if (typeof opts !== 'object') {
        const errMsg = `
            timeEventEmitter ERROR: 'useMetaTick' should be a boolean or an object.
            Got ${typeof opts}: ${opts}
        `;
        
        throw new Error(errMsg);
    }

    const rawMetaTick   = opts.metaTick;
    const rawTimeMargin = opts.timeMargin;

    if (rawMetaTick && !isNumber(rawMetaTick)) {
        const errMsg = `
            timeEventEmitter ERROR: 'metaTick' should be a number.
            Got ${typeof rawMetaTick}: ${rawMetaTick}
        `;
        
        throw new Error(errMsg);
    }

    if (rawTimeMargin && !isNumber(rawTimeMargin)) {
        const errMsg = `
            timeEventEmitter ERROR: 'timeMargin' should be a number.
            Got ${typeof rawTimeMargin}: ${rawTimeMargin}
        `;

        throw new Error(errMsg);
    }

    return {
        metaTick: rawMetaTick || DEFAULT_META_TICK,
        timeMargin: rawTimeMargin || DEFAULT_TIME_MARGIN,
        threshold: rawMetaTick ? rawMetaTick * 2 : DEFAULT_THRESHOLD,
    };
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
    getMetaTickValues,
    isNumber,
    Now,
    getTimeLeft,
    waitAndRun,
    runAt,
};
