var apiKey = "0791b2dc9af57326d63bc40bd08ec24f";
var previousSearches = document.querySelector("#previous-searches");
var cityArray = [];
var cityInputEl = document.querySelector("#cityInput");
var cityInput = cityInputEl.value.trim();
var citySubmit = document.querySelector("#search-form");
var button = document.querySelector(".button");
var weatherDisplayEl = document.querySelector("weatherDisplay");
var currentWeather = document.querySelector("#currentWeather");
var cityInputCounter = 0;
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
function getCitiesFromStorage() {
  var currentStorage = localStorage.getItem("cities");
  if (!currentStorage) {
    localStorage.setItem("cities", JSON.stringify([]));
    return [];
  }
  return JSON.parse(localStorage.getItem("cities"));
}
var moment = moment();
// this form Submit Handler might not being doing anything, could get rid of it
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
button.addEventListener("click", function () {
  cityInput = cityInputEl.value.trim();
  // function getCityWeather(cityName) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
            var uviIndex = data.current.uvi;
            console.log(uviIndex);

            console.log(data);
            var currentWeather = document.getElementById("currentWeather");
            currentWeather.innerHTML = `
            <h4>Today's date in ${cityInput} is 
               ${moment.format("MM/DD/YYYY")} <br> and the weather will be </h4>

            <p class="temperature">Temperature: ${data.current.temp}</p>
            
            <p class="humidity">Humidity: ${data.current.humidity}  %</p>
            <p class="windspeed">Wind Speed: ${data.current.wind_speed}</p>
            <p class="uvi">UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uviIndex}</span>
            </p>
            `;

            if (uviIndex >= 0 && uviIndex <= 2) {
              $("#uvIndexColor")
                .css("background-color", "#3EA72D")
                .css("color", "white");
            } else if (uviIndex >= 3 && uviIndex <= 5) {
              $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uviIndex >= 6 && uviIndex <= 7) {
              $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uviIndex >= 8 && uviIndex <= 10) {
              $("#uvIndexColor")
                .css("background-color", "#E53210")
                .css("color", "white");
            } else {
              $("#uvIndexColor")
                .css("background-color", "#B567A4")
                .css("color", "white");
            }
            console.log(data, data.current);
            var cities = data.results;
            var fiveDay = document.getElementById("fiveDay");
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
              <p> Wind Speed: ${dailyWeather[i].wind_speed}
              <img src="https://openweathermap.org/img/wn/${dailyWeather[i].weather[0].icon}.png">
              </div>
              `;
            }

            console.log("inner html:", innerHtml);
            // Set 5day div inner html
            fiveDay.innerHTML = innerHtml;
            for (var i = 0; i < 4; i++) {
              var dailyWeather = document.createElement("div");
            }
          });

          cityArray.unshift({ cityInput });
          cityInputEl.value = "";
        } else {
          alert("Please Enter a different city");
        }

        // write to localstorage
        window.localStorage.setItem("cityInfo", JSON.stringify("cityInfo"));
        var saveSearch = function () {
          localStorage.setItem("cities", JSON.stringify(cityArray));
        };
        saveSearch();
      });
    });
  cityInputEl.value = "";
});
// var saveCities = function (cityInput) {
//   console.log("gruneldjo", getCitiesFromStorage());
//   var updatedList = getCitiesFromStorage().concat(cityInput);
//   localStorage.setItem("cities", JSON.stringify(updatedList));
// };

function loadCitiesFromStorage() {
  getCitiesFromStorage().forEach(function (city) {
    //creating the html elements which will display the ingredients
    var liTag = document.createElement("li");
    liTag.textContent = city.cityInput;
    var previousSearches = document.getElementById("previousSearches");
    previousSearches.appendChild(liTag);
  });
}

cityInputCounter++;
// function showCities() {
//   var cities = JSON.parse(window.localStorage.getItem("cities")) || [];

//   cities.forEach(function (cityInput) {
//     // create li tag for each high score
//     var liTag = document.createElement("li");
//     liTag.textContent = cityInput;

//     var cityArrayDisplay = document.getElementById("previousSearches");
//     cityArrayDisplay.appendChild(liTag);
//   });
//   cityInput.id = cityInputIdCounter;
//   saveCities(cityInput);
//   cityInputCounter++;
// }
document
  .getElementById("showCities")
  .addEventListener("click", loadCitiesFromStorage);
