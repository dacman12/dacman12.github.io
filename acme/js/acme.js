let URL = "/acme/acme/js/acme.json";

buildNav(URL);

function buildNav(URL) {

    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            let content = "";
            content = "<li><button type='button' onClick='home()'>Home</button></li>";
            content += "<li><button type='button' onClick='" + data.Title.First + "'()>" + data.Title.First + "</button></li>";
            content += "<li><button type='button' onClick='" + data.Title.Second + "'()>" + data.Title.Second + "</button></li>";
            content += "<li><button type='button' onClick='" + data.Title.Third + "'()>" + data.Title.Third + "</button></li>";
            content += "<li><button type='button' onClick='" + data.Title.Fourth + "'()>" + data.Title.Fourth + "</button></li>";
            // Check the data object that was retrieved
            console.log(data);
            document.getElementById("page-nav").innerHTML = content;
        })
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
        })
}

function Anvils() {
    buildPage(URL, "Anvils");
    document.getElementById("Home").setAttribute("hide");
    document.getElementById("products").setAttribute("");
}

function Exposives() {
    buildPage(URL, "Exposives");
    document.getElementById("Home").setAttribute("hide");
    document.getElementById("products").setAttribute("");
}

function Decoys() {
    buildPage(URL, "Decoys");
    document.getElementById("Home").setAttribute("hide");
    document.getElementById("products").setAttribute("");
}

function Traps() {
    buildPage(URL, "Traps");
    document.getElementById("Home").setAttribute("hide");
    document.getElementById("products").setAttribute("");
}


function buildPage(URL, products) {
       fetch(URL)
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
            let a = data[products];
               
            a["name"];
            a["path"];
            a["description"];
            a["manufacturer"];
            a["price"];
            a["reviews"];

            document.getElementById("name").innerHTML= a["name"];
            document.getElementById("path").innerHTML = a["path"];
            document.getElementById("description").innerHTML = a["description"];
            document.getElementById("manufacture").innerHTML= "<strong> Made by: </strong>" + a["manufacture"];
            document.getElementById("price").innerHTML= "<strong> Price: </strong>" + a["price"];
            document.getElementById("reviews").innerHTML= "<strong> Reviews: </strong>" + a["reviews"] + "/5";
    })
 .catch(function (error) {
    console.log('There was a fetch problem: ', error.message);
    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
 })
}
