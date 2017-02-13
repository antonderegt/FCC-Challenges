var lat;
var long;
var weatherText;
var foreCast;
const CELCIUS = 1;
const FAHRENHEIT = 0;
var units = CELCIUS;

// Get latitude and longitude
if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // $("#latlng").html("latitude: " + lat + "<br>longtitude: " + long);
    showPosition(position);
    getWeatherData();
  },showError)
}

// Show map of location
function showPosition(position) {
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=350x150&sensor=false";
  document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

// Show error
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
    x.innerHTML = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    x.innerHTML = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    x.innerHTML = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    x.innerHTML = "An unknown error occurred."
    break;
  }
}

// Weather API call
function getWeatherData(){
  $.ajax({
    url: 'https://simple-weather.p.mashape.com/weatherdata',
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {"lang":"en","lat":lat, "lng":long}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
      foreCast = data.query.results.channel.item.forecast[1];
      currentConditions = data.query.results.channel.item.condition;
      weatherText = currentConditions.text;
      // console.dir((data.source));
      $("#forecastTomorrow").html("Tomorrow "+ foreCast.date + " the temperature will be between: <strong>" + foreCast.high + "</strong> and <strong>" + foreCast.low + "</strong> degrees Celcius.");
      $("#temp").html("Right now it is <strong>" + currentConditions.temp + "</strong> degrees Celcius with " + weatherText + ".");
      addIcon(weatherText);
      console.log(data);
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "0CIAzMeFPzmshthqMbQCotbTJLoIp1kRQ8OjsneQ3LuWAwY48i"); // Enter here your Mashape key
    }
  });
}

function addIcon(weather){
  switch(weather){
    case "Shower":
    $("#weatherIcon").addClass("fa-shower");
    break;
    case "Scattered Showers":
    $("#weatherIcon").addClass("fa-shower");
    break;
    case "Rain":
    $("#weatherIcon").addClass("fa-tint");
    break;
    case "Sunny":
    $("#weatherIcon").addClass("fa-sun-o");
    break;
    case "Breezy":
    $("#weatherIcon").addClass("fa-pagelines");
    case "Clear":
    $("#weatherIcon").addClass("fa-sun-o");
    break;
    case "Cloudy":
    $("#weatherIcon").addClass("fa-cloud");
    break;
    case "Mostly Cloudy":
    $("#weatherIcon").addClass("fa-cloud");
    break;
    case "Snow":
    $("#weatherIcon").addClass("fa-snowflake-o");
    break;
    case "Thunderstorms":
    $("#weatherIcon").addClass("fa-bolt");
    break;
    case "Scattered Thunderstorms":
    $("#weatherIcon").addClass("fa-bolt");
    break;
    default:
    $("#weatherIcon").addClass("fa-thermometer-three-quarters");
  }
}

$("#switchUnits").click(function(){
  if(units){
    $("#forecastTomorrow").html("Tomorrow "+ foreCast.date + " the temperature will be between: <strong>" + Math.floor((foreCast.high * 1.8)+ 32) + "</strong> and <strong>" + Math.floor((foreCast.low * 1.8)+ 32) + "</strong> degrees Celcius.");
    $("#temp").html("Right now it is <strong>" + Math.floor((currentConditions.temp * 1.8)+ 32) + "</strong> degrees Celcius with " + weatherText + ".");
    units = FAHRENHEIT;
    $("#switchUnits").html("Switch to C");
  } else {
    $("#forecastTomorrow").html("Tomorrow "+ foreCast.date + " the temperature will be between: <strong>" + foreCast.high + "</strong> and <strong>" + foreCast.low + "</strong> degrees Celcius.");
    $("#temp").html("Right now it is <strong>" + currentConditions.temp + "</strong> degrees Celcius with " + weatherText + ".");
    units = CELCIUS;
  }
});
