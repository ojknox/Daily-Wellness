import { config } from "./config.js";

//Using weather API to get sunrise and sunset times for city
const weatherApiKey = config.WEATHER_API_KEY;
let city = "";
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let inputField = document.getElementById("inputlocation");
let citySubmitButton = document.getElementById("submitbutton");
let cityWarning = document.getElementById("cityWarning");

//get sunrise/sunset info when click button or press Enter
citySubmitButton.addEventListener("click", () => {
  city = inputField.value;
  runWeatherAPI();
  inputField.value = "";
});

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    city = inputField.value;
    runWeatherAPI();
    inputField.value = "";
  }
});

//Accesses weather API, converts sunrise and sunset time
const runWeatherAPI = () => {
  let apiTimes = [];
  let times = [];

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
  )
    .then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        return res.json();
      } else {
        cityWarning.style.display = "block";
      }
    })
    .then((data) => {
      apiTimes.push(data.sys.sunrise, data.sys.sunset);
      apiTimes.forEach((time) => {
        let date = new Date(time * 1000).toString();
        times.push(date.slice(16, 21));
      });

      sunrise.innerHTML = times[0];
      sunset.innerHTML = times[1];
      cityWarning.style.display = "none";
    });
};

//Inspirational quote API
let author = document.getElementById("author");
let quote = document.getElementById("quote");

fetch("https://api.goprogram.ai/inspiration")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    author.innerHTML = res.author;
    quote.innerHTML = res.quote;
  });

//NASA picture & Horoscope
const NASAApiKey = config.NASA_API_KEY;
let NASAimg = document.getElementById("NASAimg");

let sign = "";
let starSignSelect = document.getElementById("starSignSelect");
let dailyHoroscope = document.getElementById("dailyHoroscope");
let dateRange = document.getElementById("date-range");
let luckyTime = document.getElementById("lucky-time");
let signTitle = document.getElementById("starSign");
let figCaption = document.getElementById("figcaption");

//Run API when choose star sign
starSignSelect.addEventListener("change", (event) => {
  sign = event.target.value;
  getHoroscope();
});

const getHoroscope = () => {
  fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => {
      signTitle.innerHTML = sign;
      dailyHoroscope.innerHTML = json.description;
      dateRange.innerHTML = json.date_range;
      luckyTime.innerHTML = "Lucky time: " + json.lucky_time;
    });

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASAApiKey}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      figCaption.innerHTML = "&copy" + res.copyright + " - " + res.title;
      NASAimg.src = res.url;
      NASAimg.alt = "NASA astronomy picture of the day";
    });
};
