var GeoapiKey = "7fd817a82bee4b8fbce597d0849507d8";
var baseGeoPlacesUrl = "https://api.geoapify.com/v2/places?";
var openWeatherApiKey = "9c26d768ead86b39036caf98fb0abbfa";
var placeId, lat, lon;
var today = dayjs();

var userInput = "";
var search = $('#searchBtn');
var datesArray = $('.dates');
var cityInput = document.getElementById("first_name");
var artistInput = document.getElementById("artist");
var artistCardEl = document.getElementById("artistCard");


function musicEvent() {
    const artistName = artistInput.value.trim();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '39ab25d4b3mshd3d6061f56936c2p1ccea5jsn16a8b8bc255b',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=${artistName}&page=1`, options)
        // fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=${cityName}%20bowl&page=1`, options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {

                // Put everything within the for loop between starting on line 43 and ending on 47. create elements and append to desired cards.
                // can we get both searches in one button. city and venue. 
                // what data we want from object.
                // how to append that information.
                // store the lat and long
                // call get5day() function

                var artistName = response.data[i].name[i]
                var venueName = response.data[i].location.name[i]
                var date = response.data[i].startDate[i]

                // creating a card element.
                var card = document.createElement("div");
                var cardDiv = document.createElement("div");
                var heading = document.createElement("h2");
                var venueNameEL = document.createElement("p");
                var dateEL = document.createElement("p");

                // setting class for var. so we can style in css
                card.setAttribute("class", "card");
                cardDiv.setAttribute("class", "cardDiv");
                venueNameEL.setAttribute("class", "venueNameEL")
                dateEL.setAttribute("card", "dateEL")

                card.append(cardDiv);
                
                heading.textContent = `Artist Name: ${artistName}`;
                venueNameEL.textContent = `Venue Name: ${venueName}`;
                dateEL.textContent = `Date Playing: ${date}`;


                cardDiv.append(heading, venueNameEL, dateEL);

                artistCardEl.innerHTML = "";
                artistCardEl.append(card)


            }
        })
        .catch(err => console.error(err));
};


const rapidApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '39ab25d4b3mshd3d6061f56936c2p1ccea5jsn16a8b8bc255b',
        'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
    }
};

// $('#current').append(today.format('dddd, MMMM D'));
function getConcertDetails(){
    
    fetch('https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=Hollywood%20bowl&page=1', rapidApiOptions)
    .then(response => response.json())
    .then(function(response){
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].description)
            // Put everything within the for loop between starting on line 43 and ending on 47. create elements and append to desired cards.
            //gets and updates page
            let address = data[i].location.address.adressRegion
            $('#current').text(address + " " + today.format('dddd, MMMM D'))
            //store the latitude and longitude
            lat = data[i].location.geo.latitude;
            lon = data[i].location.geo.longitude;
            get5Day();
        }
    })
    .catch(err => console.error(err));
}





//hopefully creates a card with data for the 
function createPlaceDetailCard(dataObject, category) {
    //based off the web data fill out a card
    //creating the card
    let card = $(`<div class="card"></div>`);
    //sets the color based of the category
    switch (category) {
        case "commercial":
            card.addClass("orange lighten-2");
            break;
        case "entertainment":
            card.addClass("green darken-2");
            break;
        case "accomidation":
            card.addClass("amber lighten-1");
            break;
        default:
            card.addClass("blue darken-2");
    }
    //creates a card content section based of the materialize format
    //https://materializecss.com/cards.html
    let cardContent = $(`<div class="card-content white-text"></div>`);
    //capitalizes it for the card
    category = category.charAt(0).toUpperCase() + category.slice(1);
    cardContent.append(`<h4>${category}</h4>`);

    //card title with the name
    let cardTitle = $(`<span class="card-title">${dataObject.name}</span>`);


    cardContent.append(cardTitle);
    //card details with a description?

    //location
    if (dataObject.address !== undefined) {
        cardContent.append($(`<p>Location: ${dataObject.address}</p>`));
    }

    //category type
    for (let x = 0; x < dataObject.categories.length; x++) {
        //the way the categories are stored is alphabetically
        //if we find the category that matches up to the search the
        //next one will be a specific type
        //could be more consise but will work just fine
        /* Example
            categories:
                0: "building"
                1: "building.tourism"
                2: "entertainment"
                3: "entertainment.museum"
        */
        if (dataObject.categories[x] === category) {
            //this gets the little bit for the specific type
            cardContent.append($(`<p>${category} type: ${dataObject.categories[x + 1].split(".")[1]}</p>`));
        }
    }

    //hours of opperation
    if (dataObject.hours !== undefined) {
        cardContent.append($(`<p>Hours open: ${dataObject.hours}</p>`))
    }

    //bottom of the card with links
    let cardLinks = $(`<div class="card-action"></div>`);
    if(dataObject.website !== undefined){
        let webLink = $(`<a href="${dataObject.website}">${dataObject.name}</a>`)
        if(category === "commercial"){
            webLink.addClass("blue-text");
        }
        cardLinks.append(webLink);
    }
    if (dataObject.phone !== undefined) {
        //this just replaces any paranthesis and dashes
        let phoneNumberFormatted = dataObject.phone.replace("(", "").replace(")", "").replace("-", "");
        let phoneLink = $(`<a href="tel:${phoneNumberFormatted}">${dataObject.phone}</a>`)
        if(category === "commercial"){
            phoneLink.addClass("blue-text");
        }
        cardLinks.append(phoneLink);
    }

    //appends to the bottom of the page
    //append the content to the card
    card.append(cardContent, cardLinks);
    //creates the overal container and adds the card to it
    let cardContainer = $(`<div class="col s12 m6"></div>`);
    cardContainer.append(card);
    //gets the card into the right place hopefully
    $("#tukwila > .row").append(cardContainer);
}

function processGeoapifyPlaceDetails(data, category) {

    //features is an array with each element being an object having a type, a properties object, and a  geometry object
    //We want to get information from the properties object within each feature object from the list
    //ex: Features[0].properties.name will return the name of the first place that was returned from the search parameters
    let features = data.features;

    if(features.length === 0){
        exit();
    }

    //example
    let exampObj = features[Math.floor(Math.random() * features.length)];
    //since the categories it returns are alphabetical I would like to use the one we put in
    let dataWeWantObj = {
        name: exampObj.properties.name,
        address: exampObj.properties.address_line2,
        phone: exampObj.properties.datasource.raw.phone,
        hours: exampObj.properties.datasource.raw.opening_hours,
        website: exampObj.properties.datasource.raw.website,
        categories: exampObj.properties.categories
    };

    createPlaceDetailCard(dataWeWantObj, category);

}

function getPlaceDetails(category) {

    fetch(`${baseGeoPlacesUrl}categories=${category}&filter=place:${placeId}&apiKey=${GeoapiKey}`)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function (data) {
            console.log(data);
            processGeoapifyPlaceDetails(data, category);
        })

}


function fetchLocation(location) {

    var geoReq = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${openWeatherApiKey}`;

    fetch(geoReq).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        get5Day();
    });

}


function get5Day() {
    var forecastReq = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;

    fetch(forecastReq).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (data) {
        //just logs the data for now
        console.log(data);
        //display the weather data
    });
}


search.on('click', function () {
    userInput = $('#first_name').val()
    $('#current').text(userInput + " " + today.format('dddd, MMMM D'))
    console.log(userInput)
    fetchLocation(userInput)
    musicEvent(userInput)



});
    // const tomorrow = today.add(1,"day").format('dddd, MMMM D')
    // console.log(tomorrow)

    // for (let index = 0; index < datesArray.length; index++) {
    //     const forecastIndex = datesArray[index];
    //     const forecastDate = today.add(index, "day").format('dddd, MMMM D')
    //     $('.dates').text(forecastDate)
    //     console.log(forecastDate)

    // }


// let daysRequired = 7

// for (let i = 1; i <= daysRequired; i++) {
//     let days = [];

//   days.push( today.add(i, 'days').format('dddd, D MMMM YYYY') )
//   $('.dates').text(days)
//   console.log(days)
// }