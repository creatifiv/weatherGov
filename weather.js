var x = document.getElementById('response');
var x1 = document.getElementById('response2');
var latitude = 33.5194683
var longitude = -84.6528242
var dataLoad = null

window.addEventListener('load',() => {

	if ("geolocation" in navigator && (latitude && longitude == 0)) {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  		console.log("Geolocation is available.");
	} else {
  		console.log("Geolocation is not supported by this browser.");
	}

});

function successCallback(position){

	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log("Latitude" + " " + latitude);
	console.log("Longitude" + " " + longitude);
}

function errorCallback(error){
	console.log("Error occured" + error.message)
}


var api = "https://api.weather.gov/points/" + latitude + "," + longitude;

var api2 = "";


function createElement(data, days){

	var mkUl = document.createElement("ul");
	document.body.appendChild(mkUl);
	console.log(data);
	for(var i = 0; i <= days; i++){
		var mkLi = document.createElement("li");
		mkLi.innerHTML = data[i].name + " " +  data[i].shortForecast + "" + " " + data[i].temperature + " " + data[i].temperatureUnit;
		mkUl.appendChild(mkLi);
		console.log(days);
	}

}



function getWeather(){
	
	fetch(api, {
		method:'GET',
		headers: {
			'User-Agent': 'MyWeatherApp (haywardwilliams@gmail.com)'
		}
	})
	.then(response => {

		if(!response.ok){
			throw new Error("Network response 1 was not ok");
		}

		return response.json()
	})
	.then(data => {
		api2 = data.properties.forecast
		console.log("2nd API address" + " " + api2);
		return fetch(api2)
	})
	.then(response => {

		if (!response.ok){
			throw new Error("Network response 2 was not ok");
		}
		return response.json();
	})
	/*	
		=== Definitions ===
		dR = "Data returned"
	*/

	.then(data2 => {
		var dR =  data2.properties.periods;

		createElement(dR, dR.length)
		console.log(data2);
		x.innerHTML = JSON.stringify(dR.detailedForecast + dR, null, 2);
	})

	.catch(error=>{
		console.log('Error'+  " " + error.message);
	});

}




