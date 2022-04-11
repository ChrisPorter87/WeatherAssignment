var apiKey = "0791b2dc9af57326d63bc40bd08ec24f";
var previousSearches = document.querySelector("#previous-searches");
var cityArray = [];
var cityInputEl = document.querySelector("#cityInput");
var cityInput = cityInputEl.value.trim();
var citySubmit = document.querySelector("#search-form");
var button = document.querySelector(".button");
var weatherDisplayEl = document.querySelector("weatherDisplay");
var currentWeather = document.querySelector("#currentWeather");
var lat = "";
var lon = "";
// let previousSearch = JSON.parse(localStorage.getItem("searches"));
// // Removes any null results stored in localStorage
// if (previousSearch !== null) {
//   for (let i = 0; i < previousSearch.length; i++) {
//     if (previousSearch[i] === null) {
//       previousSearch.splice(i, i + 1);
//     } else {
//       // Populates localCityArray to publish previous search buttons
//       cityArray.push(previousSearch[i]);
//     }
//   }
// }
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
              // }
              // var updateLocalStorage = (city) => {
              //   // Ensures searched city isn't pushed into array (and then localStorage) if city has already been searched
              //   if (cityArray.includes(city)) {
              //     return;
              //   } else {
              //     cityArray.push(city);

              //     // Stores for next user visit
              //     localStorage.setItem("searches", JSON.stringify(cityArray));

              //     // Calls updateSearchHistory to add new search to previous search buttons
              //     updateSearchHistory();
              //   }
            }

            // Pulls in previous searches from localStorage
            // let previousSearch = JSON.parse(localStorage.getItem("searches"));

            // // Removes any null results stored in localStorage
            // if (previousSearch !== null) {
            //   for (let i = 0; i < previousSearch.length; i++) {
            //     if (previousSearch[i] === null) {
            //       previousSearch.splice(i, i + 1);
            //     } else {
            //       // Populates localCityArray to publish previous search buttons
            //       cityArray.push(previousSearch[i]);
            //     }
            //   }
            // }
          });

          cityArray.unshift({ cityInput });
          cityInputEl.value = "";
        } else {
          alert("Please Enter a different city");
        }
        var cityName =
          JSON.parse(window.localStorage.getItem("cityInfo")) || [];

        // data structure for new scores
        // var newInfo = {
        //   score: seconds,
        //   initials: initials,
        // };

        // write to localstorage
        window.localStorage.setItem("cityInfo", JSON.stringify("cityInfo"));
        var saveSearch = function () {
          localStorage.setItem("cities", JSON.stringify(cityArray));
        };

        function showCities() {
          var highscores =
            JSON.parse(window.localStorage.getItem("cities")) || [];

          highscores.forEach(function (score) {
            // create li tag for each high score
            var liTag = document.createElement("li");
            liTag.textContent = score.initials + " - " + score.score;

            var cityArrayDisplay = document.getElementById("previous-searches");
            cityArrayDisplay.appendChild(liTag);
          });
          showCities();
        }
      });
    });
});
