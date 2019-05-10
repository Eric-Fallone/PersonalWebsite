
$(function () {
  var socket = io();

  messages = getMessages();

  messages.forEach(function(msg){
    $('#messages').append($('<li class="list-group-item">').text(msg));
  });

  $('#chatform').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li class="list-group-item">').text(msg));
  });

});

getMessages = function(){
  return ["meow","asd","2","1"];
}
