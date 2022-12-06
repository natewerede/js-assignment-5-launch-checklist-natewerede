// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `
}

function validateInput(testInput) {
    if (testInput.length === 0) {
        return "Empty";
    } else if ((isNaN(Number(testInput)) === false)) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    // validate fields
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty"|| validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("Please make sure to fill out all fields");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter valid numbers for Fuel Level and Cargo Mass");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Please make sure to enter valid names for the pilot and copilot");
    }  else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
    } 
    
    // validate fuel and cargo levels
    if (fuelLevel < 10_000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Not enough fuel for journey";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if (cargoLevel > 10_000) {
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo too heavy for takeoff";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } 
    
    if (cargoLevel < 10_000 && fuelLevel > 10_000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Enough fuel for journey";
        cargoStatus.innerHTML = "Cargo light enough for takeoff";
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = "green";
    }

}

async function myFetch() {
    let planetsReturned;

    planets = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then( function(response) {
            return response.json()
         });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomNum = Math.floor(Math.random() * planets.length);

    return planets[randomNum];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
