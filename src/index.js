function changeTemp(event){
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML="19";
}

function changeFarenheitTemp(event){
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML="66";
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


 function logResponse(response) {
 debugger;
  let now =new Date();
  let cityInfo = document.querySelector("#search");
  console.log(response.data)
  cityInfo.innerHTML = `${response.data.name} <br/> ${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()} <br/> ${response.data.weather[0].description} <br/>`;

  let temperture = document.querySelector("#temp");
  temperture.innerHTML= Math.round(response.data.main.temp);


  let weatherInfo =  document.querySelector("#weather-info");
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity}% <br/> Wind: ${Math.round(response.data.wind.speed)} km/h`;

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

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click",changeTemp )

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click",changeFarenheitTemp )

let current = document.querySelector("#current");
current.addEventListener("click",getCurrent )
 
let city = document.querySelector("#city-input");

let apiKey = "22a0bff1a7903c62ba5b8be15b070e0f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
