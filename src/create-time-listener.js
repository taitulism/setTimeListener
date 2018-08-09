const { resolveOptions, getTimeoutCalc } = require('./internal-functions');
const { getTimeLeft, setTimeoutToTarget } = require('./utils');

module.exports = createTimeListener;

function createTimeListener (opts) {
    const {metaTick, timeMargin, threshold} = resolveOptions(opts);
    const calcTimeout = getTimeoutCalc(metaTick, timeMargin);
    
    return function setTimeEventListener (target, callback) {
        const timeLeft = getTimeLeft(target);
    
        let ref;
    
        if (timeLeft <= timeMargin) {
            // No time for setTimeout. Run callback now.
            callback(target);
            ref = null;
        }
        else if (timeLeft <= threshold) {
            // A metaTick would be a overhead in this case. Use `timeMargin`.
            const ms = timeLeft - timeMargin;
    
            ref = setTimeout(() => {
                callback(target);
            }, ms);
        }
        else {
            // Use a metaTick
            const ms = timeLeft - metaTick;
            
            ref = setTimeout(() => {
                const calcMs = calcTimeout(target, callback);
                
                ref = setTimeout(() => {
                    callback(target);
                }, calcMs);
            }, ms);
        }
    
        /**
         * Returning a function because in case of a 
         * metaTick - the timeout ref is switching (meta & callback)
         */
        return function abort () {
            clearTimeout(ref);
        };
    };
}
