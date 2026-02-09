var x, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, regex, shortForecast, usCapArray,getUserLoBtn, dropDownBox, locationOutput, jsonData, text, searchForm, searchClicked, amPmBoxes, searchOutput, searchSubmit, search, weatherIcon, dayOfWeek, latitude, longitude, api, forecastApi, createUlC, capBtns, box2, city, state, dayCount, mkLi, day1, day2, day3, day4, day5, day6, day7, cityData, dataOutput, searchPreOut;

import {TrieNode, Trie} from './trie.js';

var trie = new Trie();  

  


cityData = [];
searchClicked = false;




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
	x10 = document.getElementById('data1');
	x11 = document.getElementById('data3');
	box2 = document.getElementById('box2');
	day1 = document.getElementById('day-1');
	day2 = document.getElementById('day-2');
	day3 = document.getElementById('day-3');
	day4 = document.getElementById('day-4');
	day5 = document.getElementById('day-5');
	day6 = document.getElementById('day-6');
	day7 = document.getElementById('day-7');
	search = document.getElementById("search");
	searchForm = document.getElementById("weatherSearch");
	searchOutput = document.getElementById("output-x");
	searchSubmit = document.getElementById("submit");
	dayOfWeek = document.getElementsByClassName("day-of-week");
	weatherIcon = document.getElementsByClassName("weather-icon");
	dropDownBox = document.getElementsByClassName("dropdown-item");
	locationOutput = document.getElementById("locationOutput");
	getUserLoBtn = document.getElementById("getUserLocation");
	dataOutput = document.getElementById("data-output");
	searchPreOut = document.getElementById("searchPreOut");

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
	

	
// ======= Loadd Defualt Weather ======= //

function loadDefaultWeather(){
		latitude = 40.730610;
		longitude = -73.9352425;
		api = "https://api.weather.gov/points/" + latitude + "," + longitude;
		getWeather();
}



// ====== Get User Location Btn ====== //

	getUserLoBtn.addEventListener("click", function(event){
				getUserLocation();
	});



/* ====== SEARCH Events ==== */


// Get User Input 
	search.addEventListener("input", function(event){
		var textNode = document.createTextNode(event.target.value);
		searchOutput.appendChild(textNode);
		searchOutput.innerHTML = event.target.value;
		
		if(/^[a-zA-Z0-9]$/.test(event.data)){ 
			// searchRes = presfix search results 
				var preX =	trie.searchPrefix(event.target.value);
				for(var i = 0; i < preX.length; i++){
						searchPreOut.innerHTML += preX[i] + "<br>";
				}
		}
		
		
		/*
		// TRIE Store
		text = event.target.value;
		parseWords(text);
		console.log("text var:" + " " +  text);
		newTrie.startsWith(text);
		//console.log(text.match(regex) ?? "Aw Naur");
		*/
	});
	
	
	searchForm.addEventListener("submit", function(event){
		event.preventDefault(); // Prevent page refresh
		var inputValue = search.value;
		newTrie.startsWith(text);
		console.log("Submit:" + " " + "Form value" + " " + inputValue);
	});


	search.addEventListener("keydown", function(event){
		if(event.key === "Backspace"){
					searchOutput.innerHTML.slice(0, -1);
					console.log("Backspace pressed" + event.key);
		}
	});

	search.addEventListener("click", function(){
		if(searchClicked == false){
			getUsCapitals();
		}
		searchClicked = true;
		}); //End seach eventListener
/*
	searchBtn.addEventListener("click", function(event){
			newTrie.search(text);
	});//End searchBTn

*/

   loadDefaultWeather();
});//End Windows Event Listener

	// Store Trie Nodes
	function stoTrieNo(word){ 
			trie.insert(word);
		 dataOutput.innerHTML = `<pre>${JSON.stringify(trie, null, 2)}</pre>` + "HELLLO";
		}
	



// ==== GET USER LOCATION  ==== //

function getUserLocation(){
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
	locationOutput.innerHTML = error.message
	console.log("Error occured" + error.message);
}



// ====== GET CUSTOM JSON DATA (US CAPITALS) ====== //

	function getUsCapitals(){
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
			storeUsCapitals(data);
		//console.log("getUsCapitals Data status:" + data[0].name);
			jsonData = data;
		//	getJsonData(data);// data for the array //function below
		})
	.catch(error=>{
			console.log('Geo Location Error'+  " " + error.message);
		});
	}//End getUsCap


// US Capital data output to search drop down box (test)
	function storeUsCapitals(data){
		var i = 0;
				while (cityData.length < data.length){
							cityData.push(data[i]);
							searchOutput.innerHTML += cityData[i].name + "<br>";
							stoTrieNo(cityData[i].name);//Store city names in TrieNodes
							i++;
				}
	}
 function printUsCityCapitals(city){
	 searchOutput.innerHTML = city[0].name;
 }


/*
function getJsonData(data){
	for(var i = 0; i < data.length; i++ ){
		var regex = /^a/i;
		if(data){
			newTrie.insert(data[i].name);// store u.s. capitals in Trie
			usCapArray[i].append(data[i]);// store u.s. capitals in array
			x9.innerHTML += usCapArray[i].name + ", ";
			console.log("getJsonData data has landed" + " " + newTrie.root.children + " " + "&&" + " " + usCapArray);
		}
	}
}
*/



// ==== Add data to page ==== //

function fillData(){
	x2.innerHTML = city + "," + " "+ state;
}

function fillForeCast(data, i){
	try{
		switch(data[i].number){
			case 1:
					dayOfWeek[0].innerHTML = data[i].name;
					amPmBoxes[0].textContent = data[i].temperature + " " +  data[i].temperatureUnit;
					weatherIcon[0].src = data[i].icon;
					break;
			case 2:
					amPmBoxes[1].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			
			case 3:
					dayOfWeek[1].innerHTML = data[i].name;
					amPmBoxes[2].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
					weatherIcon[1].src = data[i].icon;
					break;
			case 4:
					amPmBoxes[3].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			case 5:
					dayOfWeek[2].innerHTML = data[i].name;
					amPmBoxes[4].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
					weatherIcon[2].src = data[i].icon;
					break;
			case 6:
					amPmBoxes[5].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			case 7:
						dayOfWeek[3].innerHTML = data[i].name;
						amPmBoxes[6].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
						weatherIcon[3].src = data[i].icon;
						break;
			case 8:
					amPmBoxes[7].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			case 9:
					dayOfWeek[4].innerHTML = data[i].name;
					amPmBoxes[8].innerHTML = data[i].temperature + " " +  data[i].temperatureUnit;
					weatherIcon[4].src = data[i].icon;
					break;
			case 10:
					amPmBoxes[9].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			case 11:
					dayOfWeek[5].innerHTML = data[i].name;
					amPmBoxes[10].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
					weatherIcon[5].src = data[i].icon;
					break;
			case 12:
					amPmBoxes[11].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
			break;
			case 13:
					dayOfWeek[6].innerHTML = data[i].name;
					amPmBoxes[12].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
					weatherIcon[6].src = data[i].icon;
					break;
			case 14:
					amPmBoxes[13].innerHTML = data[i].temperature + " " + data[i].temperatureUnit;
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
		x9.innerHTML = data[i].number + "" + data[i].name + " " +  data[i].shortForecast +  "<br/>" + data[i].temperature + " " + data[i].temperatureUnit + " " + "createElement()" + "<br/>";
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








// ===== WEATHER API ===== //

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
			forecastApi = data.properties.forecast;
			city = data.properties.relativeLocation.properties.city;
			state = data.properties.relativeLocation.properties.state;
			console.log("2nd API address" + " " + forecastApi);
		 x10.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>` +  "API 1";
			return fetch(forecastApi);
	})
	.then(response => {
		if (!response.ok){
			throw new Error("Network response 2 was not ok");
		}
		return response.json();
	})
	.then(data => {
		var newData = data.properties.periods;
		createElement(newData, newData.length);
 	x.innerHTML += JSON.stringify(newData, null, 2);
		x8.innerHTML += `<pre>${JSON.stringify(newData, null, 2)}</pre>` + "API 2t";
  x11.innerHTML = `<pre>${JSON.stringify(data.properties.periods[3].shortForecast, null, 2)}</pre>` + " " +  "number";
		
	})
	.catch(error=>{
		console.log('Error'+  " " + error.message);
	});

}
