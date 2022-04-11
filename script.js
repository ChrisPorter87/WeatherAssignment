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
var currentWeather = document.querySelector("#currentWeather");
var lat = "";
var lon = "";

var moment = moment();
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
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      lat = response[0].lat;
      lon = response[0].lon;
      console.log(response);
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          response[0].lat +
          "&lon=" +
          response[0].lon +
          "&appid=" +
          apiKey +
          "&units=imperial"
      ).then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            var currentWeather = document.getElementById("currentWeather");
            currentWeather.innerHTML = `

            <h4>
              ${cityInput} ${moment.format("MM/DD/YYYY")}  </h4>
            <p class="temperature">Temperature: ${data.current.temp}</p>
            
            <p class="humidity">Humidity: ${data.current.humidity}  %</p>
            <p class="windspeed">Wind Speed: ${data.current.wind_speed}</p>
            <p class="uvi">UV Index: ${data.current.uvi}</p>
            `;

            var fiveDay = document.getElementById("5day");
            // Data response includes array of daily weather
            // Loop through data.daily array to grab next x days
            var dailyWeather = data.daily;

            var innerHtml = ``;
            // Loop that goes through daily array, stops at 5

            //DJC create html elements
            //get list of elements
            //loop through them with similar for loop to below
            //add data to different element each time
            for (var i = 0; i < 5; i++) {
              // Convert timestamp to day
              var day = new Date(
                dailyWeather[i].dt * 1000
              ).toLocaleDateString();
              console.log("Current Day in Loop", day);
              console.log(
                "CURRENT DAY Humidity IN LOOP: ",
                dailyWeather[i].humidity
              );
              // TODO: Figure out way to concatenate strings for each loop iteration

              //djc this will add to different html element every loop
              innerHtml += `
              <div class="col-md-2">
              <h5>
              Day: ${day}
              </h5>
              <p>
              Humidity: ${dailyWeather[i].humidity}%
              </p>
              <p> Temperature: ${dailyWeather[i].temp.day}
              <img src=https://openweathermap.org/img/wn/${dailyWeather[0].weather[0].icon}.png>
              </div>
              `;
            }

            console.log("inner html:", innerHtml);
            // Set 5day div inner html
            fiveDay.innerHTML = innerHtml;
            for (var i = 0; i < 5; i++) {
              var dailyWeather = document.createElement("div");
              // dailyWeather.innerHTML = `
              // <div class="col-md-2">
              // <h5>
              // Day: ${"MM/DD/YYYY"}
              // </h5>
              // <p>
              // Humidity: ${dailyWeather[i].humidity}%
              // </p>
              // <p> Temperature: ${dailyWeather[i].temp.day}
              // </div>
              // `;
            }
          });
        } else {
        }
      });
    });
});
