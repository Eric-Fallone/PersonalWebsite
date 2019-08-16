$(document).ready(function(){
  $('.operator-holder').click(function() {
    console.log("meow");
    $(this).toggleClass('col-2 col-6');
    $(this).children().toggleClass('hidden');
  });

  $('input#search').keyup(function () {
    var value = $('input#search').val().toLowerCase();
    $(".operator-holder").hide();
    var match = $(".name").filter(function() {
      return $(this).text().toLowerCase().indexOf(value) !== -1;
    });
    for(var i = 0; i < match.length; i++) {
      match.closest('.operator-holder').show();
    }
  });

  $('#SelectButton').click(function() {
    var action = $('#SelectAction').val();
    console.log(action);
    if(action === "new"){
      window.location = '/rainbow/new';
    }
    if(action === "edit"){
      var operator = $('#SelectOperator').val();
      window.location = '/rainbow/'+ operator +'/edit';
    }
    if(action === "delete"){
      var operator = $('#SelectOperator').val();
      var loc = '/rainbow/'+ operator + '?_method=DELETE'
      $.ajax({
        type: "POST",
        url: loc
      });
      window.location = '/rainbow/';
    }
  });

});
