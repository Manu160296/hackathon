$(document).ready(function() {
  var index = 0;
  showImage(index);

  $('.prev').click(function() {
    hideImage(index);
    index--;
    if (index === -1) {
      index = 4;
    }
    showImage(index);
  });

  $('.next').click(nextImage);

  $('input[type=\'radio\']').click(function() {
    hideImage(index);
    index = $(this).val();
    showImage(index);
  });

  setInterval(nextImage, 5000);

  function nextImage() {
    hideImage(index);
    index++;
    if (index === 5) {
      index = 0;
    }
    showImage(index);
  }

  function hideImage(index) {
    $(('.container-img div:eq(' + index + ')')).css('display', 'none');
  }

  function showImage(index) {
    $(('.container-img div:eq(' + index + ')')).fadeIn('slow');
    $('input[value=' + index + ']').prop('checked', 'checked');
  }
});