
$(function() {
  // Handler for .ready() called.


// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([51.505, -0.09], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var list = [[51.5, -0.09],[51.52, -0.09],[51.51, -0.09],[51.52, -0.08]];
 var locArray = [];

// locArray.push(list);
list.forEach(function(entry) {
   var marker = L.marker(entry).addTo(map)
    	.bindPopup("howdy")
    	.openPopup();
    	console.log(marker);
    	locArray.push(marker);
});

   
// remove this
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}
// remove this 

var offswitch = 0
map.on("dragend", function(){	
	if (offswitch == 0){
		// console.log(marker);

		locArray.forEach(function(entry) {
			map.removeLayer(entry);
		});
		var marker = L.marker([getRandomArbitary(51.48, 51.5 ), getRandomArbitary(-0.07, -0.075 )]).addTo(map).bindPopup("howdy");
		var markerA = L.marker([getRandomArbitary(51.48, 51.5  ), getRandomArbitary(-0.07, -0.075 )]).addTo(map).bindPopup("howdy");

		console.log("hi");
		locArray = [];
		locArray.push(marker);
		locArray.push(markerA);
	}
	// offswitch = 1
});



// add a marker in the given location, attach some popup content to it and open the popup
// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
//     .openPopup();
// L.marker([51.4, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
//     .openPopup();
// L.marker([51.3, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
//     .openPopup();
});