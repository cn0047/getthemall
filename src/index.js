const fetch = require('node-fetch');

const { checkUrl, checkQuery, checkCallback } = require('./validation');

/**
 * Fetch data from external REST-API.
 *
 * @param {string} resourceName Resource name, like: users, countries, etc.
 * @param {string} uri URI to REST-API endpoint (protocol + host + port + endpoint to resource).
 * @param {function} cb Callback function, which will receive data.
 */
const fetchData = (resourceName, uri, cb) => {
  fetch(uri)
    .then(res => res.json())
    .then(json => cb({ resourceName, data: json, error: undefined }))
    .catch(err => cb({ resourceName, data: undefined, error: err.message }));
};

/**
 * Get fetchData Promise.
 *
 * @param {string} resourceName Resource name, like: users, countries, etc.
 * @param {string} uri URI to REST-API endpoint (protocol + host + port + endpoint to resource).
 *
 * @returns {Promise} Promise for function fetchData.
 */
const getPromise = (resourceName, uri) => new Promise((resolve) => {
  fetchData(resourceName, uri, data => resolve(data));
});

/**
 * Perform fetch data from different REST API endpoints in one call.
 *
 * @param {string} url URL to external REST-API (protocol + host + port).
 * @param {object} query Query object (map resource name to REST-API endpoint path).
 * @param {function} cb Callback function, which will receive result data.
 */
module.exports = (url, query, cb) => {
  checkUrl(url);
  checkQuery(query);
  checkCallback(cb);

  const promises =
    Object.keys(query).map(resourceName => getPromise(resourceName, url + query[resourceName]));

  Promise.all(promises).then((data) => {
    const result = {};
    // Format data from array into object,
    // where key - is resource name, and value - data received from REST-API.
    data.forEach((el) => {
      result[el.resourceName] = { data: el.data, error: el.error };
    });
    cb(result);
  });
};
