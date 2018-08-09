const { isNumber, getTimeLeft } = require('./utils');

const DEFAULT_META_TICK = 25;
const DEFAULT_THRESHOLD = DEFAULT_META_TICK * 2;
const DEFAULT_TIME_MARGIN = 2;
const DEFAULT_MAX_DELAY = 2;

module.exports = {
    getTimeoutCalc,
    resolveOptions,
};

function getTimeoutCalc (metaTick, timeMargin) {
    return function calcTimeout (target) {
        const timeLeft = getTimeLeft(target);
        const delay = metaTick - timeLeft;

        if (delay <= timeMargin) {
            // Miror the delay
             return timeLeft - delay;
        }
        
        return timeLeft - timeMargin;

        /*
            EXAMPLE:
            --------
            Default metaTick = 25
            Example delay = 7
            User callback will be set to run 7 ms before target timestamp to compansate delay.
            
                             delay    (-12.5)     timeout
                           ┌───────┐      │      ┌───────┐
            Time Axis-->───┼─────|─*───|──┼──|───*─|─────┼───>
                         -25   -20   -15   -10    -5     0
                           │                             │
                      (metaTick)                     (target)
        */
    };
}

function resolveOptions (opts) {
    if (!opts) { // use defaults
        return {
            metaTick: DEFAULT_META_TICK,
            timeMargin: DEFAULT_TIME_MARGIN,
            maxDelay: DEFAULT_MAX_DELAY,
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

    const metaTick   = rawMetaTick || DEFAULT_META_TICK;
    const timeMargin = rawTimeMargin || DEFAULT_TIME_MARGIN;
    const threshold  = rawMetaTick ? rawMetaTick * 2 : DEFAULT_THRESHOLD;

    return {
        metaTick,
        timeMargin,
        threshold,
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
