$(function(){
  $('.link-container').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });


  $('.order-by-popularity').tooltip({
    title: 'Sort by popularity'
  });

  $('.order-by-alpha').tooltip({
    title: 'Sort by name'
  });

  // Don't jump
  $('a[href="#"]').click(function(ev) {
    ev.preventDefault();
  });

  $('.close-btn').click(function(ev) {
    ev.preventDefault();
    $('.known-user-box').slideUp();
  });
});