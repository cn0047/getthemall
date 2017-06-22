const fetch = require('node-fetch');

/**
 * Fetches data from API.
 *
 * @param {string} resourceName Resource name, like: users, countries, etc.
 * @param {string} url Url to API endpoint.
 * @param {function} cb Callback function, which will receive data.
 */
const fetchData = function(resourceName, url, cb) {
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      cb({resourceName: resourceName, data: json});
    })
  ;
};

/**
 * Performs fetch data from different endpoints simultaneously.
 *
 * @param {object} req Request object.
 * @param {object} res Response object.
 * @param {function} cb Callback function, which will receive array with all obtained data.
 */
module.exports = function(req, res, cb) {

  var host = req.protocol + '://' + req.get('host') + '/';
  var promises = [];

  // Each parameter contains endpoint URL,
  // so will use it as part of target URL.
  for (var resourceName in req.query) {
    // Url to Api endpoint.
    var url = host + req.query[resourceName];
    promises.push(new Promise(function(resolve) {
      fetchData(resourceName, url, function(data) {
        resolve(data);
      });
    }));
  }

  Promise.all(promises).then(function(data) {
    var result = {};
    // Format data into object,
    // where key - is resource name, and value - data obtained from API.
    data.forEach(function(el) {
      result[el.resourceName] = el.data;
    });
    cb(result);
  });

};
