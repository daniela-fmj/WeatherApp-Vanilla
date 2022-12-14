let currentTime = new Date();

function formatDate(date) {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} | ${currentHours}:${currentMinutes}`;
  return formattedDate;
}

function formatUpdate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let days = ["Tue", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class ="card-group">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="card text-center">
        <div class="card-header day1">${day}</div>
        <div class="card-body">
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            id="icon-day1"
            class="icon-day1"
          />
          <div class="card-text high-low">
            <span class="weather-forecast-high1">21°</span>
            <span class="weather-forecast-low1">12°</span>
          </div>
        </div>
      </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celUnit.classList.remove("active");
  farUnit.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  celUnit.classList.add("active");
  farUnit.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function showWeather(response) {
  let name = response.data.city;
  let country = response.data.country;
  let nameElement = document.querySelector("#search-city-output");
  let countryElement = document.querySelector("#search-country-output");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#current-description");
  let windElement = document.querySelector("#current-wind");
  let humidityElement = document.querySelector("#current-humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let upDateElement = document.querySelector("#updated-time");
  let iconElement = document.querySelector("#icon");

  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.temperature.humidity;
  let feelsLike = Math.round(response.data.temperature.feels_like);

  celsiusTemperature = response.data.temperature.current;

  nameElement.innerHTML = `${name}`;
  countryElement.innerHTML = `${country}`;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${wind} km/h`;
  humidityElement.innerHTML = `${humidity}%`;
  feelsLikeElement.innerHTML = `${feelsLike}°`;
  upDateElement.innerHTML = formatUpdate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchOutput(city) {
  let apiKey = "bb5334ba8af33c900ec45484b2tfof2d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  searchOutput(cityName.value);
}

let celsiusTemperature = null;

//Calling date and time
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDate(currentTime);

//Replacing city name
let citySearch = document.querySelector("#city-name");
citySearch.addEventListener("submit", submitCity);

//Celsius-Fahrenheit

let celUnit = document.querySelector("#celsius-link");
celUnit.addEventListener("click", convertToCelsius);

let farUnit = document.querySelector("#fahrenheit-link");
farUnit.addEventListener("click", convertToFahrenheit);

searchOutput("Boston");
displayForecast();
