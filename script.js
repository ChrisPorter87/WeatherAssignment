var apiKey = "0791b2dc9af57326d63bc40bd08ec24f";
var getCityWeather = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" +
    cityName +
    "&appid=" +
    apiKey;
  fetch(apiUrl);
};
getCityWeather();
