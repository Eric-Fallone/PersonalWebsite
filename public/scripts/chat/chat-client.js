
$(function () {
  var socket = io();

  $('#chatform').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', {
      user:$("#username").text(),
      msg:$('#m').val()
    });
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    if(msg.user == $("#username").text()){
      $('#messages').append($('<li class="list-group-item">').text(msg.msg));
    }
  });

  $("#chatbox").click(function() {
    $("#chatbox-holder").toggleClass("chat-box-expanded");
  });
});
//loads all chat messages after page loads
$(document).ready(function(){
  if($("#username").length){
    $.getJSON("/chat/"+$("#username").text(), function( data ){
      $.each( data.chatmsg, function(index, value){

        $('#messages').append($('<li class="list-group-item">').text(value.msg));
      });
    });
  }
});
