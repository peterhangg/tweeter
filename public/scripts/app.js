// Preventing XSS with Escaping
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Get tweet timestamp
const timestamp = (ms) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const seconds = 1000;
  const differenceMs = new Date() - ms;

  if (differenceMs >= oneDay) {
    return `${Math.floor(differenceMs / oneDay)} days ago`;
  } else if (differenceMs >= oneHour) {
    return `${Math.floor(differenceMs / oneHour)} hours ago`;
  } else if (differenceMs >= oneMinute) {
    return `${Math.floor(differenceMs / oneMinute)} minutes ago`;
  } else {
    return `${Math.floor(differenceMs / seconds)} seconds ago`;
  }
};

// Create tweet object literal
const createTweetElement = (obj) => {
  let html =
  `<article>
    <header>
      <div class="head-name">
        <img src="${escape(obj.user.avatars)}"/>
        <span>${escape(obj.user.name)}</span>
      </div>
      <h5 class="head-username">${escape(obj.user.handle)}</h5>
    </header>
    <div class="tweet-text">
      <h4>${escape(obj.content.text)}</h4>
    </div>
    <footer>
      <span>${escape(timestamp(obj.created_at))}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $(html);
};

//Renders tweets and appends it to our tweet container
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

// Ajax request to to post tweets /tweets
const postTweets = function() {
  $(".error-message").hide();
  $("form").on("submit", function(event) {
    event.preventDefault();
    if (!$(".tweet-box").val()) {
      $(".error-message").text("Cannot submit tweet an empty tweet!");
      $(".error-message").slideDown();
    } else if ($(".tweet-box").val().length > 140) {
      $(".error-message").text("Cannot submit tweet over 140 characters!");
      $(".error-message").slideDown();
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("form").serialize()
      })
        .then(() => {
          $(".error-message").slideUp();
          loadTweets();
          $("form").trigger("reset");
          $(".counter").text(140);
          $(".write-tweet").fadeIn();
          $("form").hide();
        });
    }
  });
};

// Ajax request to retrieve tweets from /tweets
const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  })
    .then((tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    });
};

$(document).ready(function() {
  $("#arrow-icon").on("click", function(event) {
    event.preventDefault();
    $("form").slideToggle("fast", function() {
      $("textarea").focus();
      $(".write-tweet").fadeOut();
    });
  });
  
  $("form").hide();
  postTweets();
  loadTweets();
});

