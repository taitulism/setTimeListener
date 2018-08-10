import { resolveOptions, getTimeoutCalc } from './internal-functions';
import { getTimeLeft, cLog } from './utils';

export default createTimeListener;

function createTimeListener(opts) {
    const { metaTick, timeMargin, maxDelay, threshold } = resolveOptions(opts);
    const calcTimeout = getTimeoutCalc(metaTick, timeMargin, maxDelay);

    return function setTimeEventListener(target, callback) {
        const timeLeft = getTimeLeft(target);
        cLog('timeLeft', timeLeft)

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
        else if (timeLeft <= 2500) {
            // Use a metaTick
            const ms = timeLeft - metaTick;

            ref = setTimeout(() => {
                const calcMs = calcTimeout(target, callback);
                cLog('calcMs', calcMs)

                ref = setTimeout(() => {
                    callback(target);
                }, calcMs);
            }, ms);
        }
        else {
            ref = setTimeout(() => { // set 2000
                const timeLeft2 = getTimeLeft(target);
                const delay2 = 2000 - timeLeft2;

                cLog('timeLeft2', timeLeft2)
                cLog('delay2', delay2)
                cLog('ms1', timeLeft2 - 1000 - delay2)

                
                if (delay2 > 50) { // blured tab. setTimeout is limited to ~1 per second.
                    killSomeTime();
                    killSomeTime();
                }
                
                const ms1 = 200;
                
                ref = setTimeout(() => { // set 1000 - delay from 2000
                    const timeLeft1 = getTimeLeft(target);
                    const delay1 = 1000 - timeLeft1;

                    cLog('timeLeft1', timeLeft1)
                    
                    if (delay1 > 500) {
                        killSomeTime();
                        callback(target);
                    }
                    else if (timeLeft1 < timeMargin) {
                        callback(target);
                    }
                    else {
                        cLog('delay1', delay1)
                        cLog('ms25', timeLeft1 - metaTick)
                        
                    }
                }, timeLeft2 - 1000 - delay2);
            }, timeLeft - 2000);
        }

        /**
         * Returning a function because in case of a 
         * metaTick - the timeout ref is switching (meta & callback)
         */
        return function abort() {
            clearTimeout(ref);
        };
    };
}

function setTwoSecondsTick (target, callback) {
    
}

function setOneSecondTick (target, callback, lastDelay) {
    ref = setTimeout(() => { // 25 metaTick
        const calcMs = calcTimeout(target, callback);
        cLog('calcMs', calcMs)
    
        if (calcMs <= 0) {
            callback(target);
        }
        else {
            setMetaTick
        }
    
    }, timeLeft1 - metaTick);    
}

function setMetaTick (target, callback, lastDelay) {
    ref = setTimeout(() => {
        callback(target);
    }, calcMs);
}



function killSomeTime() {
    const start = performance.now()
    let o = {}
    for (let i = 0; i < 250000; i++) {
        o['a' + i] = function () { }
    }
    o = {}
    const end = performance.now()

    console.log(end - start);
}