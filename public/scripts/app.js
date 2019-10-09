// Create tweet object literal
const createTweetElement = (obj) => {
  let html = 
  `<article>
    <header>
      <div class="head-name">
        <img src="${obj.user.avatars}"/>
        <span>${obj.user.name}</span>
      </div>
      <h5 class="head-username">${obj.user.handle}</h5>
    </header>
    <div class="tweet-text">
      <h4>${obj.content.text}</h4>
    </div>
    <footer>
      <span>${new Date(obj.created_at).toDateString()}</span>
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
  for(let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  };
};

// Ajax request to to post tweets /tweets
const postTweets = function() {
  $("form").on("submit", function(event) {
    console.log("form has been submitted, ajax call....");
    event.preventDefault();
    if(!$(".tweet-box").val()) {
      alert("Cannot submit empty tweets!");
    } else if ($(".tweet-box").val().length > 140) {
      alert("Cannot submit tweet over 140 characters!");
    } else {
      $.ajax({ 
        method: "POST", 
        url: "/tweets",
        data: $("form").serialize()
      })
      .then(() => {
        loadTweets();
        $("form").trigger("reset");
        $(".counter").text(140);
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
  
$( document ).ready(function() {
  postTweets();
  loadTweets();
});

