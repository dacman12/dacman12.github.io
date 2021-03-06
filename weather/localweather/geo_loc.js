//Sandbox
'use strict';

// // Set global variable for custom header required by NWS API
// var idHeader = {
//     headers: {
//         "User-Agent": "Student Learning Project - gri13003@byui.edu"
//     }
// };

//     //define local storage
//     var storage = window.localStorage;

console.log("test, test, mike test");

// Gets longitude and latitude of current location
function getGeoLocation() {

    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';

    // Call the function to get our location

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            //Save coordinates individually 
            storage.setItem("long", position.coords.longitude);
            storage.setItem("lat", position.coords.latitude);

            // Combine the values
            const locale = lat + "," + long;
            console.log(`Lat and Long are: ${locale}.`);

            storage.setItem("geo_loc_lat", lat);
            storage.setItem("geo_loc_long", long);
            // Call getLocation function, send locale
            getLocation(locale);
           
        })
    } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else
    //end getGeoLocation

} // end getGeoLocation

getGeoLocation();
