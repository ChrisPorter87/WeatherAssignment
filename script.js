// var apiKey = "0791b2dc9af57326d63bc40bd08ec24f";
// var cities = [];
// var currentWeather = document.querySelector;
// var cityInputEl = document.querySelector("#cityInput");
// var cityInput = cityInputEl.value.trim();
// var citySubmit = document.querySelector("#search-form");
// var button = document.querySelector(".button");
// var weatherDisplayEl = document.querySelector("weatherDisplay");
// var formSubmitHandler = function (event, getCityWeather) {
//   event.preventDefault();
//   var city = cityInput.value.trim();
//   if (city) {
//     getCityWeather(city);
//     weatherDisplayEl.textContent = "";
//     cityInput.value = "";
//   } else {
//     alert("Please enter a city");
//   }
// };
// button.addEventListener("click", function () {
//   cityInput = cityInputEl.value.trim();
//   // function getCityWeather(cityName) {

//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//       cityInput +
//       "&appid=" +
//       apiKey
//   ).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         // var cityName = data.name;
//         // var icon = (icon =
//         //   "<img src='https://openweathermap.org/img/w/" +
//         //   data.current.weather[0].icon +
//         //   ".png' alt='Weather icon'>");
//         // // Displays city name, weather icon, and current date pulled from moment.js
//         // currentWeather.innerHTML =
//         //   cityName + " (" + moment().format("MM/DD/YYYY") + ") " + icon;
//       });
//     } else {
//       alert("Error please enter a different city");
//       // }
//       // var liArray = [];
//       // for (let i = 0; i < 4; i++) {
//       //   var li = document.createElement("li");
//       //   li.classList.add("mb-2");
//       //   liArray.push(li);
//     }
//   });
// });

// // var showCityWeather = function (cityName) {
// //   cityInputEl.textContent = cityName;
// //   var weatherEl = document.createElement("li")
// //   weatherEl.classList = "list-item flex-row justify-space-between align-center";
// // };

// // citySubmit.addEventListener("submit", (event) => {
// //   event.preventDefault();

// //   // Removes white space from both ends of search term
// //   let searchValue = cityInput.value.trim("");

// //   // Handler if user submits form with blank field
// //   if (searchValue === "") {
// //     currentConditionsH3.textContent = "Please enter a city!";
// //     currentConditionsUl.innerHTML = "";
// //     dailyCardContainer.innerHTML = "";
// //     // Hides 5-day forecast if API won't be called
// //     fiveDayHeader.classList.add("hidden");
// //   } else {
// //     // Calls API to fetch provided value
// //     getCityWeather(searchValue);
// //     // Clears text in input
// //     cityInput.value = "";
// //   }
// // });
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
  ).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        showCityWeather(weather.main.humidity);
      });
    } else {
      alert("Error Please enter a different city");
    }
  });
});
var showCityWeather = function () {};
