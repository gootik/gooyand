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

  $('.link-container a').click(function(ev) {

    ev.preventDefault();

    var id = $(this).attr('id')
      , url = $(this).attr('href');

    $.ajax({
      url: '/click',
      data: {id: id},
      dataType: 'json',
      type: 'post',
      success: function(data) {
        window.location = url;
      },
      error: function() {
        window.location = url;
      }
    });
  });
});