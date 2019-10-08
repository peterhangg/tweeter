// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$( document ).ready(function() {
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
  
  const renderTweets = function(tweets) {
    for(let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    };
    
  };

  renderTweets(data);
});

