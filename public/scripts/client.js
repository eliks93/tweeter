/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// function compares current time to time tweet was posted at and returns a string based on that number
const createdTime = (createdAt) => {
  const currentTime = Date.now(); 
  const currentSeconds = currentTime / 1000
  const seconds = createdAt.created_at / 1000
  const difference = currentSeconds - seconds;
  const secs = difference
  const minutes = difference / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = days /30
  const years = days / 365
  //variables above keep the if loops simple.

  if(secs < 60) {
    
    return "less than a minute";
    
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
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
// validate text inputs into our tweets to ensure they are text. Invoked in the create tweet element function
const escape =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

// creates a tweet element with all of the applicable markup

const createTweetElement = (tweetData) => {
  const markUp =$(`
  <article class="tweets">
    <img src=${tweetData.user.avatars}>
    <span class="name">${tweetData.user.name}</span>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div>
    <p>${escape(tweetData.content.text)}</p>
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
// renders all tweets contained in the tweet object database and appends them to the end of our tweet container
const renderTweet = (tweets) => {
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData); 
    $('.tweet-container').append($tweet)
  }
}

// load tweets on the page, it first empties the container so the page does not get duplicate tweets
const loadTweets = function() {
  $('.tweet-container').empty();
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweet(tweets)
  })
}
// main driver function that actually populates the page and handles the logic of the submit button when new tweet is submitted
$(document).ready(function() {
  // function toggles a class to move the new tweet container up and down when clicked
  $( "main" ).toggleClass('move')
  loadTweets()
  $('#show-tweet').click(function() {
    $( "main" ).toggleClass('move')
    if($('main.move')) {
       $('textarea').focus()
    }
  })
  // function will submit the text area when enter is pressed. also prevents enter from making new lines
  $('textarea').on('keydown', function() {
    let keyPress = $(event.which);
    if(keyPress[0] === 13) {
      event.preventDefault();
      $('.submit-tweet').submit();
    
    }
  })

  $('.submit-tweet').submit(function(event){
    event.preventDefault();
    let data = $(this).serialize()
    let counter = $('textarea').val()
    
    if(counter.length > 140) {
      $('span.error').text('Too Many Characters')
      return
    } else if (counter.length === 0) {
        $('span.error').text('Tweet submission left empty')
        return
    } else {
      
    $('span.error').text('')
    $.ajax({ type: "POST", url: '/tweets', data: data,})
      .then(function() {
        $('textarea').val('')
          loadTweets()
    })
    }
  })
});