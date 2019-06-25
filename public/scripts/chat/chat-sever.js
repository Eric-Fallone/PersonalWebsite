//var socket = require('socket.io');
var discord = require('../notifications/discord.js')
var User = require("../../../models/user");
var Msg = require("../../../models/msg");

module.exports={
  startServer: function(server){
    var io = require('socket.io')(server);
    io.on('connection',function(socket){

      console.log('made socket connection',socket.id);

      socket.on('chat message', function(msg){

        User.findOne({username:msg.user}, function(err, user) {
          if(err){
            console.log(err);
          } else{
            var newMsgIn = {msg:msg.msg,isEric:msg.isEric}
            Msg.create(newMsgIn,function(err, newMsg){
              if(err){
                console.log(err);
              }else{
                user.chatmsgs.push(newMsg._id);
                user.save();
                newMsg.save();
                io.emit('chat message', msg);
                if(newMsg.isEric == false){
                  discord.webHook("Chat message from: "+msg.user+" - "+ msg.msg);
                }
              }
            });
          }
        });
      });
    });
  }
}
