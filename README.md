GetThemAll
-

[![Build Status](https://travis-ci.org/cn007b/getthemall.svg?branch=master)](https://travis-ci.org/cn007b/getthemall)
[![Coverage Status](https://coveralls.io/repos/github/cn007b/getthemall/badge.svg?branch=master)](https://coveralls.io/github/cn007b/getthemall?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/cn007b/getthemall/badges/dependencies.svg)](https://www.bithound.io/github/cn007b/getthemall/master/dependencies/npm)

A small library built for demo purposes,
which helps fetch data from different REST API endpoints into one request.

## Installation

`npm install getthemall`

## Usage

````js
const getthemall = require('getthemall');

app.use('/resources', function(req, res) {
  getthemall(req, res, function (data) {
    res.json(data);
  });
});
````

You can find example of usage [here](https://github.com/cn007b/simplerestapi).

## Tests

`npm test`
