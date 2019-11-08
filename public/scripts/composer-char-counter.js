
$(document).ready(function() {
  // this whole area is used to update the counter and change it's color based on if it gets to too many characters/
  $('textarea').on('keyup', function() {
    // this one checks on keyup, which allows it to update every time a key is released
    let newNum = ($(this).val().length);
    let counter = $(this).parent().children()[2].innerHTML;


    counter = 140 - newNum;
    if (counter >= 0) {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '');
    } else {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '#b02828');
    }

  });
  $('textarea').on('keydown', function() {
    // this function checks on keydown, so even if you hold the button down it will still update.
    let newNum = ($(this).val().length);
    let counter = $(this).parent().children()[2].innerHTML;

    
    counter = 140 - newNum;
    if (counter >= 0) {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '');
    } else {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '#b02828');
    }

  });


});

// note that if only one is used the keystroke is not updated perfectly dynamically.