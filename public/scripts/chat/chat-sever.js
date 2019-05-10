 socket = require('socket.io'),
module.exports={
  startServer: function(sever){
    var io = socket(sever);

    io.on('connection',function(socket){

      console.log('made socket connection',socket.id);

      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
    });
  }
}
