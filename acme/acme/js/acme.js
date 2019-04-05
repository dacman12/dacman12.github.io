let URL = "/acme.json";

buildNav(URl);

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
           content += "<li><button type='button' onClick='" + data.Title.First + "'()>" + data.Title.First + "</button></li>"
           content += "<li><button type='button' onClick='" + data.Title.Second + "'()>" + data.Title.Second + "</button></li>"
           content += "<li><button type='button' onClick='" + data.Title.Third + "'()>" + data.Title.Third + "</button></li>"
           content += "<li><button type='button' onClick='" + data.Title.Fourth + "'()>" + data.Title.Fourth + "</button></li>"
            // Check the data object that was retrieved
            console.log(data);
            document.getElementById("page-nav").innerHTML=content;
        })
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
}

function
