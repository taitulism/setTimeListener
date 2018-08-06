const timeEventEmitter = require('../index');

const setTimeListener = timeEventEmitter(true);
const target = Date.now() + 10000;

console.log('wait 10 seconds...');

setTimeListener(target, () => {
    const now = Date.now();
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
});