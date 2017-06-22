GetThemAll
-

[![Build Status](https://travis-ci.org/cn007b/getthemall.svg?branch=master)](https://travis-ci.org/cn007b/getthemall)
[![Coverage Status](https://coveralls.io/repos/github/cn007b/getthemall/badge.svg?branch=master)](https://coveralls.io/github/cn007b/getthemall?branch=master)

A small library built for demo purposes,
which helps fetch data from different REST API endpoints into one request.

## Installation

`npm install getthemall`

## Usage

````js
const getthemall = require('getthemall');

app.use('/resources', (req, res) => {
  getthemall(req, res, (data) => {
    res.json(data);
  });
});
````

## Tests

`npm test`
