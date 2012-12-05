# randomized-array
### A randomized array prototype for JavaScript.

## Usage

```javascript
var Randomized = require('randomized-array');

var random = new Randomized(['foo', 'bar', baz', 'quux', 'cats']);

// Use random.fn.get() to get random element(s). With no parameters, defaults to one.
console.log(random.get());
// #> "cats"

// Or pass in a quantity
console.log(random.get(3));
// #> ["bar", "cats", "foo"];
```

Supports server-side usage in Node as well as browser-based usage (with or without AMD).

Without AMD in the browser, it attaches to RandomizedArray on the window object.

## Tests

Basic tests are available with vows. Install dev-dependencies (`npm install -d`) and run with npm: `npm test`.
