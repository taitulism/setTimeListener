const timeEventEmitter = require('../index');

const cfg = {
    metaTick: 25,
};

const setTimeListener = timeEventEmitter(cfg);
const target = Date.now() + 10000;

setTimeListener(target, (tar) => {
    console.log(Date.now(), tar);
})