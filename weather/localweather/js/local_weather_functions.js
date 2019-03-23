//Local Weather fucntion
//make sure it is being read
console.log("file being read");

// Set global variable for custom header required by NWS API
var idHeader = {
   headers: {
      "User-Agent": "Student Learning Project - gri13003@byui.edu"
   }
};

console.log("Header and storage are here");

//define local storage
var storage = window.localStorage;
console.log("Header and storge have passed");

let speed = storage.getItem("Wind");
let speed = speed.charAt(0);


// Wind dialBlah Function
function dial(direction) {
   // Get the container
   const dialBlah = document.getElementById("dialBlah");
   console.log(direction);
   // Determine the dialBlah class
   switch (direction.toUpperCase()) {
      case "North":
      case "N":
         dialBlah.setAttribute("class", "n"); //"n" is the CSS rule selector
         console.log("Guess");
         break;
      case "NE":
      case "NNE":
      case "ENE":
         dialBlah.setAttribute("class", "ne");
         console.log("Who's");
         break;
      case "NW":
      case "NNW":
      case "WNW":
         dialBlah.setAttribute("class", "nw");
         console.log("back, ");
         break;
      case "South":
      case "S":
         dialBlah.setAttribute("class", "s");
         console.log("back");
         break;
      case "SE":
      case "SSE":
      case "ESE":
         dialBlah.setAttribute("class", "se");
         console.log("again, ");
         break;
      case "SW":
      case "SSW":
      case "WSW":
         dialBlah.setAttribute("class", "sw");
         console.log("Shady's");
         break;
      case "East":
      case "E":
         dialBlah.setAttribute("class", "e");
         console.log("back");
         break;
      case "West":
      case "W":
         dialBlah.setAttribute("class", "w");
         console.log("gottem");

   }
}


// Calculate the Windchill

function buildWC(speed, temp) {
   console.log("speed = " + speed + "temp = " + temp);
   const feelsLike = document.getElementById('feels');

   // Compute the windchill
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log("It feels like " + wc);

   // Round the answer down to integer
   wc = Math.floor(wc);

   // If chill is greater than temp, return the temp
   wc = (wc > temp) ? temp : wc;

   // Display the windchill
   console.log("It feels like " + wc);
   // wc = 'Feels like '+wc+'°F';
   feels.innerHTML = 'Feels like ' + wc + '&deg;F';
}

// Wind dialBlah Function
function getRain() {

   // Get the container
   const rain = getRainny(currentWeather);
   console.log(rainny);
   document.getElementById("current_weather").setAttribute("class", rainny);

   if (rain == "snow") {
      console.log("snpw");
      document.getElementById("rainny").setAttribute("src", "/weather/images/snow-small.jpg")
   } else if (rain == "clear") {
      console.log("clear");
      document.getElementById("rainny").setAttribute("src", "/weather/images/clear-small.jpg");
   } else if (rain == "rain") {
      console.log("rain");
      document.getElementById("rainny").setAttribute("src", "/weather/images/raindrops-small.jpg");
   } else if (rain == "cloudy") {
      console.log("cloud");
      document.getElementById("rainny").setAttribute("src", "/weather/images/clouds-small.jpg");
   } else {
      console.log("fog");
      document.getElementById("rainny").setAttribute("src", "/weather/images/fog-small.jpg");
   }
   rain();
}

//getRainny will determine the picture shown
//the weather picture should change

function getRainny(picture) {
   picture = picture.toLowerCase();

   //If-elsed statements make more sense to me.
   //THis is not working. Need to debug
   if (picture == "snow" ||
      picture == "snowing" ||
      picture == "flurries") {
      weat = "snow";
      console.log("Condition is: " + rainny);
      return rainny;
   } else if (picture == "cloudy" ||
      picture == "overcast" ||
      picture == "gloomy") {
      weat = "clouds";
      console.log("Condition is: " + rainny)
      return rainny;
   } else if (picture == "rain" ||
      picture == "raining" ||
      picture == "heavy raining" ||
      picture == "rain" ||
      picture == "wet" ||
      picture == "mist") {
      weat = "rain";
      console.log("Condition is " + rainny);
      return rainny;
   } else if (picture == "fog" ||
      picture == "low visibility" ||
      picture == "smog" ||
      picture == "hazy" ||
      picture == "haze") {
      weat = "fog";
      console.log("Condition is " + picture);
      return rainny;
   } else {
      weat = "clear";
      console.log("Condition is " + rainny);
      return rainny;
   }
}

function buildFeet(elevation) {
   document.getElementById('elevation');

   // Compute the feet
   let feet = elevation * 3.28084;
   console.log(feet);

   // Round the answer down to integer
   feet = Math.round(feet);
   // Display the feet
   console.log(feet + " feet");
   // wc = 'Feels like '+wc+'°F';
   document.getElementById('elevation').innerHTML = "<strong>Elevation</strong>" + feet + " ft| ";
}

console.log("HERE");

// Gets location information from the NWS API
function getLocation(locale) {
   const URL = "https://api.weather.gov/points/" + locale;
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('Json object from getLocation function:');
         console.log(data);

         let hourlyURL = data.properties.forecastHourly;
         let hourlyData = getHourly(hourlyURL);

         // Store data to localstorage 
         storage.setItem("locName", data.properties.relativeLocation.properties.city);
         storage.setItem("locState", data.properties.relativeLocation.properties.state);

         // Next, get the weather station ID before requesting current conditions 
         // URL for station list is in the data object 
         let stationsURL = data.properties.observationStations;
         // Call the function to get the list of weather stations
         getStationId(stationsURL);

         getForecast(data.properties.forecast);
      })

      .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(stationsURL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getStationId function:');
         console.log(data);

         // Store station ID and elevation (in meters - will need to be converted to feet) 
         let stationId = data.features[0].properties.stationIdentifier;
         let stationElevation = data.features[0].properties.elevation.value;
         console.log('Station and Elevation are: ' + stationId, stationElevation);



         // Store data to localstorage 
         storage.setItem("stationId", stationId);
         storage.setItem("stationElevation", stationElevation);

         //Convert meters to feet
         let elevation = storage.getItem("stationElevation");
         buildFeet(elevation);
         // Request the Current Weather for this station 
         getWeather(stationId);
      })
      .catch(error => console.log('There was a getStationId error: ', error))
} // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
   // This is the URL for current observation data 
   const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getWeather function:');
         console.log(data);

         // Store weather information to localStorage 
         //  let elevation = stationElevation;
         //console.log("I am " + feet + " feet tall");

         let temperature = data.properties.temperature.value;
         let temp = Math.floor((temperature * (9 / 5)) + 32);
         console.log("It is currently " + temp + " outside");

         let miles = data.properties.windSpeed.value;
         let mph = miles * 2.237;
         console.log("I am going " + mph);

         let currentWeather = data.properties.textDescription;
         console.log("It is currently " + currentWeather);
         let windGust = data.properties.windGust.value;
         console.log("It is " + windGust + " mph for wind speed");

         let currentweather = data.properties.textDescription;
         console.log("It is currently " + currentweather);
         storage.setItem("WindGust", windGust);
         storage.setItem("currentWeather", currentWeather);

         //    let direction = data.

         // Build the page for viewing 

      })
      .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function

function getForecast(URL) {

   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getForecast function:');
         console.log(data);

         let hiTemp = data.properties.periods[0].temperature;
         storage.setItem("high", hiTemp);
         console.log("The hi is " + hiTemp);
         let lowTemp = data.properties.periods[1].temperature;
         storage.setItem("low", lowTemp);
         console.log("the low is " + lowTemp);
         let detailedForecast = data.properties.periods[0].detailedForecast;
         storage.setItem("detailed", detailedForecast);
         console.log(detailedForecast);
      })
      .catch(error => console.log('There was a getForecast error: ', error))
}


function getHourly(URL) {
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getHourly function:');
         console.log(data);

         let hourly = [];
         for (let i = 0; i < 13; i++) {
            hourly[i] = data.properties.periods[i].temperature;
         }
         storage.setItem("hourly", hourly);

         let speed = data.properties.periods[0].windSpeed;
         console.log("I am going " + speed);
         storage.setItem("Wind", speed);

         let direction = data.properties.periods[0].windDirection;
         console.log("I am going " + direction);
         storage.setItem("direction", direction);

         let currentTemp = data.properties.periods[0].temperature;
         console.log("It is currently " + currentTemp);
         storage.setItem("Current", currentTemp);


      })
      .catch(error => console.log('There was a getHourly error: ', error))
}

// Populate the current location weather page
function buildPage() {
   // Task 1 - Feed data to WC, dialBlah, Image, Meters to feet and hourly temps functions

   let speed = storage.getItem("Wind");

   let ws = speed.charAt(0);

   let hours = storage.getItem("hourly");
   let hourlyData = hours.split(", ");

   // convert celcius to Farenheight
   function convert(temp) {
      let c = temp;
      let f = (9 / 5) * temp + 32;
      return f;
   }

   // Task 2 - Populate location information
   let lat = Math.round(storage.getItem('lat') * 100) / 100;
   let long = Math.round(storage.getItem('long') * 100) / 100;
   console.log("aaaaaaaaaaaaaaaaaaaaa " + long);
   let spot = "<strong> Location: </strong>" + lat + "&deg; N" + long + "&deg; W";
   document.getElementById("place").innerHTML = spot;

   let citSt = storage.getItem("locName") + ", " + storage.getItem("locState");
   document.getElementById("fullName").innerHTML = citSt;

   // Task 3 - Populate weather information

   let gusts1 = storage.getItem("WindGust");
   document.getElementById("gusts").innerHTML = gusts1;

   let current_weather1 = storage.getItem("currentWeather");
   document.getElementById("current_weather").innerHTML = current_weather1;

   let detailedinfo = storage.getItem("detailed");

   let direction = storage.getItem("direction");
   dial(direction);

   //get current temperature
   let current = storage.getItem("Current");
   document.getElementById("temperature").innerHTML = current;

   // Task 4 - Hide status and show main
   document.getElementById('page-head').setAttribute('class', '');
   status.setAttribute('class', 'hide');
}

buildPage();
