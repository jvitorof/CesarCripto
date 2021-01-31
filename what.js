const request = require('request');
var FormData = require('form-data');
const formData = new FormData()
formData.append({'anithing': 'answer'})
request('http://www.google.com.br', {method: 'POST', formData: formData}, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
