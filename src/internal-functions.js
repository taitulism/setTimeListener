const { isNumber, getTimeLeft } = require('./utils');

const DEFAULT_META_TICK = 25;
const DEFAULT_THRESHOLD = DEFAULT_META_TICK * 2;
const DEFAULT_TIME_MARGIN = 2;

module.exports = {
    runMetaTick,
    resolveOptions,
};

function runMetaTick (target, metaTick, timeMargin, callback) {
    const timeLeft = getTimeLeft(target);
    const delay = metaTick - timeLeft;

    let ms;

    if (delay <= timeMargin) {
        ms = timeLeft - timeMargin;
    }
    else {
        ms = timeLeft - delay;
    }

    return setTimeout(() => {
        callback(target);
    }, ms);
}

function resolveOptions (opts) {
    if (typeof opts === 'boolean') {
        // using defaults
        return {
            metaTick: DEFAULT_META_TICK,
            timeMargin: DEFAULT_TIME_MARGIN,
            threshold: DEFAULT_THRESHOLD,
        };
    }

    if (typeof opts !== 'object') {
        const errMsg = getNotABoolOrObjErrorMsg(opts);
        
        throw new Error(errMsg);
    }

    const rawMetaTick   = opts.metaTick;
    const rawTimeMargin = opts.timeMargin;

    if (rawMetaTick && !isNumber(rawMetaTick)) {
        const errMsg = getNotANumberErrorMsg('metaTick', rawMetaTick);

        throw new Error(errMsg);
    }

    if (rawTimeMargin && !isNumber(rawTimeMargin)) {
        const errMsg = getNotANumberErrorMsg('timeMargin', rawTimeMargin);

        throw new Error(errMsg);
    }

    return {
        metaTick: rawMetaTick || DEFAULT_META_TICK,
        timeMargin: rawTimeMargin || DEFAULT_TIME_MARGIN,
        threshold: rawMetaTick ? rawMetaTick * 2 : DEFAULT_THRESHOLD,
    };
};

function getNotANumberErrorMsg (propName, prop) {
    return `
        setTimeListener configuration ERROR: '${propName}' should be a number.
        Got ${typeof prop}: ${prop}
    `;
}

function getNotABoolOrObjErrorMsg (prop) {
    return `
        setTimeListener configuration ERROR: 'options' should be a boolean or an object.
        Got ${typeof prop}: ${prop}
    `;
}
