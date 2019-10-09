$(document).ready(function() {
  console.log("Testing......");
  $(".tweet-box").on("input", function() {
    // console.log("key presses!");
    // console.log(this);
    // console.log($(this));
    let length = $(this).val().length;
    let charCounter = 140 - length;
    $(".counter").text(charCounter);
    if(charCounter < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "green");
    }
  });

  $("#scroll-up").on("click", function() {
    $(window).scrollTop(0);
  });
});

