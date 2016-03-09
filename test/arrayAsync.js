/*jshint node:true, laxcomma:true */
/* global describe, it */
'use strict';
var assert = require('assert')
  , JBJ = require('jbj');

JBJ.use(require('..'));

describe('asynchronous basic', function (done) {
  var input = {
    "a" : {
      "b" : {
        "c" : "value"
      },
      "d" : ['C', 'B', 'A'],
      "e" : 3
    }
  };

  it('array #1', function(done) {
    var stylesheet = {
      "get" : "a.b.c",
      "mapping" : {
        "value" : 1
      }
    };
    JBJ.render(stylesheet, input, function (err, output) {
      assert.equal(output, 1);
      done(err);
    });
  });

  it('array #2', function(done) {
    var stylesheet = {
      "default" : 1,
      "mapping" : ['a','b','c']
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, 'b');
      done(err);
    });
  });


  it('array #3', function(done) {
    var stylesheet = {
      "set": [1, 2],
      "mapping": ['a','b','c']
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(JSON.stringify(output), '["b","c"]');
      done(err);
    });
  });

  it('array #4', function(done) {
    var stylesheet = {
      "set": ["a", "b"],
      "mapping": {
        "a": "Aha!",
        "b": "Baby"
      }
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(JSON.stringify(output), '["Aha!","Baby"]');
      done(err);
    });
  });

  it('array #5', function(done) {
    var input = {
      "arg": { "a": "Aha!", "b": "Baby"},
      "input": "a"
    };
    var stylesheet = {
      "mappingVar": ["input", "arg"]
    };
    JBJ.render(stylesheet, input, function (err, output) {
      assert.equal(output, "Aha!");
      done(err);
    });
  });


  it('array #6', function (done) {
    var stylesheet = {
      "set"       : "20150310",
      "substring" : [4,2]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, "03");
      done(err);
    });
  });

  it('array #7', function (done) {
    var stylesheet = {
      "set"        : [ "a", "b", "c" ],
      "getindex": "2"
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, "c");
      done(err);
    });
  });

  it('array #8', function (done) {
    var stylesheet = {
      "set"        : { "a": 0, "b": 1, "c":2 },
      "getproperty": "b"
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, 1);
      done(err);
    });
  });

  it('array #9', function (done) {
    var stylesheet = {
      "set": {
        "i": 1,
        "t": ["a","b","c"]
      },
      "getIndexVar": ["t", "i"]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, "b");
      done(err);
    });
  });

  it('array #10', function (done) {
    var stylesheet = {
      "set": {
        "i" : "b",
        "o" : { "a": 0, "b": 1, "c":2 },
      },
      "getPropertyVar": ["o", "i"]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output, 1);
      done(err);
    });
  });

  it('array #11', function (done) {
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
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[2007], 538);
      assert.equal(output[2008], 577);
      assert.equal(output[2009], 611);
      done(err);
    });
  });

  it('array #12', function (done) {
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
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[2007], 538);
      assert.equal(output[2008], 577);
      assert.equal(output[2009], 611);
      done(err);
    });
  });

  it('array #13', function (done) {
    var stylesheet = {
      "set": [ [ "Afghanistan", "AFG" ],
               [ "Aland Islands", "ALA" ] ],
      "arrays2objects": true
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[0]._id,"Afghanistan");
      assert.equal(output[0].value, "AFG");
      assert.equal(output[1]._id, "Aland Islands");
      assert.equal(output[1].value, "ALA");
      done(err);
    });
  });

  it('array #14', function (done) {
    var stylesheet = {
      "set": [ [ "Afghanistan", "AFG" ],
               [ "Aland Islands", "ALA" ] ],
      "arrays2objects": ["key", "val"]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[0].key,"Afghanistan");
      assert.equal(output[0].val, "AFG");
      assert.equal(output[1].key, "Aland Islands");
      assert.equal(output[1].val, "ALA");
      done(err);
    });
  });

  it('array #15', function (done) {
    var stylesheet = {
      "set": [ [ "Pierre", "23", "Paris", "France", "75000" ],
               [ "Marie", "29", "Lons", "France", "39000" ] ],
      "arrays2objects": ["name", "age", "town", "country", "cp"]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[0].name, "Pierre");
      assert.equal(output[0].age, "23");
      assert.equal(output[0].town, "Paris");
      assert.equal(output[0].country, "France");
      assert.equal(output[0].cp, "75000");
      assert.equal(output[1].name, "Marie");
      assert.equal(output[1].age, "29");
      assert.equal(output[1].town, "Lons");
      assert.equal(output[1].country, "France");
      assert.equal(output[1].cp, "39000");
      done(err);
    });
  });

  it('array #16', function (done) {
    var stylesheet = {
      "set": {
        "array1": [{"_id": "1", "value": 1},  {"_id": "2", "value": 2}],
        "array2": [{"_id": "1", "value": 10}, {"_id": "2", "value": 20}]
      },
      "zip": [ "array1", "array2" ]
    };
    JBJ.render(stylesheet, function (err, output) {
      assert.equal(output[0]._id, "1");
      assert.equal(output[0].array1, 1);
      assert.equal(output[0].array2, 10);
      assert.equal(output[1]._id, "2");
      assert.equal(output[1].array1, 2);
      assert.equal(output[1].array2, 20);
      done();
    });
  });

  it('array #17', function(done) {
    var stylesheet = {
      "find" : ["x", "x.y", "a.b.c"],
      "coalesce" : null
    };
    JBJ.render(stylesheet, input, function (err, output) {
      assert.equal(output, 'value');
      done(err);
    });
  });

  it('array #18', function(done) {
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
    JBJ.render(stylesheet, input, function (err, output) {
      assert.equal(output.x.z, 'VALUE');
      done(err);
    });
  });

});
