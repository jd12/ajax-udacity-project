function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview
  var street = $('#street').val();
  var city = $('#city').val();
  var address = street + ', ' + city;

  $greeting.text('So, you want to live at ' + address + '?');

  // YOUR CODE GOES HERE!
  var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' +
    address + '';
  $body.append('<img class="bgimg" src=" ' + streetViewUrl + '">');


  // Grab NY Times articles
  var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=f37bca1123594e56a7249384657b5f0b';

  $.getJSON(nyTimesUrl, function(data) {
    $nytHeaderElem.text("New York Times Articles About " + city);
    articles = data.response.docs;
    for (var i = 0; i < articles.length; ++i) {
      var article = articles[i];
      $nytElem.append('<li class="article">' +
                            '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' +
                      '</li>');
    }

  }).fail(function(e) {
    $nytHeaderElem.text("New York Times articles couldn't be loaded");
  });

  // wikipedia ajax request
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

  $.ajax ({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(response) {
      var articles = response[1];
      for(var i = 0; i < articles.length; i++) {
          article = articles[i];
          var url = 'http://en.wikipedia.org/wiki/' + article;
          $wikiElem.append('<li><a href="'+url+'">' + article + '</a></li>');
      }
    }
  });

  return false;
};

$('#form-container').submit(loadData);
