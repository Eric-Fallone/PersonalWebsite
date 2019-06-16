$(document).ready(function(){
  setTimeout(function(){
    $(".title").fadeIn(2500);
  },1000);
  setTimeout(function(){
    $(".aboutme").fadeIn(2500);
  },1000);
  setTimeout(function(){
    $(".myproj").fadeIn(2500);
  },2000);
  setTimeout(function(){
    $(".social_links").fadeIn(2500);
  },3000);
});
$(".title").click(function(){
  $("h2").show("slow");
});

$(document).click(function() {
  $(".title").fadeIn("slow");
  $(".aboutme").fadeIn("slow");
  $(".myproj").fadeIn("slow");
  $(".social_links").fadeIn("slow");
});
