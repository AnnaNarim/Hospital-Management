const Utils = {};

Utils.parseJSON = response => response.json();

Utils.fetchOptions = options => Object.assign({}, {
  mode: 'no-cors',
  // headers: {
  //   'Content-Type': 'application/json'
  // }
}, options);

module.exports = Utils;