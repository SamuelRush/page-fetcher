const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

if (!fs.existsSync(args[1])) {
  console.log("Local file path given is invalid")
  throw err
} else {
  request(args[0], function(error, response, body) {
    if (error !== null){
      console.log("The error value was not null, meaning the domain was not found!")
      return
    }
    //console.log('statusCode:', response && response.statusCode);
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
}
