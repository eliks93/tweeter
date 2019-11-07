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
  if(difference < 60) {
    return "less than a minute";
  } else if (difference < 3600) {
    return `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    return  `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2592000) {
    return `${Math.floor(difference / 86400)} days ago`
  } else if (difference < 31104000) {
    return `${Math.floor(difference / 2592000)} months ago`
  } else {
    return `${Math.floor(difference / 31104000)} years ago`
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


// main functionality inside doucment ready. ensures that all data is loaded before functions are invoked.

$(document).ready(function() {

  //auto-expand for text area... it works, however it does keep adding rows for each extra row you make. Not hugely important given text limit, but if somone had small screen and pasted 5000 characters in it would screw with the formatting severely. 
  $(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        let savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        let minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 12);
        this.rows = minRows + rows;
    });


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
  // handles the submission logic of tweets. Is invoked any time the submit button is pressed or triggered by pressing enter
  $('.submit-tweet').submit(function(event){
    event.preventDefault();
    let data = $(this).serialize()
    // checks to see if 0 characters have been entered or too many charcters have been entered and prevents the submission of the form and reload of tweets.
    let counter = $('textarea').val()
    
    if(counter.length > 140) {
      $('span.error').text('Too Many Characters')
      return
    } else if (counter.length === 0) {
        $('span.error').text('Tweet submission left empty')
        return
    } else {
      // the actual submission of the tweets. the error code is set to an empty string to get rid of it when there is no error which will be the case if the function runs this far
    $('span.error').text('')
    $.ajax({ type: "POST", url: '/tweets', data: data,})
      .then(function() {
        // resets the text area upon successful submission. The text area will not alter the text if an error is triggered.
        $('textarea').val('')
        $('.counter').text('140')
          loadTweets()
    })
    }
  })
});