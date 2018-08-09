import { getTimeLeft } from './utils';

export default setTimeListener;

function setTimeListener (target, callback) {
    const timeLeft = getTimeLeft(target);
    
    return setTimeout(() => {
        callback(target);
    }, timeLeft);
};

