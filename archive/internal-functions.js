import { isNumber, getTimeLeft, cLog } from './utils';

export {getTimeoutCalc, resolveOptions};

const DEFAULT_META_TICK = 25;
const DEFAULT_THRESHOLD = DEFAULT_META_TICK * 2;
const DEFAULT_TIME_MARGIN = 2;
const DEFAULT_MAX_DELAY = 2;

// document.addEventListener("visibilitychange", function() {
//     console.log( document.visibilityState );
// });

function getTimeoutCalc (metaTick, timeMargin, maxDelay) {
    return function calcTimeout (target) {
        const timeLeft = getTimeLeft(target);
cLog('timeLeft', timeLeft)
        if (timeLeft <= timeMargin) { // means a great delay 
            return -1; // negative value means run the callback now (synchronously).
        }

        const delay = metaTick - timeLeft;
cLog('delay', delay)

        if (delay > maxDelay) {
        }
        if (delay <= maxDelay) {
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
    const rawMaxDelay   = opts.maxDelay;

    if (rawMetaTick && !isNumber(rawMetaTick)) {
        const errMsg = getNotANumberErrorMsg('metaTick', rawMetaTick);
        throw new Error(errMsg);
    }

    if (rawTimeMargin && !isNumber(rawTimeMargin)) {
        const errMsg = getNotANumberErrorMsg('timeMargin', rawTimeMargin);
        throw new Error(errMsg);
    }

    if (rawMaxDelay && !isNumber(rawMaxDelay)) {
        const errMsg = getNotANumberErrorMsg('maxDelay', rawMaxDelay);
        throw new Error(errMsg);
    }

    const metaTick   = rawMetaTick   || DEFAULT_META_TICK;
    const timeMargin = rawTimeMargin || DEFAULT_TIME_MARGIN;
    const maxDelay   = rawMaxDelay   || DEFAULT_MAX_DELAY;
    const threshold  = rawMetaTick ? rawMetaTick * 2 : DEFAULT_THRESHOLD;

    return {
        metaTick,
        timeMargin,
        maxDelay,
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
