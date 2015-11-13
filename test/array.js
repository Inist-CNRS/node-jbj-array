/*jshint node:true, laxcomma:true */
/* global describe, it */
'use strict';
var assert = require('assert')
  , JBJ = require('jbj');

JBJ.use(require('..'));

describe('array', function () {

  var input = {
    "a" : {
      "b" : {
        "c" : "value"
      },
      "d" : ['C', 'B', 'A'],
      "e" : 3
    }
  };

  it('array #1', function() {
    var stylesheet = {
      "get" : "a.b.c",
      "mapping" : {
        "value" : 1
      }
    };
    var output = JBJ.renderSync(stylesheet, input);
    assert.equal(output, 1);
  });

  it('array #2', function() {
    var stylesheet = {
      "default" : 1,
      "mapping" : ['a','b','c']
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, 'b');
  });

  it('array #3', function() {
    var stylesheet = {
      "set": [1, 2],
      "mapping": ['a','b','c']
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(JSON.stringify(output), '["b","c"]');
  });

  it('array #4', function() {
    var stylesheet = {
      "set": ["a", "b"],
      "mapping": {
        "a": "Aha!",
        "b": "Baby"
      }
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(JSON.stringify(output), '["Aha!","Baby"]');
  });

  it('array #5', function() {
    var input = {
      "arg": { "a": "Aha!", "b": "Baby"},
      "input": "a"
    };
    var stylesheet = {
      "mappingVar": ["input", "arg"]
    };
    var output = JBJ.renderSync(stylesheet, input);
    assert.equal(output, "Aha!");
  });


  it('array #6', function () {
    var stylesheet = {
      "set"       : "20150310",
      "substring" : [4,2]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, "03");
  });

  it('array #7', function () {
    var stylesheet = {
      "set"        : [ "a", "b", "c" ],
      "getindex": "2"
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, "c");
  });

  it('array #8', function () {
    var stylesheet = {
      "set"        : { "a": 0, "b": 1, "c":2 },
      "getproperty": "b"
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, 1);
  });

  it('array #9', function () {
    var stylesheet = {
      "set": {
        "i": 1,
        "t": ["a","b","c"]
      },
      "getIndexVar": ["t", "i"]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, "b");
  });

  it('array #10', function () {
    var stylesheet = {
      "set": {
        "i" : "b",
        "o" : { "a": 0, "b": 1, "c":2 },
      },
      "getPropertyVar": ["o", "i"]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output, 1);
  });

  it('array #11', function () {
    var stylesheet = {
      "set": [
        {
          "_id": "2007",
          "value": 538
        }, {
          "_id": "2008",
          "value": 577
        }, {
          "_id": "2009",
          "value": 611
      }],
      "array2object": true
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output[2007], 538);
    assert.equal(output[2008], 577);
    assert.equal(output[2009], 611);
  });

  it('array #12', function () {
    var stylesheet = {
      "set": [
        {
          "key": "2007",
          "val": 538
        }, {
          "key": "2008",
          "val": 577
        }, {
          "key": "2009",
          "val": 611
      }],
      "array2object": ["key","val"]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output[2007], 538);
    assert.equal(output[2008], 577);
    assert.equal(output[2009], 611);
  });


  it('array #13', function () {
    var stylesheet = {
      "set": [ [ "Afghanistan", "AFG" ],
               [ "Aland Islands", "ALA" ] ],
      "arrays2objects": true
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output[0]._id,"Afghanistan");
    assert.equal(output[0].value, "AFG");
    assert.equal(output[1]._id, "Aland Islands");
    assert.equal(output[1].value, "ALA");
  });

  it('array #14', function () {
    var stylesheet = {
      "set": [ [ "Afghanistan", "AFG" ],
               [ "Aland Islands", "ALA" ] ],
      "arrays2objects": ["key", "val"]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output[0].key,"Afghanistan");
    assert.equal(output[0].val, "AFG");
    assert.equal(output[1].key, "Aland Islands");
    assert.equal(output[1].val, "ALA");
  });

  it('array #15', function () {
    var stylesheet = {
      "set": {
        "array1": [{"_id": "1", "value": 1},  {"_id": "2", "value": 2}],
        "array2": [{"_id": "1", "value": 10}, {"_id": "2", "value": 20}]
      },
      "zip": [ "array1", "array2" ]
    };
    var output = JBJ.renderSync(stylesheet);
    assert.equal(output[0]._id, "1");
    assert.equal(output[0].array1, 1);
    assert.equal(output[0].array2, 10);
    assert.equal(output[1]._id, "2");
    assert.equal(output[1].array1, 2);
    assert.equal(output[1].array2, 20);
  });

  it('array #16', function() {
    var stylesheet = {
      "find" : ["x", "x.y", "a.b.c"],
      "coalesce" : null
    };
    var output = JBJ.renderSync(stylesheet, input);
    assert.equal(output, 'value');
  });

  it('array #17', function() {
    var stylesheet = {
      "$x.y" : {
        "find" : ["x.y", "a.b.c"],
        "coalesce" : null,
        "upcase" : null
      },
      "$x.z" : {
        "find" : ["x.y", "a.b.c"],
        "first" : null
      }
    };
    var output = JBJ.renderSync(stylesheet, input);
    assert.equal(output.x.z, 'VALUE');
  });

});
