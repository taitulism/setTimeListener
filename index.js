import setTimeListener from './src/set-time-listener';
import createTimeListener from './src/create-time-listener';

export {setTimeListener, createTimeListener}

// playground
const setTimeoutAt = createTimeListener();
const MS_TIME = 10000;
const NOW = Date.now();

const targetTime = NOW + MS_TIME;

console.log('wait a minute...');

setTimeListener(targetTime, () => {
    logResults('setTimeListener', targetTime);
})



// runMulti(10, 1)

function runMulti (times = 10, testMine = true) {
    if (testMine) {
        for (let index = 0; index < times; index++) {
            const incTime = MS_TIME + (500 * index);
        
            setMyTimeout(index, incTime);
        }
    }
    else {
        for (let index = 0; index < times; index++) {
            const incTime = MS_TIME + (500 * index);
        
            setNativeTimeout(index, incTime);
        }
    }
}

function setMyTimeout (index, incTime) {
    const targetTime = NOW + incTime;

    setTimeoutAt(NOW + incTime, () => {
        logResults(`setTimeoutAt ${index}`, targetTime);
    });
}

function setNativeTimeout (index, incTime) {
    const targetTime = NOW + incTime;

    setTimeout(() => {
        logResults(`setTimeout ${index}`, targetTime);
    }, incTime);
}

function logResults (who, target) {
    const now = Date.now();
    console.log(`${who}:`);
    console.log('Idealy:', target);
    console.log('Actual:', now);
    
    if (now === target) {
        console.log('  PERFECT!');
    }
    else if (now < target) {
        console.log('  ', target - now, 'ms early');
    }
    else {
        console.log('  ', now - target, 'ms late');
    }

    console.log(' ');
}

