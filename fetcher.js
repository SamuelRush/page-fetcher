const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

if (!fs.existsSync(args[1])) {
  console.log("Local file path given is invalid")
  return
} else {
  request(args[0], function(error, response, body) {
    if (error !== null){
      console.log("The error value was not null, meaning the domain was not found!")
    } else if (response.statusCode !== 200){
      console.log("The response code is not 200 meaning the URL has an error!")
    } else {
    //console.log('statusCode:', response && response.statusCode);
    fs.writeFile(args[1], body, function (err) {
      if (err) {throw err;}
    })
    }
  })
  .on('response', function(responses) {
    // unmodified http.IncomingMessage object
    responses.on('data', function(data) {
      if (responses.statusCode === 200) {
        // compressed data as it is received
        console.log("Downloaded and saved " + " " + data.length + " bytes to " + args[1])
      }
    })
  });
}
