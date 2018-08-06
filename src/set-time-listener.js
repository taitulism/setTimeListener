const { getMetaTickValues, getTimeLeft, runAt } = require('./methods');

function timeEventEmitter (useMetaTick = false) {
    if (!useMetaTick) {
        return runAt;
    }

    const {metaTick, timeMargin, threshold} = getMetaTickValues(useMetaTick);
    
    return function setTimeEventListener(target, callback) {
        const timeLeft = getTimeLeft(target);
    
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
                ref = runMetaTick(target, metaTick, timeMargin, callback);
            }, ms);
        }
    
        return function abort () {
            clearTimeout(ref);
        };
    };
}

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

module.exports = timeEventEmitter;
