(function(factory) {
  // Use AMD if present
  if (typeof define === 'function' && define.amd)
    define([], factory);
  // Else use CommonJS / node modules
  else if (typeof module !== 'undefined')
    module.exports = factory();
  // Else attach to global `this`
  else
    this.RandomizedArray = factory();
}).call(this, function() {
  'use strict';

  var _isArray, _getOne, _getMany, _onlyTruthy;

  // # Randomized
  // Constructor function
  function Randomized(arr) {
    arr = arr || false;

    if (!(this instanceof Randomized))
      return new Randomized(arr);

    // Setup the array if it exists.
    this.setArray(arr);
  }

  Randomized.prototype = {
    // ## Randomized.fn.get
    // Dispatch to helper functions based on quantity.
    // Will return an array of elements if quantity > 1.
    get: function(quantity) {
      // Quantity defaults to one.
      if (!quantity)
        quantity = 1;

      // Return `undefined` if _array unset / invalid.
      if (this.length > 0)
        return (quantity === 1) ? _getOne.call(this) : _getMany.call(this, quantity);
      else
        return undefined;
    },

    // ## Randomized.fn.setArray
    // Guard method for setting the array.
    // Used by the constructor, but can also change the array in-situ if necessary.
    setArray: function(arr) {
      arr = _isArray(arr) ? arr.filter(_onlyTruthy) : false;

      if (arr && arr.length) {
        this._array = arr;
        this.length = arr.length;
      } else {
        this._array = false;
        this.length = 0;
      }

      return this;
    }
  };

  // ## private _isArray
  // Browser-safe check to see if `arr` is an array.
  _isArray = function(arr) {
    return !!~({}).toString.call(arr).indexOf('Array');
  };

  // ## private _getOne
  // Return one random element.
  _getOne = function() {
    var i = Math.floor(Math.random() * this.length);

    return this._array[i];
  };

  // ## private _getMany
  // Use a Fisher-Yates shuffle on a clone of the array,
  // returning the requested quantity.
  _getMany = function(quantity) {
    var len = this.length
      , cloned = this._array.slice(0)
      , t
      , i
    ;

    quantity = (len < quantity) ? len : +quantity;

    while (len) {
      i = Math.floor(Math.random() * len--);

      t = cloned[len];

      cloned[len] = cloned[i];
      cloned[i]   = t;
    }

    return cloned.slice(0, quantity);
  };

  // ## private _onlyTruthy
  // Filter out falsey values from in an array (except `0` / `'0'`).
  // This is to compact sparse arrays inputs.
  // 0 is excepted in case one has an array of numbers where 0 might be
  // a desired possible outcome.
  _onlyTruthy = function(x) {
    return x || x === 0 || x === '0';
  };

  // ## Array.prototype.filter
  // Shim Array.fn.filter for older browsers _(e.g. IE < 9)_
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      /*jshint eqnull:true, newcap:false*/
      if (this == null)
        throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();

      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
        if (i in t)
        {
          var val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t))
            res.push(val);
        }
      }

      return res;
    };
  }

  // Export created prototype to `define` / `module` / `window`.
  return Randomized;
});
