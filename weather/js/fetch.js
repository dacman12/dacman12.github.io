console.log("fetch is read");

let pageNav = document.getElementById("navforpage");
let statusContainer = document.getElementById("statusContainer");
let contentContainer = document.getElementById("main-content");

let weatherURL = "/weather/js/greenvilleweather.json";
console.log("fetch");


fetchData(weatherURL);

function fetchData(weatherURL) {
   let cityName = 'Greenville'; // The data we want from the weather.json file
   console.log("CityName: " + cityName);
   fetch(weatherURL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Network response was not OK.');
      })
      .then(function (data) {
         // Check the data object that was retrieved
         console.log("Hello from data" + data);
         // data is the full JavaScript object, but we only want the greenville part
         // shorten the variable and focus only on the data we want to reduce typing
         let g = data[cityName];

         // ************ Get the content ******************************

         // Get the location data
         let locName = g.City;
         console.log("City is " + locName);
         let locState = g.State;
         console.log("State is " + locState);
         // Put them together
         let fullName = locName + ', ' + locState;
         console.log("I am at " + fullName);
         // See if it worked
         console.log('fullName is: ' + fullName);
         // elevation
         let height = g.Elevation;
         console.log("I am " + height + " tall");
         //location
         let longitude = g.Longitude + "&deg N";
         let lattitude = g.Latitude + "&deg W";
         let place = longitude + ', ' + lattitude;
         console.log("I am at " + place);
         //zip code
         let code = g.Zip;
         console.log("I lve at " + code);

         // Get the temperature data
         let high = g.High;
         console.log("I am" + high);
         let low = g.Low;
         console.log("It is " + low);
         let temperature = g.Temp;
         console.log("I feel " + temperature)
         let wet = g.Precip;
         console.log("It rained " + wet);

         // Get the wind data 
         let gusts = g.Gusts;
         let speed = g.Wind;
         console.log("I am going " + speed);
         let direction = g.Direction;
         console.log("It is currently " + direction);

         let summary = g.Summary;
         console.log("My mind is " + summary);

         // Get the hourly data 
         let hourly = g.Hourly;
         console.log("alpha");

         //************ Display the content ******************************
         // Set the title with the location name at the first
         // Gets the title element so it can be worked with
         let pageTitle = document.getElementById('locName');
         console.log("this is a test");
         // Create a text node containing the full name 
         let fullNameNode = document.createTextNode(fullName);
         console.log("my full name is ...");
         // inserts the fullName value before any other content that might exist
         pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
         console.log("What am I doing");
         // When this is done the title should look something like this:
         // Greenville, SC | The Weather Site

         // Set the Location information
         // Get the h1 to display the city location
         let contentHeading = document.getElementById('locName');
         contentHeading.innerHTML = fullName + " Weather Sitvygbhujnie";
         document.getElementById("fullName").innerHTML = fullName;
         console.log("this is here")
         document.getElementById("code").innerHTML = "<strong>Zip: </strong>" + code + "| ";
         console.log("I have " + code + " zippers");
         console.log("hi " + buildFeet(height));
         buildFeet(height);
         console.log("My dad is tall");
         document.getElementById("place").innerHTML = "<strong>Location</strong> " + place + "| ";
         // The h1 in main h1 should now say "Greenville, SC"
         document.getElementById("fullName").innerHTML = fullName;
         console.log("nuSNFJOSNFSJK");
         // Set the temperature information
         document.getElementById("temperature").innerHTML = temperature + "&deg;F";
         document.getElementById("high").innerHTML = high + "&deg;F";
         console.log("high = " + high); 
         document.getElementById("low").innerHTML = low + "&deg;F";
         console.log("Speed= " + speed + " , temperature= " + temperature);
         buildWC(speed, temperature);

         // Set the wind information
         document.getElementById("mph").innerHTML = "<strong></strong>" + speed + " mph";
         document.getElementById("direction").innerHTML = "<strong>Direction </strong>" + direction;

         // Set the current conditions information
         rainn(summary);
         console.log("rainn");
         document.getElementbyId("yes").innerHTML = "<strong>" + summary + "</strong>";
         console.log(hourly);

         // Set the hourly temperature information
         document.getElementById("hourly").innerHTML = hourly;

         // Change the status of the containers
         contentContainer.setAttribute('class', ''); // removes the hide class
         statusContainer.setAttribute('class', 'hide'); // hides the status container
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         statusContainer.innerHTML = 'Sorry, the data could not be processed.';
      })

}
