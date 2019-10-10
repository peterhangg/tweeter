$(document).ready(function() {
  // Styling on whether tweet char count is valid
  $(".tweet-box").on("input", function() {
    let length = $(this).val().length;
    let charCounter = 140 - length;
    $(".counter").text(charCounter);
    if (charCounter < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "green");
    }
  });
  // handler on button to scroll to top of page
  $("#scroll-top").on("click", function() {
    $(window).scrollTop(0);
  });

});
// hide/show scroll button
$(document).scroll(function() {
  let y = $(this).scrollTop();
  if (y > 400) {
    $("#scroll-top").fadeIn();
    $("nav").fadeOut();
  } else {
    $("#scroll-top").fadeOut();
    $("nav").show();
  }
});