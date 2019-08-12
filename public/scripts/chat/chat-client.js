
$(function () {

  if(location.hostname === "localhost" ){
    var socket = io('//localhost:3000');
  }else {
    var socket = io('http://ericfallone.com');
  }
//not Eric sending a message
  $('#footer_message_input').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', {
      user:$("#username").text(),
      msg:$('#footer_message_input_m').val(),
      isEric:false
    });
    $('#footer_message_input_m').val('');
    return false;
  });

//Eric sending a message
$('.ericMsg').submit(function(e){
  e.preventDefault(); // prevents page reloading

  socket.emit('chat message', {
    user:$(this).parent("div").parent("div").children("H3")[0].outerText,
    msg:$(this).children("input").val(),
    isEric:true
  });
  msg:$(this).children("input").val('');
  return false;
});

//recieve message
  socket.on('chat message', function(msg){
    if(msg.user == $("#username").text()){
      createMsg(msg.msg,msg.isEric,"#footer_messages");
    }
    createMsg(msg.msg,msg.isEric,"#"+msg.user+" > div ul");

  });

//expand chat box
  $("#chatbox").click(function() {
    $("#chatbox-holder").toggleClass("chat-box-expanded");
  });
  $("#login_link").click(function() {
    window.location.href='/login';
  });
});

//loads all chat messages after page loads
$(document).ready(function(){
  if($("#username").length){
    $.getJSON("/chat/"+$("#username").text(), function( data ){
      $.each( data.chatmsg, function(index, value){
        createMsg(value.msg,value.isEric,"#footer_messages");
      });
      $('#footer_messages').scrollTop($('#footer_messages')[0].scrollHeight);
      $('.messages').scrollTop(10000);
      //$("#mydiv").scrollTop($("#mydiv")[0].scrollHeight)
    });
  }
});

//create chat msg
function createMsg(msg, isEric, selector){
  if(isEric == true){
    $(selector).append($('<li class="list-group-item isEric">').text(msg));
  }else{
    $(selector).append($('<li class="list-group-item notEric">').text(msg));
  }
  if($(selector)[0]){
    $(selector).scrollTop($(selector)[0].scrollHeight);
  }
}
