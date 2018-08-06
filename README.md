# setTimeListener

**PROJECT STATUS:** Just got started. Work in progress...  
**CURRENT VERSION:** `0.0.0`  
**FOLLOWS SEMVER:** Not yet.  
**DEFAULT BRANCH:** `develop`  

## setTimeListener
Run your callback on a future timestamp/date.


## Installation & Usage
> **Work in progress...**
```js
import timeEventEmitter from 'timeEventEmitter';
// or
const timeEventEmitter = require('timeEventEmitter');

const cfg = {
    metaTick: 25,
    timeMargin: 2,
};

const setTimeListener = timeEventEmitter(cfg);

const now = Date.now(); // e.g. 1533556000000 

const setTimeListener(now + 777, (target) => {
    console.log(target); // e.g. 1533556000777
});
```
