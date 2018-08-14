const { getTimeLeft, runAt } = require('./methods');

const DEFAULT_META_TICK = 25;
const DEFAULT_META_TICK_THRESHOLD = 50;
const DEFAULT_TIME_MARGIN = 2;
const MIN_TIME_MARGIN = 1;

// meta_tick = meta_tick || DEFAULT_META_TICK;
// timeMargin = timeMargin || DEFAULT_TIME_MARGIN;

/**
 * onTimeEvent 
 * setTimeEventListener
 * addTimeEventListener
 * setTimeoutTo
 * setTimeoutAt
 * runAt
 */
function timeEventEmitter (useMetaTick = false) {
    if (!useMetaTick) {
        return runAt;
    }

    let metaTick, threshold, timeMargin;

    if (typeof useMetaTick === 'boolean') {
        metaTick   = DEFAULT_META_TICK;
        threshold  = DEFAULT_META_TICK_THRESHOLD;
        timeMargin = DEFAULT_TIME_MARGIN;
    }
    else if (typeof useMetaTick === 'object') {
        const _metaTick   = useMetaTick.metaTick;
        const _threshold  = useMetaTick.threshold;
        const _timeMargin = useMetaTick.timeMargin;

        metaTick   = typeof _metaTick   === 'number' ? _metaTick   : DEFAULT_META_TICK;
        threshold  = typeof _threshold  === 'number' ? _threshold  : DEFAULT_META_TICK_THRESHOLD;
        timeMargin = typeof _timeMargin === 'number' ? _timeMargin : DEFAULT_TIME_MARGIN;

        if (threshold < metaTick) {
            threshold = metaTick;
        }

        if (timeMargin < MIN_TIME_MARGIN) {
            timeMargin = MIN_TIME_MARGIN;
        }
    }

    console.log('metaTick', metaTick);
    console.log('threshold', threshold);
    console.log('timeMargin', timeMargin);
    
    return function setTimeEventListener(target, callback) {
        const timeLeft = getTimeLeft(target);
        console.log('timeLeft', timeLeft);
    
        let ref;
    
        if (timeLeft <= timeMargin) {
            callback(target);
            ref = null;
        }
        else if (timeLeft <= threshold) {
            const ms = timeLeft - timeMargin;
    
            ref = setTimeout(() => {
                callback(target);
            }, ms);
        }
        else {
            const ms = timeLeft - metaTick;
    
            ref = setTimeout(() => {
                ref = runMetaTick(target, metaTick, callback);
            }, ms);
        }
    
        return function abort() {
            clearTimeout(ref);
        };
    };
}


function createMetaTick (metaTick) {
    return function runMetaTick (target, metaTick, callback) {
        const timeLeft = getTimeLeft(target);
        const delay = metaTick - timeLeft;

        return setTimeout(() => {
            callback(target);
        }, timeLeft - delay);
    };
}

const cfg = {
    timeMargin: 3,
    metaTick: 20,
    threshold: 25,
};

const setTimeEvent = timeEventEmitter(cfg);
const target = Date.now() + 24;

setTimeEvent(target, (tar) => {
    console.log(Date.now(), tar);
})