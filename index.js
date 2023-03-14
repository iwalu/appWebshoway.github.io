/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

var directionsRenderer;
var directionsService;
var intervalID ;
 function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("The Browser Does not Support Geolocation");
    }
}

function showPosition(position) {
    var pose;
    pose = ("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    initMap(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
    document.getElementById("lat").innerHTML=position.coords.latitude;
    document.getElementById("long").innerHTML=position.coords.longitude;
    console.log(pose);
}
function showError(error) {
    if(error.PERMISSION_DENIED){
        console.log("The User have denied the request for Geolocation.");
    }
}
function initMap(lat,lng) {
   directionsRenderer = new google.maps.DirectionsRenderer();
   directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 25,
    center: { lat:  lat, lng:  lng},
    disableDefaultUI: false
  });

  var marker = new google.maps.Marker({
    position: { lat:  lat, lng:  lng},
    map: map,
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  //const control = document.getElementById("floating-panel");

  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  calculateAndDisplayRoute(directionsService, directionsRenderer);



  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("end").addEventListener("change", onChangeHandler);

  document.getElementsByName('ending').forEach(dest => {
    dest.addEventListener("change", onChangeHandler);
});
}

// const end = document.getElementsByName("ending").value;
// console.log("end" + end)

// window.onload = function() { 
  const ending = localStorage.getItem('destination');
  console.log(ending)
// }


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  document.getElementById("startWa").style.display = "block";
  const start = document.getElementById("lat").innerHTML+','+document.getElementById("long").innerHTML
  console.log(start);
  // const end = document.getElementById("end").value;
  const end = ending;

  directionsService
    .route({
      origin: {
        query: start,
      },
      destination: {
        query: end,
      },
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
    	console.log(response);
    	
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}


function calculateAndDisplayRouteLive(directionsService, directionsRenderer) {
  
  const start = document.getElementById("lat").innerHTML+','+document.getElementById("long").innerHTML
  console.log(start);
  const end = document.getElementById("end").value;

  directionsService
    .route({
      origin: {
        query: start,
      },
      destination: {
        query: end,
      },
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
    	console.log(typeof(response.routes[0].legs[0].distance.text));

      var distance = (response.routes[0].legs[0].distance.text).split(" ");
      //console.log(distance);
      if(distance[1]=="km"){
        distance_true = distance[0]*1000;
      }
      if(distance[1]=="m"){
        distance_true = distance[0];
      }
      console.log(distance_true);
      showAR(distance_true);
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}


getLocation()

function startWalkings()
{
  document.getElementById("startWa").style.display = "none";
  document.getElementById("stopWa").style.display = "block";

  intervalID  = setInterval(function(){calculateAndDisplayRouteLive(directionsService, directionsRenderer)}, 1000);
  console.log("Walkings");
}

function stopWalkings()
{
  clearInterval(intervalID);
  document.getElementById("startWa").style.display = "block";
  document.getElementById("stopWa").style.display = "none";
  console.log("Stop Walkings");
}

function showAR(distanceFromPointB)
{
  if(distanceFromPointB<10)
  {
    document.getElementById("seeAR").style.display = "block";
  }
  else
  {
    console.log("Come closer of your destination to pass to AR Mode");
    if(document.getElementById("seeAR").style.display == "block"){
      document.getElementById("seeAR").style.display = "none";
    }
  }
  
}

function openAR(){
  window.open("https://parisius.github.io", '_blank');
}

function getEndValue()
{
  Ends = [
    "Festival des Glaces, CotonouD",
    "L'Africaine Vie Bénin, Cotonou",
    "Dreamxr, Cotonou", 
    "Pharmacie Segbeya, Rue 1254, Cotonou",
    "Centre de Santé de Zogbo, 99HQ+8HX, Rue 2723, Cotonou",
    "Hotel De La Cite Houeyiho, Cotonou",
    "Kaftia Co Sarl, Cotonou",
    "Bon Voyage Hôtel, Cotonou",
    "Ecole Polytechnique d'Abomey Calavi (EPAC), Godomey",
    "C87R+RV3, Godomey",
    "Ecole Polytechnique d'Abomey Calavi (EPAC), Godomey",
    "C88R+F2 Godomey",
    "C8CR+282, Godomey",
    "06 BP 2545 AGBLANGANDAN, Porto-Novo"
  ]
}