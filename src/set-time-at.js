import { getTimeLeft } from './utils';

export default setTimeAt;

function setTimeAt (target, callback) {
    const timeLeft = getTimeLeft(target);

    return setTimeout(() => {
        callback(target);
    }, timeLeft);
};
