let currentTime = new Date();

function formatDate(date) {
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

function showWeather(response) {
  let name = response.data.city;
  let country = response.data.country;
  let nameElement = document.querySelector("#search-city-output");
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temp");
  let description = response.data.condition.description;
  let descriptionElement = document.querySelector("#current-description");
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#current-wind");
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#current-humidity");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  nameElement.innerHTML = `${name}, ${country}`;
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
}

//let currentLat = position.coordinates.latitude;
//let currentLong = position.coordinates.longitude;
let city = "Tokyo";
let apiKey = "bb5334ba8af33c900ec45484b2tfof2d";
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);

//Calling date and time
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDate(currentTime);
