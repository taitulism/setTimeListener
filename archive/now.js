export default now;
export {now, roundFloat};

const nowGetterMethod = (() => {
    if (global.performance && global.performance.now) {
        return global.performance.now.bind(global.performance);
    }

    return Date.now;
})()

function performanceNow () {
    return global.performance.now();
}

function dateNow () {
    return Date.now();
}

function now (precision = 3) {
    const time = nowGetterMethod();
    const rounded = roundFloat(time, precision);
    console.log(time, rounded);

    return rounded;
}

function roundFloat (floatNum, precision = 2) {
    const shift = Math.pow(10, precision);
    const integ = Math.round(floatNum * shift);
    const unshift = integ / shift;

    return unshift;
}

