var x, x1, x2, x3, x4, x5, x6, x9, latitude, longitude, api, api2, createUlC, capBtns, box2, city, state, dayCount, mkLi, day1, day2, day3, day4, day5, day6, day7;

/*
  ===== xReq: Request count
*/


window.addEventListener('load',() => {
	x = document.getElementById('response');
	x1 = document.getElementById('response2');
	x2 = document.getElementById('state');
	x3 = document.getElementById('forecast');
	x4 = document.getElementById('forecastRow');
	x5 = document.getElementById('mock-console');
	x6 = document.getElementById('log');
	x7 = document.getElementById('log-output');
	x8 = document.getElementById('response-data');
	x9 = document.getElementById('test-log');
	box2 = document.getElementById('box2');
	day1 = document.getElementById('day-1');
	day2 = document.getElementById('day-2');
	day3 = document.getElementById('day-3');
	day4 = document.getElementById('day-4');
	day5 = document.getElementById('day-5');
	day6 = document.getElementById('day-6');
	day7 = document.getElementById('day-7');
	
	
	loadDefaultWeather();
});

function loadDefaultWeather(){
		latitude = 40.730610;
		longitude = -73.9352425;
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
	getWeather();
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

function fillForeCast(data){
	try{
		if(data.properties.periods.number == 1){
			var day = data.properties.periods.number;
			day1.innerHTML = "Day" + " " + day;
		}
	}//End try
		catch(error){
			day1.innerHTML = error ? error.message : "no error occured";
		}
}

// ==== TOOLS & HELPERS ==== //

// Count request
function reqCount(){
	xReq += 1;
	console.log(xReq);
}

// === MOCK CONSOLE CONTROLS === //

function closeConsole(){
		x5.style.display = "none";
}
function showConsole(){
		x5.style.display = "block";
}

// === CREATE THE DATA ELEMENTS === //
// * Notes: delete dayCount var
// * delete mkLi var
function createWeatherBox(){
			mkLi.innerHTML = data[i].name + " " +  data[i].shortForecast +  "<br/>" + data[i].temperature + " " + data[i].temperatureUnit + "<br/>";
	}

function createElement(data, days){
	fillData();
	fillForeCast(data);
	console.log(data);
	var o = 1;
	for(var i = 0; i < days; i++){
		x9.innerHTML = data[i].number + "" + data[i].name + " " +  data[i].shortForecast +  "<br/>" + data[i].temperature + " " + data[i].temperatureUnit + "<br/>";
		var createLi2 = document.createElement("li");
		createLi2.innerHTML = data[i].name;
		if(o < 3){
					x6.appendChild(createLi2);
					var createLogLi = document.createElement("li");
					createLogLi.innerHTML = "day count:" + " " + dayCount + " " + "O count:" + " " + o;
					x7.appendChild(createLogLi);
					x8.innerHTML = data[i];
					o++;
		}else {
				o = 1;
		}
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
		//console.log(data);
		x8.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
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
		//console.log(data2);
		x8.innerHTML = `<pre>${JSON.stringify(data2, null, 2)}</pre>`;
	})
	.catch(error=>{
		console.log('Error'+  " " + error.message);
	});

}




