$(function() {
var vbFuction = function(){
var vbIcon = L.divIcon({
	className: 'svg-marker',
    html:  '<div><svg width="14" height="16"> <circle r="6" cx="7" cy="7" style="fill: #e5d6ac; fill-opacity: 0.5; stroke-width: 1.5px; stroke: #EE2D5A ;"></circle></svg></div>'});

	 
	 // other map styles
	 // http://b.sm.mapstack.stamen.com/(toner,$fff[@40],$2e5879[hsl-color])/14/3744/6745.png
	 // http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
	 // L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	 // L.tileLayer('http://b.sm.mapstack.stamen.com/toner/{z}/{x}/{y}.png', {


	 map = L.map('map',{zoomControl:false, keyboard: false});
	 new L.control.zoom({position: 'topright'}).addTo(map);
	// marker cluster
	 var markers = new L.MarkerClusterGroup({
        showCoverageOnHover: false,
        animateAddingMarkers:true,
        maxClusterRadius: 40,
        chunkedLoading: true,
        disableClusteringAtZoom: 15,
     });


	var osmUrl = 'http://b.sm.mapstack.stamen.com/(toner,$fff[@30],$666[hsl-color])/{z}/{x}/{y}.png';

    var osmAttrib = 'Tiles courtesy of Stamen.';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 10,
        maxZoom: 20,
        attribution: osmAttrib
    });

     map.setMaxBounds([[39.42452501272267, -76.3275146484375], [39.155622393423215, -76.89743041992188]]);
     // start the map in Baltimore
    map.addLayer(osm);
    map.addLayer(markers);
    map.setView([39.297352225099999, -76.633165957100005], 17);

	//  	L.tileLayer('http://b.sm.mapstack.stamen.com/(toner,$fff[@30],$666[hsl-color])/{z}/{x}/{y}.png', {
	// 	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);

	var list = geojsonFeature
	var locArray = [];


	list.forEach(function(entry) {
			// console.log(entry["coordinates"])


			var marker = new L.marker(entry["coordinates"].reverse(), { icon: vbIcon, title: entry["fullAddress"], lat: entry["coordinates"][0], log: entry["coordinates"][1], noticeDate: entry["noticeDate"]}).bindPopup(entry["fullAddress"]);
			markers.addLayer(marker);
			marker.on('click', function(){


				$(".sub-subtitle").html(entry["fullAddress"]+ "<br>"+ "<b>Vacant Since:</b> "+ entry["noticeDate"] );
				// console.log(entry["fullAddress"]);
				// console.log(this.options)
				// var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.latitude+","+this.options.longitude+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";
// console.log(entry)
				// var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";


    //         	$("#intro-text").html(imgLocation);
            	// setTimeout($("#intro-text").html(imgLocation), 20000);


            	var imgLocation = $("<img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'>");

				$(imgLocation).load(function() {
				    // alert('Image Loaded');
				    // console.log(imgLocation);
				    var imgLoc = imgLocation[0].outerHTML;
            		$("#intro-text").html("<div class='location-pic'>"+ imgLoc + "</div> ");


				});



            	
				});

			// locArray.push(marker);
			locArray.push(markers);
		});



	map.on("dragend", function(){	

		var lat = map.getCenter()["lat"]
		var log =  map.getCenter()["lng"]

		var markers = new L.MarkerClusterGroup({
        showCoverageOnHover: false,
        animateAddingMarkers:true,
        maxClusterRadius: 40,
        chunkedLoading: true,
        disableClusteringAtZoom: 15
     	});
     	map.addLayer(markers);

		

		locArray.forEach(function(entry) {
			map.removeLayer(entry);
		});
		// preloader begin
		$(".spinner-loader").show();
		$.getJSON('/search/load_markers.json?utf8=&vacant_building%5Blat%5D='+log+'&vacant_building%5Blog%5D='+ lat, function(result) {
			// preloader end
			// $(".spinner-loader").hide();
			$(".spinner-loader").fadeOut(1000);
			geojsonFeature = result;
			result.forEach(function(entry) {
				var marker = new L.marker(entry["coordinates"].reverse(), { icon: vbIcon, title: entry["fullAddress"], lat: entry["coordinates"][0], log: entry["coordinates"][1], noticeDate: entry["noticeDate"]})
				.bindPopup(entry["fullAddress"]);

				markers.addLayer(marker);

				marker.on('click', function(){

					// console.log(entry["fullAddress"])

					$(".sub-subtitle").html(entry["fullAddress"]+ "<br>"+entry["noticeDate"]);
					// var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";
					// // console.log(this.options.lat);
     //        		$("#intro-text").html(imgLocation);
     				

				     var imgLocation = $("<img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'>");

				     $(imgLocation).load(function() {
								    var imgLoc = imgLocation[0].outerHTML;
								    $("#intro-text").html("<div class='location-pic'>"+ imgLoc + "</div> ");
								});




			});


				// locArray.push(marker);
				locArray.push(markers);

			});
		});
		
	});



}

var geojsonFeature;


// $.getJSON('/search.json?utf8=%E2%9C%93&vacant_building%5Blat%5D=-76.6331659571&vacant_building%5Blog%5D=39.2973522251', function(result) {
$.getJSON('/search/load_markers.json?utf8=%E2%9C%93&vacant_building%5Blat%5D=-76.6331659571&vacant_building%5Blog%5D=39.2973522251', function(result) {

	// preloader end
	// $(".spinner-loader").hide();
	$(".spinner-loader").fadeOut(1000);
	geojsonFeature = result;
	vbFuction();

});
});

