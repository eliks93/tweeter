
$(document).ready(function() {
  $('textarea').on('keyup', function() {     
     let newNum = ($(this).val().length)
     let counter = $(this).parent().children()[2].innerHTML

     
     counter = 140 - newNum
     if(counter >= 0) {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '');
     } else {
      $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '#b02828')
     }

  })
  $('textarea').on('keydown', function() {     
    let newNum = ($(this).val().length)
    let counter = $(this).parent().children()[2].innerHTML

    
    counter = 140 - newNum
    if(counter >= 0) {
     $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '');
    } else {
     $(this).parent().children()[2].innerHTML = counter, $('.counter').css('color', '#b02828')
    }

 })


});