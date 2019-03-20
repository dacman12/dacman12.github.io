console.log("file being read");
// Calculate the Windchill

function buildWC(speed, temperature) {
   const feels = document.getElementById('feels');

   // Compute the windchill
   let wc = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temperature * Math.pow(speed, 0.16);
   console.log(wc);

   // Round the answer down to integer
   wc = Math.floor(wc);

   // If chill is greater than temp, return the temp
   wc = (wc > temperature) ? temperature : wc;

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
function cur_weather(summary) { 
   // Get the container
   const cur_weather = getRainny(summary);
   console.log("summary = " + cur_weather);

   if (cur_weather == "snow") {
      console.log("snpw");
      document.getElementById("cur_weather").setAttribute("src", "images/snow-small.jpg")
   } else if (cur_weather == "clear") {
      console.log("clear");
      document.getElementById("cur_weather").setAttribute("src", "images/clear-small.jpg");
   } else if (cur_weather == "rain") {
      console.log("rain");
      // document.getElementById("cur_weather").setAttribute("src", "images/raindrops-small-Dakota-Laptop.jpg");
      document.getElementById("cur_weather").setAttribute("src", "images/raindrops-small-dakota-laptop.jpg");
   } else if (cur_weather == "cloudy") {
      console.log("cloud");
      document.getElementById("cur_weather").setAttribute("src", "images/clouds-small.jpg");
   } else {
      console.log("fog");
      document.getElementById("cur_weather").setAttribute("src", "images/fog-small.jpg");
   }
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
      rainny = "snow";
      console.log("Condition is: " + rainny);
      return rainny;
   } else if (picture == "cloudy" ||
      picture == "overcast" ||
      picture == "gloomy") {
      rainny = "clouds";
      console.log("Condition is: " + rainny)
      return rainny;
   } else if (picture == "rain" ||
      picture == "raining" ||
      picture == "heavy raining" ||
      picture == "rain" ||
      picture == "wet" ||
      picture == "mist" ||
      picture == "thunderstorms") {
      rainny = "rain";
      console.log("Condition is " + rainny);
      return rainny;
   } else if (picture == "fog" ||
      picture == "low visibility" ||
      picture == "smog" ||
      picture == "hazy" ||
      picture == "haze") {
      rainny = "fog";
      console.log("Condition is " + picture);
      return rainny;
   } else {
      rainny = "clear";
      console.log("Condition is " + rainny);
      return rainny
   }
}
function buildFeet(height) {
   const elev = document.getElementById('height');

   // Compute the feet
   let feet = height * 3.28084;
   console.log(feet);

   // Round the answer down to integer
   feet = Math.round(feet);
   // Display the feet
   console.log(feet);
   // wc = 'Feels like '+wc+'°F';
   elev.innerHTML = "<strong>Elevation: </strong>" +feet + " ft| ";
}

