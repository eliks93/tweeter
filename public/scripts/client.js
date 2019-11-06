/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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



const createdTime = (createdAt) => {
  const currentTime = new Date(); 
  const currentSeconds = currentTime / 1000
  const seconds = createdAt.created_at / 1000
  const difference = currentSeconds - seconds;
  const minutes = difference / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = days /30
  const years = days / 365

  
  if(difference < 60) {
    return "less than a minute";
  } else if (Math.floor(minutes) < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return  `${Math.floor(hours)} hours ago`;
  } else if (days < 30) {
    return `${Math.floor(days)} days ago`
  } else if (Math.floor(months) < 12) {
    return `${Math.floor(months)} months ago`
  } else {
    return `${Math.floor(years)} years ago`
  }
}


const createTweetElement = (tweetData) => {
  const markUp =$(`
  <article class="tweets">
    <img src=${tweetData.user.avatars}>
    <span class="name">${tweetData.user.name}</span>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div>
    <p>${tweetData.content.text}</p>
  </div> 
  <footer>
      <span class="time">${createdTime(tweetData)}</span>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-flag"></i>
    </article>
`);
return markUp;
}

const renderTweet = (tweets) => {
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData); 
    $('.tweet-container').append($tweet)
  }
}

$(document).ready(function() {
  renderTweet(data)
})