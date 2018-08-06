# setTimeListener

**PROJECT STATUS:** Just got started. Work in progress...  
**CURRENT VERSION:** `0.0.0`  
**FOLLOWS SEMVER:** Not yet.  
**DEFAULT BRANCH:** `develop`  

## setTimeListener
Run your callback on a future timestamp/date.
[Read about the meta-tick](#meta%20tick).

```js
import config from 'setTimeListener';
// or
const config = require('setTimeListener');

const setTimeListener = config();
```

```js
const now = Date.now(); // e.g. 1553311000000
const futureTime = now + 777;

const abort = setTimeListener(futureTime, (target) => {
    console.log(Date.now()); // e.g. ~1553311000777
    console.log(target);     // e.g.  1553311000777
});

// ...OOPS!
abort();
```

## Basic Usage
```js
const setTimeListener = config();
```

## Use With Default Meta-Tick
* `metaTick = 25`
* `timeMargin = 2`
```js
const setTimeListener = config(true);
```

## Use With Customized Meta-Tick
```js
const options = {
    metaTick: 50,
    timeMargin: 5,
};

const setTimeListener = config(options);
```
#### metaTick
The number of milliseconds (before target) the meta tick should run.
* Type: Number
* Default: 25

#### timeMargin
Your callback timeout will be set to this number of milliseconds before its actual time.
* Type: Number
* Default: 2



## Meta Tick
> MetaTick is an optional feature.

A meta tick is an internal callback that is called some time before your target timestamp. Its target is to consider its own delay when calculating the timeout for your target time.  

It does that by miror-like matching the target timeout with its delay. That means:
* small delay = small time before target
* large delay = large time before target

Exceeded delay (more than half a metaTick) will result a negative timeout which is considered as `setTimeout(callback, 0)`:

A visual example: 
```js
/*

Default metaTick = 25
Example delay = 7
User callback will be set to run 7 ms before target timestamp to compansate delay.

                 delay    (-12.5)     timeout
               ┌───────┐      │      ┌───────┐
Time Axis-->───┼─────|─*───|──┼──|───*─|─────┼───>
             -25   -20   -15   -10    -5     0
               │                             │
          (metaTick)                     (target)

*/
```
