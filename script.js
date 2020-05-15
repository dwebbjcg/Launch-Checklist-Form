// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");
   let pilot = document.querySelector("input[name=pilotName]");
   let copilot = document.querySelector("input[name=copilotName]");
   let fuel = document.querySelector("input[name=fuelLevel]");
   let cargo = document.querySelector("input[name=cargoMass]");
   let launchCheck = document.getElementById("launchStatusCheck");
   let launchStatus = document.getElementById("launchStatus");
   let itemsList = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.getElementById("faultyItems");
   let destination = document.getElementById("missionTarget");

   form.addEventListener("submit", function() {
      if (pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      };

      if (!isNaN(pilot.value) || !isNaN(copilot.value) || isNaN(fuel.value) || isNaN(cargo.value)) {
         alert("Invalid input! Please enter valid input.");
         event.preventDefault();
      };

      if (isNaN(pilot.value) && isNaN(copilot.value) && !isNaN(fuel.value) && !isNaN(cargo.value)) {
         pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch!`;
         copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch!`;

         if (fuel.value < 10000) {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch!";
            fuelStatus.innerHTML = "Not enough fuel to complete your mission. Please add more.";
         }

         else if (cargo.value > 10000) {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch!";
            cargoStatus.innerHTML = "Too much mass to lift off. Please use the jettison method.";
         }

         else {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle ready for launch!!";
         }

         fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            response.json().then(function(json) {
               // console.log(json);

               destination.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[0].name}</li>
                  <li>Diameter: ${json[0].diameter}</li>
                  <li>Star: ${json[0].star}</li>
                  <li>Distance from Earth: ${json[0].distance}</li>
                  <li>Number of Moons: ${json[0].moons}</li>
               </ol>
               <img src="${json[0].image}">`;
            });
         });

         event.preventDefault();
      };
   });
});

