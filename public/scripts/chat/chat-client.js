
$(function () {
  var socket = io();

  $('#chatform').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', {
      user:$("#username").text(),
      msg:$('#m').val(),
      isEric:false
    });
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    if(msg.user == $("#username").text()){
      createMsg(msg.msg,msg.isEric);
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
        createMsg(value.msg,value.isEric);
      });
      $('#messages').scrollTop($('#messages').height());
    });
  }
});

//create chat msg
function createMsg(msg, isEric){
  if(isEric == true){
    $('#messages').append($('<li class="list-group-item isEric">').text(msg));
  }else{
    $('#messages').append($('<li class="list-group-item notEric">').text(msg));
  }

}
