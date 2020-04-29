const Utils = {};

Utils.parseJSON = response => response.json();

Utils.checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) return response;

  return response.json()
  	.then(resp => {
	    let error = new Error(resp || 'An error has occurred.');
	    if (typeof response === 'string') {
	      error = Object.assign({}, error, { response: response.json() });
	    } else {
	      error.response = response;
	    }

	    throw error;
	  })
};

module.exports = Utils;