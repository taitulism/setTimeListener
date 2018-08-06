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

## Threshold
When a meta-tick is set during config another props named `threshold` is being initiated as the meta-tick value times two (metaTick * 2). 

> `threshold` is being dynamically set for you.

The meta-tick will be used only if the target timestamp is greater than the `threshold`. This is because if the target time is set to now + 30ms there is no value in setting a meta-tick 5ms later (considering the default metaTick = 25).

In this case the callback will be set to `targetTime - timeMargin`.

## Time Margin
This is another "safty" feature. Setting a `timeMargin` value means you are ok with your callback running `timeMargin` ms before target timestamp. The default is 2.

If the time left to target time is less than or equal to `timeMargin`, your callback will be called immediately.

Else if the time left to target time is less than or equal to `threshold`, your callback will be set to `timeMargin` ms before time.

Else, set a meta-tick.