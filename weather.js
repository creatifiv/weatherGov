var x, x1, latitude, longitude, api, api2;


latitude = null;
longitude = null;
api = "https://api.weather.gov/points/" + latitude + "," + longitude;
api2 = "";


window.addEventListener('load',() => {
	x = document.getElementById('response');
	x1 = document.getElementById('response2');
});


function getUsrLocation(){
	if ("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  		console.log("Geolocation is available.");
	} else {
  		console.log("Geolocation is not supported by this browser.");
	}
}

// getUsrLocaion callback
function successCallback(position){

	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log("Latitude" + " " + latitude);
	console.log("Longitude" + " " + longitude);
}
// getUsrLocation Callback Error
function errorCallback(error){
	console.log("Error occured" + error.message)
}


function createElement(data, days){

	var mkUl = document.createElement("ul");
	document.body.appendChild(mkUl);
	console.log(data);
	for(var i = 0; i < days; i++){
		var mkLi = document.createElement("li");
		mkLi.innerHTML = data[i].name + " " +  data[i].shortForecast + "" + " " + data[i].temperature + " " + data[i].temperatureUnit;
		mkUl.appendChild(mkLi);
		console.log(days);
	}

}


function getDefLocations(){

	fetch("./us_capitals.json", {
		method: 'GET'
	})
	.then(response =>{
		if(!response.ok){
			throw new Error("Network response was not ok");
		}
		return response.json();
	})
	.then(data => {
		console.log("U.S.capitals call");
		console.log(data);
	})
	.catch(error=>{
		console.log('Geo Location Error'+  " " + error.message);
	});

}//End geoLoaction



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
		console.log(data);
		return fetch(api2);
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
		createElement(dR, dR.length);
		//x.innerHTML = JSON.stringify(dR, null, 2);
		console.log("Dat2");
		console.log(data2);
	})
	.catch(error=>{
		console.log('Error'+  " " + error.message);
	});

}




