let now = new Date();
let p = document.querySelector("#currentDate");
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

p.innerHTML = `Today is ${day}, ${month} ${date}, ${year}`;
function formatDate() {
  return new Date();
}

let apiKey = "017d56650cd168d68067850318775d43";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${searchInput.value}`;

  axios.get(`${apiUrl}&appid=${apiKey}&q=${searchInput.value}`).then(showTemp);
}
function getForecast(coordinates) {
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let temp = document.querySelector("#temp");
  let city = document.querySelector("#searched-city");
  let description = document.querySelector("#conditionDescription");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#conditionIcon");
  let tempMaxToday = document.querySelector("#day-0-high");
  let tempLowToday = document.querySelector("#day-0-low");
  tempMaxToday.innerHTML = `H:${Math.round(response.data.main.temp_max)}`;
  tempLowToday.innerHTML = `L:${Math.round(response.data.main.temp_min)}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} MPH`;
  iconElement.setAttribute(
    "class",
    getConditionIcons(response.data.weather[0].main)
  );
  getForecast(response.data.coord);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
        <i class="${getConditionIcons("rain")}"></i>
        <div class="weather-forecast-temperatures">
          <span class="forecast-temp-max"> 18° </span>
          <span class="forecast-temp-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getConditionIcons(weather) {
  const obj = {
    rain: "fa-solid fa-cloud-showers-heavy",
    sun: "fa-solid fa-sun",
    clouds: "fa-solid fa-cloud-sun",
    thunderstorm: "fa-solid fa-cloud-bolt",
    drizzle: "fa-solid fa-cloud-rain",
    snow: "fa-solid fa-snowflake",
    clear: "fa-solid fa-sun",
    mist: "fa-solid fa-cloud-showers-heavy",
    smoke: "fa-solid fa-smog",
    smog: "fa-solid fa-smog",
    fog: "fa-solid fa-smog",
    haze: "fa-solid fa-smog",
    dust: "fa-solid fa-smog",
    sand: "fa-solid fa-smog",
    ash: "fa-solid fa-volcano",
    tornado: "fa-solid fa-tornado",
  };
  return obj[weather.toLowerCase()];
}
function showPosition(position) {
  let h1 = document.querySelector("#searched-city");
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  axios.get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${long}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

navigator.geolocation.getCurrentPosition(showPosition);
