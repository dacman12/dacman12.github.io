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

// Calculate the Windchill
buildWC(31, 31);

function buildWC(speed, temp) {
   const feels = document.getElementById('feels');

   // Compute the windchill
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc);

   // Round the answer down to integer
   wc = Math.floor(wc);

   // If chill is greater than temp, return the temp
   wc = (wc > temp) ? temp : wc;

   // Display the windchill
   console.log(wc);
   // wc = 'Feels like '+wc+'°F';
   feels.innerHTML = 'Feels like ' + wc + '&deg;F';
}

// Wind Dial Function
function dial(dir) {
   // Get the container
   const dial = document.getElementById("dial");
   console.log(dir);
   // Determine the dial class
   switch (dir.toUpperCase()) {
      case "North":
      case "N":
         dial.setAttribute("class", "n"); //"n" is the CSS rule selector
         break;
      case "NE":
      case "NNE":
      case "ENE":
         dial.setAttribute("class", "ne");
         break;
      case "NW":
      case "NNW":
      case "WNW":
         dial.setAttribute("class", "nw");
         break;
      case "South":
      case "S":
         dial.setAttribute("class", "s");
         break;
      case "SE":
      case "SSE":
      case "ESE":
         dial.setAttribute("class", "se");
         break;
      case "SW":
      case "SSW":
      case "WSW":
         dial.setAttribute("class", "sw");
         break;
      case "East":
      case "E":
         dial.setAttribute("class", "e");
         break;
      case "West":
      case "W":
         dial.setAttribute("class", "sw");
         console.log("gottem");
         break;
   }
}

// Wind Dial Function
function rainn() {
   // Get the container
   const rainn = getWeat("clear");
   console.log(rainn);
   document.getElementById("current_weather").setAttribute("class", rainn);

   if (rainn == "snow") {
      console.log("snpw");
      document.getElementById("rainn").setAttribute("src", "/weather/images/snow-small.jpg")
   } else if (rainn == "clear") {
      console.log("clear");
      document.getElementById("rainn").setAttribute("src", "/weather/images/clear-small.jpg");
   } else if (rainn == "rain") {
      console.log("rain");
      document.getElementById("rainn").setAttribute("src", "/weather/images/raindrops-small.jpg");
   } else if (rainn == "cloudy") {
      console.log("cloud");
      document.getElementById("rainn").setAttribute("src", "/weather/images/clouds-small.jpg");
   } else {
      console.log("fog");
      document.getElementById("rainn").setAttribute("src", "/weather/images/fog-small.jpg");
   }
}
rainn();

//getWeat will determine the picture shown
//the weather picture should change

function getWeat(picture) {
   picture = picture.toLowerCase();

   //If-elsed statements make more sense to me.
   //THis is not working. Need to debug
   if (picture == "snow" ||
      picture == "snowing" ||
      picture == "flurries") {
      weat = "snow";
      console.log("Condition is: " + weat);
      return weat;
   } else if (picture == "cloudy" ||
      picture == "overcast" ||
      picture == "gloomy") {
      weat = "clouds";
      console.log("Condition is: " + weat)
      return weat;
   } else if (picture == "rain" ||
      picture == "raining" ||
      picture == "heavy raining" ||
      picture == "rain" ||
      picture == "wet" ||
      picture == "mist") {
      weat = "rain";
      console.log("Condition is " + weat);
      return weat;
   } else if (picture == "fog" ||
      picture == "low visibility" ||
      picture == "smog" ||
      picture == "hazy" ||
      picture == "haze") {
      weat = "fog";
      console.log("Condition is " + picture);
      return weat;
   } else {
      weat = "clear";
      console.log("Condition is " + weat);
      return weat;
   }
}


//Convert meters to feet
buildFeet(elevation);

function buildFeet(elevation) {
  document.getElementById('elevation');

   // Compute the feet
   let feet = elevation * 3.28084;
   console.log(feet);

   // Round the answer down to integer
   feet = Math.round(feet);
   // Display the feet
   console.log(feet);
   // wc = 'Feels like '+wc+'°F';
   document.getElementById('elevation').innerHTML = feet + " ft| ";
}

console.log("HERE");

//  function weatt(){
//   let weatt =  getWeat("snow");
//   document.getElementById("current_weather").setAttribute("class", weatt);
//   console.log("puppy");
//  }

//  weatt();


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
         // Store data to localstorage 
         storage.setItem("locName", data.properties.relativeLocation.properties.city);
         storage.setItem("locState", data.properties.relativeLocation.properties.state);

         // Next, get the weather station ID before requesting current conditions 
         // URL for station list is in the data object 
         let stationsURL = data.properties.observationStations;
         // Call the function to get the list of weather stations
         getStationId(stationsURL);
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
         let elevation = data.properties.elevation.value;
         console.log("I am " + elevation + " feet tall");

         let cur_temp = data.properties.periods.temperature;
         console.log("It is currently " + cur_temp);

         //    let direction = data.

         // Build the page for viewing 

      })
      .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function