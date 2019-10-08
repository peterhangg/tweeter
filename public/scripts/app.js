/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$( document ).ready(function() {
  const createTweetElement = (obj) => {
    let html = `<article>
      <header>
      <div class="head-name">
        <img src="${obj.user.avatars}"/>
        <span>${obj.user.name}</span>
      </div>
      <h5 class="head-username">${obj.user.handle}</h5>
      </header>
      <div class="tweet">
      ${obj.content.text}
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
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

