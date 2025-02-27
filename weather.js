var x, x1, x2, x3, x4, x5, x6, x9, regex, usCapArray, dropDownBox, jsonData, text, searchForm, searchClicked, amPmBoxes, searchOutput, searchBtn, search, weatherIcon, dayOfWeek, latitude, longitude, api, api2, createUlC, capBtns, box2, city, state, dayCount, mkLi, day1, day2, day3, day4, day5, day6, day7;

// ========= SERACH ========= //

class TrieNode {
			constructor(){
					this.children = {};
					this.isEndOfWord = false;
			}
	}
	class Trie {
			constructor(){
				this.root = new TrieNode();
				console.log("New Trie planted");
			}
			insert(word){
				let node = this.root;
			for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(); // Create a new node if char not found
      }//end if
      node = node.children[char]; // Move to the next node
      //dropDownBox[0].innerHTML = node;
      console.log("char" + "" + char);
    }//end for
    node.isEndOfWord = true; // Mark the end of a valid word
	}//end insert

	// Search for a word in the trie
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
      	console.log(word + " " + "Not found");
      	dropDownBox.innerHTML = word + " " + "not found";
        return false; // Word not found
      }
      node = node.children[char];
    }
    console.log(node.isEndOfWord);
    return node.isEndOfWord; // Returns true if it's a complete word
  }

  // Check if a prefix exists in the trie
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
      	 console.log("Prefix:" + " " + prefix + " " + "does not exist");
        return false;
      }
      node = node.children[char];
      console.log(prefix + " " + "exist");
    }
    return true; // Prefix exists
  }
}
var newTrie = new Trie();

searchClicked = 0;
usCapArray = [];


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
	dayOfWeek = document.getElementsByClassName("day-of-week");
	weatherIcon = document.getElementsByClassName("weather-icon");
	search = document.getElementById("main-search");
	searchOutput = document.getElementById("output-x");
	dropDownBox = document.getElementsByClassName("dropdown-item");
	searchBtn = document.getElementById("searchBtn");
	searchForm = document.getElementById("searchForm");

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

	search.addEventListener("input", function(event){
		var textNode = document.createTextNode(event.target.value);
		searchOutput.appendChild(textNode);
		searchOutput.innerHTML = event.target.value;
		//console.log("input triggered: " + " " + event.target.value);
		//regex = /[a-z]+/i;
		text = event.target.value;
		console.log("text var:" + " " +  text);
		newTrie.startsWith(text);
		//console.log(text.match(regex) ?? "Aw Naur");
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
		console.log(" Backspace pressed" + event.key);
		}
	});

	search.addEventListener("click", function(){
		if(searchClicked < 1){
			getUsCap();
		}
		searchClicked = 1;
		}); //End seach eventListener
/*
	searchBtn.addEventListener("click", function(event){
			newTrie.search(text);
	});//End searchBTn

*/


   loadDefaultWeather();
});//End Windows Event Listener

	
	
	

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






// ====== API Calls ====== //
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
		console.log("U.S.capitals call");
		getStateData(data);
		//console.log("getUsCap Data status:" + data[0].name);
		jsonData = data;
		getJsonData(data);
	})
	.catch(error=>{
		console.log('Geo Location Error'+  " " + error.message);
	});
}//End getUsCap

	function getJsonData(data){
		for(var i = 0; i < data.length; i++ ){
			var regex = "/^a/i";
			if(data){
				newTrie.insert(data[i].name);
				usCapArray[i] = data[i];
				if(regex.test(data[i].name)){
						x9.innerHTML += usCapArray[i].name;
				}else{x9.innerHTML = "no can do";}
				//x9.innerHTML += usCapArray[i].name;
				console.log(usCapArray);
				console.log("getJsonData data has landed" + "" + newTrie.root.children);
			}
		}
	}



function getStateData(city){
	console.log("Get Us Data func:" + " " + city[0].name);
}

function searchGeo(){
	
}


// ***** GOV API ***** //
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
