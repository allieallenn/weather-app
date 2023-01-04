let forecast = [
  {
    day: "monday",
    temp: 55,
  },
  {
    day: "tuesday",
    temp: 56,
  },
  {
    day: "wednesday",
    temp: 56,
  },
  {
    day: "thursday",
    temp: 56,
  },
  {
    day: "friday",
    temp: 56,
  },
  {
    day: "saturday",
    temp: 56,
  },
  {
    day: "sunday",
    temp: 56,
  },
];
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
// let city = prompt("Enter a city")
// let cityObj = weather[city.toLowerCase()]
// console.log(cityObj)
// if (cityObj === undefined) {
//   alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)
// } else {
// let temp = cityObj.temp
// let cityName = Math.round(cityObj.temp)
// let tempCel = Math.round((temp - 32 * 5) / 9)

//   alert(`It is currently ${cityName}°F (${tempCel}°C) in ${city} with a humidity of ${cityObj.humidity}% .`)
// }
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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${searchInput.value}`;

  axios.get(`${apiUrl}&appid=${apiKey}&q=${searchInput.value}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let apiKey = "017d56650cd168d68067850318775d43";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial";

function showTemp(response) {
  let temp = document.querySelector("#temp");
  let city = document.querySelector("#searched-city");
  let description = document.querySelector("#currentCondition");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  // let icon = document.querySelector(".conditionIcon");
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  city.innerHTML = response.data.name;
  console.log(response.data);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} MPH`;
}
// unit conversion weather icon are mandatory.
function showPosition(position) {
  let h1 = document.querySelector("#searched-city");
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  axios.get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${long}`).then(showTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (14 * 9) / 5 + 32;
  let tempElement = document.querySelector(".currentTemp");
  tempElement.innerHTML = fahrenheitTemp;
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".currentTemp");
  tempElement.innerHTML = celsiusTemp;
}

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", displayCelsiusTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahreinheitUnit.addEventListener("submit", displayFahrenheitTemp);

navigator.geolocation.getCurrentPosition(showPosition);
