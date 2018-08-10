import getNow from './now';

export {isNumber, getTimeLeft, setImmediate, cLog};

function getTimeLeft (target, now = Date.now()) {
    return target - now;
}

function isNumber (val) {
    if (typeof val !== 'number') return false;

    // typeof NaN === 'number'
    // Number.isNaN() checks if the given value is itself a type NaN
    // while window.isNaN() tries to convert the value into a number (e.g. `Number(val)`).
    if (Number.isNaN(val)) return false;

    return true;
}

function setImmediate (callback) {
    setTimeout(() => {
        callback();
    }, 0);
}

let cacheLogs = [];
let cLogRef = null;

function cLog (...args) {
    cacheLogs.push(args);
    
    if (cLogRef) {
        clearTimeout(cLogRef);
    }

    cLogRef = setTimeout(() => {
        console.log(cacheLogs);
        cacheLogs = [];
    }, 2000);
}
