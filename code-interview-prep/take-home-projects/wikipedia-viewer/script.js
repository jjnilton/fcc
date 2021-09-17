var query;
var thequery;

var delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

$('input').keyup(function() {
  delay(function() {
    query = $('#search').val();
    thequery = query.replace(' ', '+');
    $('#results').empty();
    request();
  }, 750);
});

function request() {
  if (!thequery) {
    console.log("No input")
  } else {
      $.getJSON('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cinfo%7Cextracts&iwurl=1&generator=prefixsearch&redirects=1&callback=?&formatversion=2&piprop=thumbnail&pithumbsize=50&pilimit=10&wbptterms=description&inprop=url&exsentences=1&exlimit=20&exintro=1&explaintext=1&gpssearch=' + thequery + '&gpsnamespace=0&gpslimit=10').done(function(result) {
        
  var array = result.query.pages;
  $(array).each(function(index) {
    var desc = "No description";
    this.desc = desc;
    if (this.terms) {
      if (this.terms.description[0]) {
        this.desc = this.terms.description[0];
      }
    }
    $('#results').append('<a href="' + this.fullurl + '"><div class="entry"><div class="title">' + this.title + '</div><div class="desc">' + this.extract + '</div></a>');
  })
})
  }

}