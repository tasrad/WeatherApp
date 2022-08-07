// Current Day and Times
function daysAndTime(){
  let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuersday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentDayAdd = document.querySelector("#current-day");
currentDayAdd.innerHTML = `${currentDay}`;
let currentHours = now.getHours();
let currentHoursAdd = document.querySelector("#current-hour");
currentHoursAdd.innerHTML = `${currentHours}`;
if (currentHours < 10){
  currentHours = `0 &{currentHours}`
};
let currentMinutes = now.getMinutes();
let currentMinutesAdd = document.querySelector("#current-minutes");
currentMinutesAdd.innerHTML = `${currentMinutes}`;
if (currentMinutes < 10){
  currentMinutes = `0 &{currentMinutes}`;
}
}
daysAndTime();

// Event Button Search
function searchInputWeather(response) {
  celsiusTemperature = response.data.main.temp
  let correctTemp = Math.round(celsiusTemperature);
  let showTemp = document.querySelector("#current-temp");
  showTemp.innerHTML = `${correctTemp}`;
  let correctCity = response.data.name;
  let windowCity = document.querySelector("#city-search");
  windowCity.innerHTML = `${correctCity}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed)
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  iconElement.setAttribute(
    "alt", response.data.weather[0].description
  )
}

function searchCityName(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b77049e9691e8c2e289bf38fe27ce568`;
  axios.get(apiUrl).then(searchInputWeather);
}


function eventButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city-input");
  let windowCity = document.querySelector("#city-search");
  windowCity.innerHTML = `${searchCity.value}`;
  let cityName = document.querySelector("#search-city-input").value;
  searchCityName(cityName);
}



let clickButton = document.querySelector("#search-button");
clickButton.addEventListener("click", eventButton);



// Button Current
function viewTempPoint(response) {
  console.log(response.data);
  let correctTemp = Math.round(response.data.main.temp);
  let windowTemp = document.querySelector("#current-temp");
  windowTemp.innerHTML = `${correctTemp}`;
  let correctCity = response.data.name;
  let windowCity = document.querySelector("#city-search");
  windowCity.innerHTML = `${correctCity}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed)
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  iconElement.setAttribute(
    "alt", response.data.weather[0].description
  )
  
}

function viewPosition(position) {
  let latit = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "b77049e9691e8c2e289bf38fe27ce568";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&
appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(viewTempPoint);
}



function eventButtonCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(viewPosition);
}

let clickCurrent = document.querySelector("#current-button");
clickCurrent.addEventListener("click", eventButtonCurrent);




function showTempFahrenheit(event){
  event.preventDefault();
  let currentTempFahrenheit = Math.round((celsiusTemperature * 9)/5 + 32)
  let windowTempFahrenheit = document.querySelector("#current-temp");
  windowTempFahrenheit.innerHTML = currentTempFahrenheit;
}

let celsiusTemperature = null;

let clickTempFahrenheit = document.querySelector("#temp-fahrenheit");
clickTempFahrenheit.addEventListener("click",showTempFahrenheit )


searchCityName("Kyiv")