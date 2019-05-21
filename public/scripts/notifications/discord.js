var request = require('request');

module.exports={
  webHook :function(msg) {
    var discMsg ={
      username:"Personal Website",
      avatar_url:"https://images-na.ssl-images-amazon.com/images/I/71YURG2o%2BdL._SX425_.jpg",
      content:"<@"+process.env.DISC_USER_ID+"> "+msg
    };

      request({
          url: process.env.DISC_WEBHOOK_URL,
          method:'post',
          json: discMsg,
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              console.log(body) // Print the json response
            }
        });
    }
}
