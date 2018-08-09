const {setTimeListener, createTimeListener} = require('../dist/main');

const setTimeoutAt = createTimeListener();
const MS_TIME = 60000;
const NOW = Date.now();

const targetTime = NOW + MS_TIME;

setTimeListener(targetTime, () => {
    logResults('setTimeListener', targetTime);
})

for (let index = 0; index < 10; index++) {
    const incTime = MS_TIME + (500 * index);

    setTime(index, incTime);
}

function setTime (index, incTime) {
    const targetTime = NOW + incTime;

    // setTimeout(() => {
    //     logResults(`setTimeout ${index}`, targetTime);
    // }, incTime);

    setTimeoutAt(NOW + incTime, () => {
        logResults(`setTimeoutAt ${index}`, targetTime);
    });
}

console.log('wait a minute...');

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




