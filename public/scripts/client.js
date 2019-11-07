/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



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

const escape =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

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

const renderTweet = (tweets) => {
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData); 
    $('.tweet-container').append($tweet)
  }
}

const loadTweets = function() {
  $('.tweet-container').empty();
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweet(tweets)
  })
}

$(document).ready(function() {
  $( "main" ).toggleClass('move')
  loadTweets()
  $('#show-tweet').click(function() {
    $( "main" ).toggleClass('move')
    if($('main.move')) {
       $('textarea').focus()
    }
  })
  $('textarea').on('keydown', function() {
    let keyPress = $(event.which);
    if(keyPress[0] === 13) {
      $('.submit-tweet').submit();
      $('textarea').val('')
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