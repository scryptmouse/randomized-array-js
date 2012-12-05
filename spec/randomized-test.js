var vows = require('vows')
  , assert = require('assert')
  , Randomized = require('../randomized')
  , haiku_array = require('./haiku.json')
;

vows.describe('Randomized').addBatch({
  'Randomized.prototype.get': {
    topic: function() {
      return new Randomized(haiku_array);
    },

    'with no parameter': {
      topic: function(r) {
        return r.get();
      },

      'returns one random element': function(el) {
        assert.typeOf(el, 'string');
      }
    },

    'with a set quantity': {
      topic: function(r) {
        var quantity = Math.ceil(r.length / 2);

        this.callback(r.get(quantity), quantity);
      },

      'returns an array of given quantity': function(arr, quantity) {
        assert.lengthOf(arr, quantity);
      }
    },

    'with an excessive length': {
      topic: function(r) {
        var len = r.length
          , quantity = len * 2
        ;

        return this.callback(r.get(quantity), len);
      },

      'just returns a shuffled array with the original length': function(random, len) {
        assert.lengthOf(random, len);
      }
    }
  },

  'given a sparse array': {
    topic: function() {
      var sparse = new Array(16);
      sparse[0] = 'foo';
      sparse[3] = 'bar';
      sparse[6] = 'quux';
      sparse[7] = '0';
      sparse[8] = 0;

      return new Randomized(sparse);
    },

    'truncates it to the proper length': function(r) {
      assert.equal(r.length, 5);
    }
  },

  'given an empty or invalid array': {
    topic: function() {
      this.callback(new Randomized(), new Randomized(false), new Randomized(new Array(16)));
    },

    'instance has length 0': function(empty, bool, sparse) {
      var args = Array.prototype.slice.call(arguments);
      args.forEach(function(arg) {
        assert.equal(arg.length, 0);
      });
    },

    'instance.get() returns undefined': function(empty, bool, sparse) {
      var args = Array.prototype.slice.call(arguments);

      args.forEach(function(arg) {
        assert.isUndefined(arg.get());
      });
    }
  }
}).export(module);
