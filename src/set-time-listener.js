const { resolveOptions, runMetaTick } = require('./internal-functions');
const { getTimeLeft, setTimeoutToTarget } = require('./utils');

module.exports = timeEventEmitter;

function timeEventEmitter (useMetaTick = false) {
    if (!useMetaTick) {
        return setTimeoutToTarget;
    }

    const {metaTick, timeMargin, threshold} = resolveOptions(useMetaTick);
    
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
