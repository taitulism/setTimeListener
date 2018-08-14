export {getTimeLeft, cLog};

function getTimeLeft (target, now = Date.now()) {
    return target - now;
}


/**
 * cLog is a simple async `console.log`
 * Using `console.log` when debugging ms is causing a delay.
 */
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
