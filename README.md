# JBJ array module

JBJ array module: complex actions implying arrays ([mapping](#mapping), [mappingVar](#mappingvar), [zip](#zip), [array2object](#array2object), [arrays2objects](#arrays2objects), [coalesce](#coalesce), [substring](#substring), [getindex](#getindex), [getindexvar](#getindexvar)).


## Contributors

  * [Nicolas Thouvenin](https://github.com/touv)

## Installation

```bash
$ npm install jbj-array
```

## Usage

This JBJ module cannot be used alone. JBJ has to be installed.

```js
var JBJ = require('jbj');
JBJ.use(require('jbj-array'));
```

## Tests

Use [mocha](https://github.com/visionmedia/mocha) to run the tests.

```bash
$ npm install
$ npm test
```

## Actions

Once the module is declared as used for JBJ, you can use the following actions:

<a id="mapping"></a>
### mapping: object

Replace a value by the matching value in the object.

```javascript
{
  "set": "one",
  "mapping": {
    "one": 1
  }
}
// output: 1
```

```javascript
{
  "set": "FR",
  "mapping": {
    "US": "United States of America",
    "FR": "France"
  }
}
// output: "France"
```

Can also replace the values of an array with the matching values in the object.

```javascript
{
  "set": [1, 2],
  "mapping": ["a","b","c"]
}
// output: ["b","c"]
```

```javascript
{
  "set": ["a", "b"],
  "mapping": {
    "a": "Aha!",
    "b": "Baby"
  }
}
// output: ["Aha!","Baby"]
```

<a id="mappingvar"></a>
### mappingVar: ["input","table"]

*alias*: combine

Replace the content of the `input` variable according to the content of the `table` variable.

```javascript
var input = {
  "arg": { "a": "Aha!", "b": "Baby"},
  "input": "a"
};
var stylesheet = {
  "mappingVar": ["input", "arg"]
};
var output = JBJ.renderSync(stylesheet, input);
// output "Aha!";
```

<a id="array2object"></a>
### array2object: [key, value]

Convert an array, which items have `key` and `value` properties, to an associative array (or object), which key properties are `key` values and values are `value` values.

> *Note*: when the parameter is not a two items array, its default value is `["_id","value"]`.

Ex:

```javascript
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
// output = { "2007": 538, "2008": 577, "2009": 611 }

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
// output = { "2007": 538, "2008": 577, "2009": 611 }
```

<a id="arrays2objects"></a>
### arrays2objects: [key, value]

*alias*: arrayOfArrays2arrayOfObjects

Convert an array of arrays (of 2+ items), to an array of objects, where the first key if `key` and the second `value`). Default value of `key`: `_id`, default value of `value`: `value`.

> *Note*: this is useful to prepare data from a CSV file to be treated with `array2object`.

Ex:

```javascript
var stylesheet = {
  "set": [ [ "Afghanistan", "AFG" ],
           [ "Aland Islands", "ALA" ] ],
  "arrays2objects": ["key", "val"]
};
// output: [ { "key": "Afghanistan", "val": "AFG"},
//           { "key": "Aland Islands", "val": "ALA"} ]

var stylesheet_2 = {
  "set": [ [ "Pierre", "23", "Paris", "France", "75000" ],
           [ "Marie", "29", "Lons", "France", "39000" ] ],
  "arrays2objects": ["name", "age", "town", "country", "cp"]
};
// output: [ { "nom": "Pierre", "age": "23", "ville": "Paris", "pays": "France", "cp": "75000"},
//           { "nom": "Marie", "age": "29", "ville": "Lons", "pays": "France", "cp": "39000"} ]
```

```javascript
var stylesheet = {
  "set": [ [ "Afghanistan", "AFG" ],
           [ "Aland Islands", "ALA" ] ],
  "arrays2objects": true
};
// output: [ { "_id": "Afghanistan", "value": "AFG"},
//           { "_id": "Aland Islands", "value": "ALA"} ]
```

<a id="zip"></a>
### zip: ["array1","array2"]

Join two arrays (which elements have an `_id` and a `value` keys).

```javascript
var stylesheet = {
  "set": {
    "array1": [{"_id": "1", "value": 1},  {"_id": "2", "value": 2}],
    "array2": [{"_id": "1", "value": 10}, {"_id": "2", "value": 20}]
  },
  "zip": [ "array1", "array2" ]
};
var output = JBJ.renderSync(stylesheet);
// output: [ { _id: '1', array1: 1, array2: 10 },
//           { _id: '2', array1: 2, array2: 20 } ]

```

<a id="coalesce"></a>
### coalesce: none

Get the first non-undefined value
```javascript
    var stylesheet = {
        "set" : [null, undefined, null, "a", "b"],
        "coalesce": true
    };
    // output : "a"
```

<a id="substring"></a>
### substring: [offset]|[offset, length]

*aliases : substr*

```javascript
    var stylesheet = {
      "set"       : "20150310",
      "substring" : [4,2]
    };
    // output : "03"
```

<a id="getproperty"></a>
<a id="getProperty"></a>
<a id="getindex"></a>
<a id="getIndex"></a>
### getIndex: property | index
*aliases : getProperty, getproperty, getindex*

Get a property of an object, or an item of an array.

```javascript
var stylesheet = {
  "set"        : [ "a", "b", "c" ],
  "getindex": "2"
};
// output : "c"
var stylesheet = {
  "set"        : { "a": 0, "b": 1, "c":2 },
  "getProperty": "b"
};
// output : 1
```

<a id="getpropertyvar"></a>
<a id="getPropertyVar"></a>
<a id="getindexvar"></a>
<a id="getIndexVar"></a>
### getIndexVar: [ arrayName | objectName , propertyName | indexName ]
*aliases : getPropertyVar, getpropertyvar, getindexvar*

Get a property of an object, or an item of an array, like [getindex](#getindex), but using variables.

```javascript
var stylesheet = {
  "set": {
    "i": 1,
    "t": ["a","b","c"]
  },
  "getIndexVar": ["t", "i"]
};
// output : "b"
var stylesheet = {
  "set": {
    "i" : "b",
    "o" : { "a": 0, "b": 1, "c":2 },
  },
  "getPropertyVar": ["o", "i"]
};
// output : 1
```


## Examples

See unit tests : https://github.com/Inist-CNRS/node-jbj-array/tree/master/test


## Try it

http://Inist-CNRS.github.io/node-jbj/


## License

[MIT](https://github.com/Inist-CNRS/node-jbj-array/blob/master/LICENSE)
