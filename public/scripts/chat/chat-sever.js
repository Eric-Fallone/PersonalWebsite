var socket = require('socket.io');
var request = require('request');

module.exports={
  startServer: function(sever){
    var io = socket(sever);

    io.on('connection',function(socket){

      console.log('made socket connection',socket.id);

      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        getWebHook(msg);
      });
    });
  }
}

getWebHook = function(msg) {
  var test ={
    username:"Personal Website",
    avatar_url:"https://images-na.ssl-images-amazon.com/images/I/71YURG2o%2BdL._SX425_.jpg",
    content:"<@160488660951629824> "+msg
  };

    request({
        url: "https://discordapp.com/api/webhooks/577724413668229161/ajwhBT4HHABcrkK6NFwoWlxwot--VA1prH6PYnn_PKLTEyXsYQoBK3yBUHzYCslqbqz5",
        method:'post',
        json: test,
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
          }
      });
  }
