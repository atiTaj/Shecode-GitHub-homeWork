function changeCelsiusTemp(event){
  event.preventDefault();
    celsius.classList.add("active");
  farenheit.classList.remove("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML= celsiusTemp;
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

 function logResponse(response) {
 debugger;
  let cityInfo = document.querySelector("#search");
  console.log(response.data)
  cityInfo.innerHTML = `${response.data.name} <br/> ${formatDate(response.data.dt * 1000)} <br/> ${response.data.weather[0].description} <br/>`;

  let temperture = document.querySelector("#temp");
  temperture.innerHTML= Math.round(response.data.main.temp);


  let weatherInfo =  document.querySelector("#weather-info");
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity}% <br/> Wind: ${Math.round(response.data.wind.speed)} km/h`;
 celsiusTemp = Math.round(response.data.main.temp);
 
  let icon =  document.querySelector("#icon");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) ;
  icon.setAttribute("alt" , response.data.weather[0].description);
 
}

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let button = document.querySelector("button");
button.addEventListener("click", search);
let celsiusTemp = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click",changeCelsiusTemp )

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click",changeFarenheitTemp )

let current = document.querySelector("#current");
current.addEventListener("click",getCurrent )
 
let city = document.querySelector("#city-input");

let apiKey = "22a0bff1a7903c62ba5b8be15b070e0f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;