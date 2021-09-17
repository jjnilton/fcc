$('.content').flowtype({ 
 minFont   : 20,
 fontRatio : 26
});

$('.author').flowtype({ 
 minFont   : 18,
 fontRatio : 28
});

$('.input').flowtype({ 
 minFont   : 40,
 fontRatio : 18
});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function() {
  $(".get-quote").click();
})


var quote;
var author; 
var source;

$(".get-quote").click(function() {
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(data) {
    $.each(data, function(key, field) {
      
      if (key == "quoteText") {
        quote = $.trim(field);
        $(".text").html('"' + quote + '"');
      }
      
      if (key == "quoteAuthor") {
        author = $.trim(field);
        if (author != "") {
          $(".author").html('&horbar; ' + author);
         } else {
           $(".author").html("Unknown");
         }
      }
      
      if (key == "quoteLink") {
        source = field;
        $(".source").html(source)
      }  
    })
    if ((quote.length + author.length) > 135) {
      if (!$('.tweet-author').hasClass('over-tweet')) {
          $('.tweet-author').toggleClass('over-tweet');
        }
    } else {
      if ($('.tweet-author').hasClass('over-tweet')) {
        $('.tweet-author').toggleClass('over-tweet');
      }
    }
    $('.text').animateCss('fadeIn');
    $('.author').animateCss('fadeIn');
    $("a.tweet").attr("href", "https://twitter.com/intent/tweet?text=" + escape(quote));
    $("a.tweet-author").attr("href", "https://twitter.com/intent/tweet?text=" + '"' + escape(quote) + '" ― ' + author);
  })
})