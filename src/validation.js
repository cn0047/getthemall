const validUrl = require('valid-url');

/**
 * Throw exception in case URL invalid.
 *
 * @param {string} url URL string.
 *
 * @throws {Error}
 */
module.exports.checkUrl = (url) => {
  if (!validUrl.isUri(url)) {
    throw new Error('Invalid URL.');
  }
};

/**
 * Throw exception in case Query object is invalid.
 *
 * Query object must be plain not empty object (like hash map data structure) where:
 * key - resource name string,
 * value - path to REST-API endpoint.
 *
 * @param {object} query Query object.
 *
 * @throws {Error}
 */
module.exports.checkQuery = (query) => {
  if (query === null) {
    throw new Error('Query cannot be NULL, Query must be an object.');
  }
  if (typeof query !== 'object') {
    throw new Error('Query must be an object.');
  }
  if (Object.keys(query).length === 0) {
    throw new Error('Query object must have at least one property.');
  }
};

/**
 * Throw exception in case Callback invalid.
 *
 * @param {function} cb Callback function.
 *
 * @throws {Error}
 */
module.exports.checkCallback = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error('Callback must be a function.');
  }
};
