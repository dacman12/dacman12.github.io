 console.log("file being read");
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
          dial.setAttribute("class", "w");
          console.log("gottem");
          break;
    }
 }

  // Wind Dial Function
  function rainn(weth) {
   // Get the container
   const rainn = document.getElementById("rainn");
   console.log(weth);
   // Determine the dial class
  }

  //getWeather will determine the picture shown
  //the weather picture should change
  
  function getWeat(picture) {
     picture = picture.toLowerCase();
     console.log("snowwy" + picture);
     let picture = "";
  }

  //If-elsed statements make more sense to me.

  if(picture == "snow" ||
   picture == "snowing" ||
   picture == "flurries"){
      weat = snow;
      console.log("Condition is: " + weat);
      return weat;
   } else if(picture == "cloudy" ||
   picture == "overcast" ||
   picture == "gloomy"){
      weat = "clouds";
      console.log("Condition is: " + weat)
      return weat;
   } else if(picture == "rain" ||
   picture == "raining" ||
   picture == "heavy raining" ||
   picture == "rain" ||
   picture == "wet" ||
   picture == "mist"){
      weat = "rain";
      console.log("Condition is " + weat);
      return weat;
   } else if(picture == "foggy" ||
   picture == "low visibility" ||
   picture == "smog" ||
   picture =="hazy" ||
   picture == "haze"){
      weat = "fog";
      console.log("Condition is " + picture);
      return weat;
   } else{
      weat = "clear";
      console.log("Condition is " + weat);
      return weat
   }



 //Convert meters to feet
 buildFee(1514.246);

 function buildFee(fee) {
    const feet = document.getElementById('feet');

    // Compute the feet
    let fe = fee * 3.28084;
    console.log(fe);

    // Round the answer down to integer
    fe = Math.round(fe);
    // Display the feet
    console.log(fe);
    // wc = 'Feels like '+wc+'°F';
    feet.innerHTML = fe + " ft| ";
 }

//  function weth