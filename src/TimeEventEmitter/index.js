import { getTimeLeft, cLog, waitAndRun} from '../utils';

const META_TICK = 12;
const TIME_MARGIN = 2;
const META_THRESHOLD = (META_TICK * 2) + TIME_MARGIN; // (metaTick * 2 + margin)
const MIN_TIME_LEFT = (META_TICK / 4);           // (1/4 metaTick)
const MAX_SECOND_DELAY = 50;
const ONE_SECOND = 1000;
const HALF_A_SECOND = ONE_SECOND/2;

const ONE_SECOND_THRESHOLD = ONE_SECOND + TIME_MARGIN;
const ZERO = 0;
const TIME_PASSED = -1;

class TimeEventEmitter {
    constructor () {
        this.resetProps();
    }

    resetProps () {
        this.ref = null;
        this.target = 0;
        this.callback = null;
    }

    setTimeListener (target, callback) {
        this.target   = target;
        this.callback = callback;

        const timeLeft = getTimeLeft(target);

        if (timeLeft <= TIME_MARGIN) {
            // No time for setTimeout. Run callback now.
            this.runCallback(callback)
        }
        else if (timeLeft <= META_THRESHOLD) {
            // A metaTick would be a overhead in this case. Use `timeMargin`.
            this.setTimeoutPad(timeLeft);
        }
        else if (timeLeft <= ONE_SECOND_THRESHOLD) {
            // Use a metaTick
            this.setMetaTick(timeLeft);
        }
        else {
            this.setOneSecTick(timeLeft);
        }
    }

    runCallback (callback) {
        const cbFn = callback || this.callback;

        cbFn();
        this.resetProps();
    }

    setTimeoutPad (timeLeft) {
        const ms = timeLeft - TIME_MARGIN;

        this.ref = setTimeout(() => {
            callback(target);
        }, ms);
    }
    
    abort () {
        clearTimeout(this.ref);
        this.resetProps();
    }

    setMetaTick (timeLeft) {
        const ms = timeLeft - META_TICK;

        this.ref = waitAndRun(ms, () => {
            this.runMetaTick();
        });
    }
    
    runMetaTick () {
        const ms = calcTimeout(this.target);
        cLog('calcMs', ms)

        if (ms < ZERO) {
            this.runCallback();
        }
        else {
            this.ref = waitAndRun(ms, () => {
                this.runCallback();
            });
        }
    }

    setOneSecTick (timeLeft) {
        const ms = timeLeft - ONE_SECOND;

        this.ref = waitAndRun(ms, () => {
            this.runOneSecTick();
        });
    }

    runOneSecTick () {
        const timeLeft = getTimeLeft(this.target);
        const delay = ONE_SECOND - timeLeft;
        
        if (delay > MAX_SECOND_DELAY) { // An inactive tab (on chrome). setTimeout is limited to 1 per second.
            if (delay < HALF_A_SECOND) {
                // try to run on time. Delay would be max 500ms 
                const ms = getTimeLeft(this.target) - TIME_MARGIN;

                this.ref = waitAndRun(ms, () => {
                    this.runCallback();
                });
            }
            else {
                this.runCallback();
            }
            return;
        }
        else {
            this.setMetaTick(timeLeft);
        }
    }
}



function calcTimeout (target) {
    const timeLeft = getTimeLeft(target);
    cLog('timeLeft1', timeLeft)

    if (timeLeft <= MIN_TIME_LEFT) { // means a great delay 
        return TIME_PASSED; // negative value means run the callback now (synchronously).
    }

    const delay = META_TICK - timeLeft;
    cLog('delay1', delay)
    
    if (delay <= TIME_MARGIN) {
        return timeLeft - TIME_MARGIN;
    }
    
    // Miror the delay
    return timeLeft - delay;
}

export default TimeEventEmitter;
