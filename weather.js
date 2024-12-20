var x, x1, x2, x3, x4, x5, x6, x9, cities, citiesLog, amPmBoxes, latitude, longitude, api, api2, createUlC, capBtns, box2, city, state, dayCount, mkLi, day1, day2, day3, day4, day5, day6, day7;

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
	
	amPmBoxes = [
		document.getElementById('d1-am'), 
		document.getElementById('d1-pm'),
		document.getElementById('d2-am'),
		document.getElementById('d2-pm'),
		document.getElementById('d3-am'),
		document.getElementById('d3-pm'),
		document.getElementById('d4-am'),
		document.getElementById('d4-pm'),
		document.getElementById('d5-am'),
		document.getElementById('d5-pm'),
		document.getElementById('d6-am'),
		document.getElementById('d6-pm'),
		document.getElementById('d7-am'),
		document.getElementById('d7-pm')
	];
	
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

function fillForeCast(data, i){
	try{
		switch(data[i].number){
			case 1:
					amPmBoxes[0].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 2:
					amPmBoxes[1].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			
			case 3:
					amPmBoxes[2].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 4:
							amPmBoxes[3].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			case 5:
					amPmBoxes[4].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 6:
							amPmBoxes[5].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			case 7:
						amPmBoxes[6].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
						break;
			case 8:
								amPmBoxes[7].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			case 9:
					amPmBoxes[8].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 10:
					amPmBoxes[9].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			case 11:
					amPmBoxes[10].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 12:
								amPmBoxes[11].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			case 13:
					amPmBoxes[12].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
					break;
			case 14:
								amPmBoxes[13].innerHTML = data[i].name + "" + data[i].temperature + data[i].temperatureUnit;
			break;
			
			default:
				day7.innerHTML = "am-pm errorr";
		}//End Switch
	}//End try
		catch(error){
			day1.innerHTML = error ? error.message : "no error occured";
		}
}//End fillForeCast

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
	console.log(data);
	var o = 1;
	for(var i = 0; i < days; i++){
		x9.innerHTML = data[i].number + "" + data[i].name + " " +  data[i].shortForecast +  "<br/>" + data[i].temperature + " " + data[i].temperatureUnit + "<br/>";
		var createLi2 = document.createElement("li");
		createLi2.innerHTML = data[i].name;
		fillForeCast(data, i);
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

function captureCityData(data, citiesLog){
	
	citiesLog = document.createElement('p');
	document.appenChild(citiesLog);
	
	for(var i = 0; i < data.length; i++){
			cities[i] = data[i]; 
	}
	
	citiesLog();
}

var addCitiesToHTML = () => {
		citiesLog.innerHTML = "Cities" + " " + cities;
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
		captureCityData(data, addCitiesToHTML);
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




