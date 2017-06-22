'use strict';

import fetch from 'node-fetch';

/**
 * Fetches data from API.
 *
 * @param {string} resourceName Resource name, like: users, countries, etc.
 * @param {string} url Url to API endpoint.
 * @param {function} cb Callback function, which will receive data.
 */
const fetchData = (resourceName, url, cb) => {
  fetch(url)
    .then(res => res.json())
    .then(json => cb({resourceName: resourceName, data: json}))
  ;
};

/**
 * Performs fetch data from different endpoints simultaneously.
 *
 * @param {object} req Request object.
 * @param {object} res Response object.
 * @param {function} cb Callback function, which will receive array with all obtained data.
 */
export default (req, res, cb) => {

  let host = req.protocol + '://' + req.get('host') + '/';
  let promises = [];

  // Each parameter contains endpoint URL,
  // so will use it as part of target URL.
  for (let resourceName in req.query) {
    // Url to Api endpoint.
    let url = host + req.query[resourceName];
    promises.push(new Promise(resolve => {
      fetchData(resourceName, url, data => resolve(data));
    }));
  }

  Promise.all(promises).then(data => {
    let result = {};
    // Format data into object,
    // where key - is resource name, and value - data obtained from API.
    data.forEach(el => result[el.resourceName] = el.data);
    cb(result);
  });

};
