var apiKey = "0791b2dc9af57326d63bc40bd08ec24f";
var cities = [];
var cityInputEl = document.querySelector("#cityInput");
var cityInput = cityInputEl.value.trim();
var citySubmit = document.querySelector("#search-form");
var button = document.querySelector(".button");
var weatherDisplayEl = document.querySelector("weatherDisplay");
var formSubmitHandler = function (event, getCityWeather) {
  event.preventDefault();
  var city = cityInput.value.trim();
  if (city) {
    getCityWeather(city);
    weatherDisplayEl.textContent = "";
    cityInput.value = "";
  } else {
    alert("Please enter a city");
  }
};
button.addEventListener("click", function () {
  cityInput = cityInputEl.value.trim();
  // function getCityWeather(cityName) {

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => alert("Wrong city name!"));
});

var showCityWeather = function () {};

// citySubmit.addEventListener("submit", (event) => {
//   event.preventDefault();

//   // Removes white space from both ends of search term
//   let searchValue = cityInput.value.trim("");

//   // Handler if user submits form with blank field
//   if (searchValue === "") {
//     currentConditionsH3.textContent = "Please enter a city!";
//     currentConditionsUl.innerHTML = "";
//     dailyCardContainer.innerHTML = "";
//     // Hides 5-day forecast if API won't be called
//     fiveDayHeader.classList.add("hidden");
//   } else {
//     // Calls API to fetch provided value
//     getCityWeather(searchValue);
//     // Clears text in input
//     cityInput.value = "";
//   }
// });
