import { getTimeLeft } from './utils';

export default setTimeListener;

let checkRef, RAFRef, timeoutRef;
let isRAFOn = false;
let startTime = 0;

// TODO: temporary
let count = 0;

function setTimeListener (timestamp, callback) {
    startTime = lastTickTarget = roundFloat(performance.now(), 3);

    const timeLeft = getTimeLeft(timestamp);
    const target = startTime + timeLeft;
    console.log('*** now ***', startTime);
    console.log('target', target);

    RAFTick(startTime, target, callback);

    checkRef = checkRAF(target, callback);
        
    return function abort () {
        cancelAnimationFrame(RAFRef);
    };
};

let lastTimeLeft = 0;
let lastTickTarget;

function RAFTick (now, target, callback) {
    count++;
    turnOnRAF();

    if (count <= 250) {
        RAFRef = requestAnimationFrame((F_newNow) => {
            const newNow = roundFloat(F_newNow, 3);
            const left = target - newNow;
            console.log('-------------');
            console.log('Idealy:', lastTickTarget);
            console.log('Actual:', newNow);
            console.log('left', Math.round(left), left - lastTimeLeft);
            
            if (newNow === lastTickTarget) {
                console.log('  PERFECT!');
            }
            else if (newNow < lastTickTarget) {
                console.log('  ', lastTickTarget - newNow, 'ms early');
            }
            else {
                console.log('  ', roundFloat(newNow - lastTickTarget, 3), 'ms late');
            }
            lastTimeLeft = left;
            lastTickTarget = roundFloat(newNow + 16.666, 3);


            if (left <= 16.666) { // done.                
                callback();
                cancelAnimationFrame(RAFRef);
                clearTimeout(timeoutRef);
                clearTimeout(checkRef);
                return;
            }

            RAFTick(newNow, target, callback);
        });
    }
    else {
        cancelAnimationFrame(RAFRef);
    }
}

function checkRAF (target, callback) {
    console.log(`checking at ${performance.now()}`);
    
    if (isRAFOn) { // check if stopped
        const savedCount = count;

        return setTimeout(() => {
            const currentCount = count;
    
            if (currentCount === savedCount) { // stopped.
                console.log(`stopped at ${performance.now()}`);
                isRAFOn = false;

                fallbackToSetTimeout(target, callback);
            }
    
            if (count > 249) return;
    
            checkRef = checkRAF(target, callback);
        }, 1000);
    }
    else { // check if is turned on
        return setTimeout(() => {
            if (isRAFOn) {
                console.log(`returned at ${performance.now()}`);
            }
    
            if (count > 249) return;
    
            checkRef = checkRAF();
        }, 1000);
    }
}

function turnOnRAF () {
    if (isRAFOn) return;

    isRAFOn = true;

    // stop fallback timeout
    clearTimeout(timeoutRef);
}

function roundFloat (floatNum, precision = 2) {
    const shift = Math.pow(10, precision);
    const integ = Math.round(floatNum * shift);
    const unshift = integ / shift;

    return unshift;
}

function fallbackToSetTimeout () {
    
}