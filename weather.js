var x, x1, x2, x3, x4, errors, latitude, longitude, api, api2, createUlC, capBtns, box2, city, state;

/*
  ===== xReq: Request count
*/



window.addEventListener('load',() => {
	x = document.getElementById('response');
	x1 = document.getElementById('response2');
	box2 = document.getElementById('box2');
	x2 = document.getElementById('state');
	x3 = document.getElementById('forecast');
	x4 = document.getElementById('forecastRow');
	errors = document.getElementById('errors');

	loadDefaultWeather(40.730610, -73.9352425);

});

function loadDefaultWeather(lat, long){
		latitude = lat;
		longitude = long;
		api = "https://api.weather.gov/points/" + latitude + "," + longitude;

		getWeather();
}

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
	api = "https://api.weather.gov/points/" + latitude + "," + longitude;
	loadDefaultWeather(latitude, longitude);
	console.log("Latitude" + " " + latitude);
	console.log("Longitude" + " " + longitude);
}

// getUsrLocation Callback Error
function errorCallback(error){
	console.log("Error occured" + error.message);
}
//Add data to page
function fillData(){
	x2.innerHTML = city + "," + " "+ state;
}
// Count request
function reqCount(){
	xReq += 1;
	console.log(xReq);
}


function createElement(data, days){
	fillData();
	console.log(data);
	for(var i = 0; i < days; i++){
		var mkLi = document.createElement("li");
		mkLi.className = "col-sm-1";
		mkLi.innerHTML = data[i].name + " " +  data[i].shortForecast +  "<br/>" + data[i].temperature + " " + data[i].temperatureUnit + "<br/>";
		x4.appendChild(mkLi);
		console.log(days);
	}
}

/* ***** FIX: createUsCapitalsButtons Needs to go. Ul is in index.html, no need to create **** */

function createUsCapitalsButtons(capitals){
	createUlC = document.createElement('ul');
	box2.appendChild(createUlC);
	console.log(capitals);
	for(var i = 0; i < capitals.length; i++){
		createUlC.appendChild(createUlC);
		createUlC.innerHTML = "";
	}
}

	window.onerror = function (message, source, lineno, colno, error) {
				const errorMessage = `
	    <p><strong>Error:</strong> ${message}</p>
	    <p><strong>Source:</strong> ${source}</p>
	    <p><strong>Line:</strong> ${lineno}</p>
	    <p><strong>Column:</strong> ${colno}</p>
	    <p><strong>Stack Trace:</strong> ${error ? error.stack : 'N/A'}</p> `;
				errors.innerHTML += errorMessage;
				return true;
	};
	
	window.onunhandledrejection = function(event) {
  errors.innerHTML = `<p><strong>Unhandled Rejection:</strong> ${event.reason}</p>`;
  console.log('Unhandled Rejection:', event.reason);
};


function getUsCap(){
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
		createUsCapitalsButtons(data);
		console.log("U.S.capitals call");
		console.log(data);
	})
	.catch(error=>{
		console.log('Geo Location Error'+  " " + error.message);
	});

}//End getUsCap



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
		city = data.properties.relativeLocation.properties.city;
		state = data.properties.relativeLocation.properties.state;
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




