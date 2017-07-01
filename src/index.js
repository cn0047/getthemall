import fetch from "node-fetch"

/**
 * Fetches data from REST-API.
 *
 * @param {string} resourceName Resource name, like: users, countries, etc.
 * @param {string} url Url to REST-API endpoint.
 * @param {function} cb Callback function, which will receive data.
 */
const fetchData = (resourceName, url, cb) => {
  fetch(url)
    .then(res => res.json())
    .then(json => cb({resourceName: resourceName, data: json}))
}

/**
 * Performs fetch data from different REST-API endpoints simultaneously.
 *
 * @param {string} host REST-API host name.
 * @param {object} query Query object which contains keys as resources names and values as REST-API endpoints.
 * @param {function} cb Callback function, which will receive array with all obtained data.
 */
export default (host, query, cb) => {
  let promises = []

  // Each parameter contains endpoint URL, so will use it as part of target URL.
  for (let resourceName in query) {
    // Url to REST-Api endpoint.
    let url = host + query[resourceName]
    promises.push(new Promise(resolve => {
      fetchData(resourceName, url, data => resolve(data))
    }))
  }

  Promise.all(promises).then(data => {
    let result = {}
    // Format data into object,
    // where key - is resource name, and value - data obtained from REST-API.
    data.forEach(el => result[el.resourceName] = el.data)
    cb(result)
  })

}
