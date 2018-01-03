GetThemAll
-

[![NPM](https://nodei.co/npm/getthemall.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/getthemall/)

[![Build Status](https://travis-ci.org/cn007b/getthemall.svg?branch=master)](https://travis-ci.org/cn007b/getthemall)
[![Coverage Status](https://coveralls.io/repos/github/cn007b/getthemall/badge.svg?branch=master)](https://coveralls.io/github/cn007b/getthemall?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/cn007b/getthemall/badges/score.svg)](https://www.bithound.io/github/cn007b/getthemall)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/372769a4866f43b49b4c8d98b8c03560)](https://www.codacy.com/app/cn007b/getthemall)

A small library built for demo purposes,
<br>which helps fetch data from different REST API endpoints in one call.

## Installation

`npm i getthemall`

## Usage

````js
const getThemAll = require('getthemall');

getThemAll('https://your-api-host.com/', { user1: 'users/1', user2: 'users/2' }, (data) => {
  // Now you have all your data for different resources from different endpoints.
  console.log(data.user1, data.user2);
});
````

## Tests

`npm test`
