// today card data
let Today = document.getElementById('today');
let todayDate = document.getElementById('today-date');
let Location = document.getElementById('location');
let tempDay = document.getElementById('tempereture');
let todayIcon = document.getElementById('todayIcon');
let todayDescription = document.getElementById('todayDesc');
let todayHumidty = document.getElementById('humidty');
let todayWind = document.getElementById('wind');
let windDirection = document.getElementById('windDir');
let arrMonth =  ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
let arrDay = ['sunday', 'munday', 'tuseday', 'wednesday', 'thursday','fraiday', 'saturday'];
let search_bar = document.getElementById('searchBar');
// next day variable
let nextDay = document.getElementsByClassName('nextDay')
// console.log(nextDay);
let  nextIcon = document.getElementsByClassName('nextIcon');
let maximumDegree = document.getElementsByClassName('maxDegree');
let minimumDegree = document.getElementsByClassName('minDegree')
let nextDiscriotion = document.getElementsByClassName('nextDisc')
let clickBtn = document.getElementById('click-btn')
let eventBtn = document.getElementById('event-btn');
let textBox =document.getElementById('text-box');
let emailInput = document.getElementById('email-input');
currentCity = "cairo",
getWeatherData();

// get data
async function getWeatherData(){
    //  apiResponse =await fetch('https://api.weatherapi.com/v1/forecast.json?key=e06609e460aa41ea828155107231906&q=cairo&days=3')
     apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e06609e460aa41ea828155107231906&q=${currentCity}&days=3`)
     weatherData =await apiResponse.json()
     console.log(weatherData)
     displayDataToday();
     displsyNextDay();
     getCoordintes();
}

// today data
let day = new Date();
function displayDataToday(){
    Today.innerHTML=arrDay[day.getDay()];
    todayDate.innerHTML=`${day.getDate()} ${arrMonth[day.getMonth()]}`;
    Location.innerHTML=weatherData.location.name;
    tempDay.innerHTML=weatherData.current.temp_c;
    todayIcon.setAttribute('src', `https:${weatherData.current.condition.icon}`);
    todayDescription.innerHTML=weatherData.current.condition.text;
    todayHumidty.innerHTML=weatherData.current.humidity;
    todayWind.innerHTML=weatherData.current.wind_kph;
    windDirection.innerHTML=weatherData.current.wind_dir
    console.log(day.getDay());
}

// next day
function displsyNextDay(){
    for(let i=0; i<nextDay.length; i++){
        nextDay[i].innerHTML =arrDay [new Date(weatherData.forecast.forecastday[i+1].date).getDay()] ;
        nextIcon[i].setAttribute('src',`https:${weatherData.forecast.forecastday[i+1].day.condition.icon}`);
        maximumDegree[i].innerHTML=weatherData.forecast.forecastday[i+1].day.maxtemp_c;
        minimumDegree[i].innerHTML=weatherData.forecast.forecastday[i+1].day.mintemp_c;
        nextDiscriotion[i].innerHTML=weatherData.forecast.forecastday[i+1].day.condition.text;
    }
}

// search 
// search_bar.addEventListener('keyup', function(){
//     currentCity=search_bar.value ;
//     console.log(currentCity);
//     getWeatherData(currentCity)
// })

clickBtn.addEventListener('click',function(){
    currentCity=search_bar.value ;
    getWeatherData(currentCity)
    search_bar.value='';
})

eventBtn.addEventListener('click',function(){
    // alert('welcome')
    let message = emailInput.value;
    textBox.innerHTML='thanks for your subscribe';
    emailInput.value='';
    let time = setTimeout(function(){
        textBox.innerHTML='';
    },3000)
})

// location name
// Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.bd2057b41036177ac69e3de1d56cc54f&lat=" +

	lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			console.log(city);
			return;
		}
	}
}

getCoordintes();
