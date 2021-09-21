var temp = 0;
var newtemp = 0;
var icon = null;
var iconClass;


$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done(function(location) {
  $('#latitude').html(location.latitude);
  $('#longitude').html(location.longitude);
  console.log(location.city);
  $('.city').html(location.city + ", " + location.state);
  $('#unit').html("&#8451");
})


$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=-12.25&lon=-38.95&appid=e3b9fe0e000926c5fd677b2dc86812a9&units=metric&callback=?').done(function(weather) {
  $('#dt').html(weather.dt);
  var time = weather.dt;
  $('#time').html(new Date(time*1000).toString());
  var sunrise = weather.sys.sunrise;
  var sunset = weather.sys.sunset;
  if (time >= sunrise && time <= sunset) {
    $('body').toggleClass('day');
  } else {
    $('body').toggleClass('night');
  }
  $('#city').html(weather.name);
  temp = parseFloat(weather.main.temp.toFixed(1));
  $('#temp').html(temp);
  $('#desc').html(weather.weather[0].description.replace(/^[a-z]/g, function(character) {
    return character.toUpperCase();
  }));
  newtemp = parseFloat(((temp*9)/5+32).toFixed(1));
  $('#newtemp').html(newtemp);
  icon = weather.weather[0].icon;
  $('#icon').html(icon);
  changeIcon();
})

function toggleUnit() {
  if ($('#temp').hasClass('celsius')) {
    $('#temp').toggleClass('celsius');
    $('#unit').html('&#8457');
    $('#temp').html(newtemp)
  } else {
    $('#temp').toggleClass('celsius')
    $('#unit').html('&#8451');
    $('#temp').html(temp)
  }
}
toggleUnit();

function changeIcon() {
  switch(icon) {
    case '01d':
      iconClass = 'wi-day-sunny';
      break;
    case '02d':
      iconClass = 'wi-day-cloudy';
      break;
    case '03d':
      iconClass = 'wi-cloud';
      break;
    case '04d':
      iconClass = 'wi-cloudy';
      break;
    case '09d':
      iconClass = 'wi-rain';
      break;
    case '10d':
      iconClass = 'wi-day-rain';
      break;
    case '11d':
      iconClass = 'wi-thunderstorm';
      break;
    case '13d':
      iconClass = 'wi-snow';
      break;      
    case '50d':
      iconClass = 'wi-fog';
      break;
    case '01n':
      iconClass = 'wi-night-clear';
      break;
    case '02n':
      iconClass = 'wi-night-cloudy';
      break;
    case '03n':
      iconClass = 'wi-cloud';
      break;
    case '04n':
      iconClass = 'wi-cloudy';
      break;
    case '09n':
      iconClass = 'wi-rain';
      break;
    case '10n':
      iconClass = 'wi-night-rain';
      break;
    case '11n':
      iconClass = 'wi-thunderstorm';
      break;
    case '13n':
      iconClass = 'wi-snow';
      break;
    case '50n':
      iconClass = 'wi-fog';
  }
  $('#icon-img').addClass(iconClass);
}

$('#time').click(function() {
  $(this).html('Made for FCC - Powered by jQuery, BootStrap and GeoIP Database')
})