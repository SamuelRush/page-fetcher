const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

request(args[0], function(error, response, body) {
  //console.log('error', error);
  //console.log('statusCode:', response && response.statusCode);
  //console.log('body:', body);



  fs.writeFile(args[1], body, function (err) {
    if (err) {throw err;}
  })
})
.on('response', function(response) {
  // unmodified http.IncomingMessage object
  response.on('data', function(data) {
    // compressed data as it is received
    console.log("Downloaded and saved " + " " + data.length + " bytes to " + args[1])
  })
});


