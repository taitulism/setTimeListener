const { getTimeLeft } = require('./utils');

module.exports = setTimeListener;

function setTimeListener (target, callback) {
    const timeLeft = getTimeLeft(target);

    return setTimeout(() => {
        callback(target);
    }, timeLeft);
};
