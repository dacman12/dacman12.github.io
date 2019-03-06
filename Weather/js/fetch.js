let weatherURL = "greenvilleweather.json";
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.city;
    let locState = g.state;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);
    // elevation
    let height = Evelation;
    console.log("I am " + height + " tall");
    //location
    let longitude = Longitude;
    let lattitude = Latitude;
    let place = longitude + ', ' + lattitude;
    console.log("I am at " + place);
    //zip code
    let code = Zip;
    console.log("I lve at " + code);    

    // Get the temperature data
    let hi = High;
    let low = Low;
    let temperature = Temp;
    let wet = Precip;

    // Get the wind data 
    let speed = Gusts;
    let direction = Direction;

    // Get the current conditions
    let current = Summary;
    console.log("It currently is " + current);

    // Get the hourly data 
    let hour = Hourly;
    console.log("alpha");
    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information


    // Set the wind information


    // Set the current conditions information


    // Set the hourly temperature information


    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusMessageContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusMessageContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}