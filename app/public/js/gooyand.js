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


  $('.order-by-alpha').click(function() {
    var parent = $(this).parent()
      , box_name = $(this).parent().data('sort')
      , container = $('#' + box_name);

    parent.find('a').removeClass('selected');
    $(this).addClass('selected');

    container
      .find('.ordered')
      .remove();

    container
      .children('div')
      .show();
  });

  $('.order-by-popularity').click(function() {
    var parent = $(this).parent()
      , box_name = parent.data('sort')
      , container = $('#' + box_name)
      , links = container.find('li')
      ;

      parent.find('a').removeClass('selected');
      $(this).addClass('selected');

      links = links.clone();

      links.sort(function(a,b) {
        var clicks_a = parseInt($(a).data('numclicks'))
          , clicks_b = parseInt($(b).data('numclicks'))
          ;
        return clicks_b - clicks_a;
      });

      var oldDiv = container.children('div')
        , newDiv = $('<div class="ordered link-container">')
        , list = $('<ul>');

      oldDiv
        .hide();

      list
        .append(links);

      newDiv
        .append(list)
        .addClass(oldDiv.attr('class'));

      container
        .append(newDiv);
  });
});