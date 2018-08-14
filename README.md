# setTimeListener

**PROJECT STATUS:** Archived. Merged into Ticker.  

## setTimeListener
Runs a callback **accurately** on a future timestamp/date.


```js
const setTimeListener = require('setTimeListener');

const now = Date.now(); // e.g. 1553311000000
const futureTime = now + 777;

const abort = setTimeListener(futureTime, () => {
    console.log(Date.now()); // e.g. ~1553311000777
    console.log(futureTime); // e.g.  1553311000777
});

// ...OOPS!
abort();
```

Test / Play / Benchmark:
```sh
$ npm run playground
```
