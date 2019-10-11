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
      $(".error-message").slideUp();
    }
  });
});
