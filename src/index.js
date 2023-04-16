function changeCelsiusTemp(event){
  event.preventDefault();
    celsius.classList.add("active");
  farenheit.classList.remove("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML= celsiusTemp;
}

function setFirstWeatherIcon(){
let nowTimestamp = new Date();
let hours = nowTimestamp.getHours();
let firstIcon = document.querySelector("#icon")
if( hours > 5 && hours < 17){
  firstIcon.setAttribute("src","images/sun.svg");
}

}
function changeFarenheitTemp(event){
  event.preventDefault();
  celsius.classList.remove("active");
  farenheit.classList.add("active");
  let temp = document.querySelector("#temp");
  let changedTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML= Math.round(changedTemp);
}

function getCurrent(event){
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(changeToCurrent);
}

function changeToCurrent(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  debugger;
  axios.get(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`).then(logResponse);
}

function search(event){
  event.preventDefault();
  axios.get(`${apiUrl}&appid=${apiKey}&q=${city.value}`).then(logResponse);
}

function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
let day = date.getDay();
return`${days[day]} ${hours}:${minutes}`;
}


function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
return days[day];
}

function displayForecast(response){
  let forecastResponse = response.data.daily;
  let forecast = document.querySelector('#forecast');
  let forecastHtml = `<div class="row">`;

  forecastResponse.forEach(function (forecastDay , index ){
    if(index < 6){
       forecastHtml = forecastHtml +  `
              <div class="col-2">
                <div class="forcast-date">${formatDay(forecastDay.dt)}</div>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" id="forcast-icon"/>
                <div class="forcast-temp">
                  <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
                  <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div>
            `;
    }

  })

  forecastHtml = forecastHtml +`</div>`;
  forecast.innerHTML = forecastHtml;
}

function getForecast(coordinates){  
// forecast weather api
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

 function logResponse(response) {
  let cityInfo = document.querySelector("#search");
  cityInfo.innerHTML = `${response.data.name} <br/> ${formatDate(response.data.dt * 1000)} <br/> ${response.data.weather[0].description} <br/>`;

  let temperture = document.querySelector("#temp");
  temperture.innerHTML= Math.round(response.data.main.temp);


  let weatherInfo =  document.querySelector("#weather-info");
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity}% <br/> Wind: ${Math.round(response.data.wind.speed)} km/h`;
 celsiusTemp = Math.round(response.data.main.temp);
 
  let icon =  document.querySelector("#icon");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) ;
  icon.setAttribute("alt" , response.data.weather[0].description);
  getForecast(response.data.coord);
}


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
debugger
setFirstWeatherIcon();
let button = document.querySelector("button");
button.addEventListener("click", search);
let celsiusTemp = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsiusTemp);

window.addEventListener("load",  getCurrent )


let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeFarenheitTemp)

let current = document.querySelector("#current");
current.addEventListener("click", getCurrent)
 
let city = document.querySelector("#city-input");

// weather api
let apiKey = "22a0bff1a7903c62ba5b8be15b070e0f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;